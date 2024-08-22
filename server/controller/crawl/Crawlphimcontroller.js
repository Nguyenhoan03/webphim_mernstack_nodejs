const { sequelize, Product, Linkfilm } = require('../../models');
const axios = require('axios');
const cheerio = require('cheerio');

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Could not sync database', err));

const Crawlphim = async (req, res,next) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  const categoryMap = {
    'Hành Động': 'hanh-dong',
    'Cổ Trang': 'co-trang',
    'Chiến Tranh': 'chien-tranh',
    'Viễn Tưởng': 'vien-tuong',
    'Kinh Dị': 'kinh-di',
    'Tài Liệu': 'tai-lieu',
    'Bí Ẩn': 'bi-an',
    'Phim 18+': 'phim-18',
    'Tình Cảm': 'tinh-cam',
    'Tâm Lý': 'tam-ly',
    'Thể Thao': 'the-thao',
    'Phiêu Lưu': 'phieu-luu',
    'Âm Nhạc': 'am-nhac',
    'Gia Đình': 'gia-dinh',
    'Học Đường': 'hoc-duong',
    'Hài Hước': 'hai-huoc',
    'Hình Sự': 'hinh-su',
    'Võ Thuật': 'vo-thuat',
    'Khoa học': 'khoa-hoc',
    'Thần Thoại': 'than-thoai',
    'Chính Kịch': 'chinh-kich',
    'Kinh Điển': 'kinh-dien',

    'Hoạt Hình': 'hoat-hinh',
    'Phim Bộ': 'phim-bo',
    'Phim Lẻ': 'phim-le',
    'Phim Shows': 'phim-shows',
    'Phim Sắp Chiếu': 'phim-sap-chieu'
  };

  const categorySlug = categoryMap[category];
  const category_id = Object.keys(categoryMap).indexOf(category) + 1;

  if (!categorySlug) {
    return res.status(400).json({ error: 'Invalid category' });
  }
const baseUrl = ['Hoạt Hình', 'Phim Bộ', 'Phim Lẻ', 'Phim Shows', 'Phim Sắp Chiếu'].includes(category) ? 'https://ophim17.cc/danh-sach' : 'https://ophim17.cc/the-loai';
    const urls = [
      `${baseUrl}/${categorySlug}`,
      `${baseUrl}/${categorySlug}?page=2`,
      `${baseUrl}/${categorySlug}?page=3`,
      `${baseUrl}/${categorySlug}?page=4`,
      `${baseUrl}/${categorySlug}?page=5`,
    ];
  

  try {
    const data = [];

    for (const url of urls) {
      const response = await axios.get(url);
      const html = response;
      const $ = cheerio.load(html);

      $('table.min-w-full tbody tr td.whitespace-nowrap .ml-4 a').each((index, element) => {
        const linkHref = $(element).attr('href');
        data.push({
          href: 'https://ophim17.cc' + linkHref
        });
      });
    }

    const getEpisodes = async (movie) => {
      try {
        const movieResponse = await axios.get(movie.href);
        const movieHtml = movieResponse;
        const $$ = cheerio.load(movieHtml);

        const title = $$('.text-center h1.uppercase').text();
        const nameenglish = $$('.text-center h2.italic').text();
        const imageUrl = $$('.container .relative span img').attr('src');
        const hinhanh = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : 'https://ophim17.cc' + imageUrl) : '';
        const descripts = $$('.text-gray-500 article').eq(0).text();

        const dataFilm = {};
        $$('tbody.align-baseline tr').each((index, element) => {
          const key = $$(element).find('td').first().text().trim();
          const value = $$(element).find('td').eq(1).text().trim();
          dataFilm[key] = value;
        });

        const products = [];

        const episodeElements = $$('.grid.grid-cols-3.md\\:grid-cols-6.lg\\:grid-cols-16.gap-2 a');

        for (let i = 0; i < episodeElements.length; i++) {
          const episodeHref = $$(episodeElements[i]).attr('href');
          products.push({
            title: title,
            href: episodeHref,
            episode: i + 1,
          });

          try {
            await Linkfilm.create({
              title: title,
              episode: i + 1,
              linkfilm: episodeHref,
            });
          } catch (error) {
            console.error('Error creating linkfilm record:', error);
          }
        }

        return {
          title,
          nameenglish,
          hinhanh,
          descripts,
          trangthai: dataFilm['Trạng thái'],
          sotap: dataFilm['Số tập'],
          thoiluong: dataFilm['Thời Lượng'],
          namphathanh: dataFilm['Năm Phát Hành'],
          chatluong: dataFilm['Chất Lượng'],
          ngonngu: dataFilm['Ngôn Ngữ'],
          daodien: dataFilm['Đạo Diễn'],
          dienvien: dataFilm['Diễn Viên'],
          theloai: dataFilm['Thể Loại'],
          quocgia: dataFilm['Quốc Gia'],
          views: 0,
          likes: 0,
          category_id: category_id,
        };
      } catch (error) {
        console.error(`Error fetching movie URL: ${error.message}`);
        return null;
      }
    };

    const results = [];
    for (const movie of data) {
      const result = await getEpisodes(movie);
      if (result) {
        results.push(result);
      }
    }

    for (const movie of results) {
      const existingProduct = await Product.findOne({ where: { title: movie.title } });
      if (!existingProduct) {
        await Product.create(movie);
      }
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
    console.error(`Failed to fetch data from external site: ${error.message}`);
    res.status(500).json({ error: `Failed to fetch data from external site: ${error.message}` });
  }
};

module.exports = { Crawlphim };
