const { sequelize, Product, Linkfilm, scheduled_crawl } = require('../../models');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
// Đồng bộ cơ sở dữ liệu
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Could not sync database', err));

// Map thể loại phim
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

// Hàm crawl phim
const crawlPhimFromUrl = async (category) => {
  const categorySlug = categoryMap[category];
  const category_id = Object.keys(categoryMap).indexOf(category) + 1;

  if (!categorySlug) {
    throw new Error('Invalid category');
  }

  const baseUrl = ['Hoạt Hình', 'Phim Bộ', 'Phim Lẻ', 'Phim Shows', 'Phim Sắp Chiếu'].includes(category)
    ? 'https://ophim17.cc/danh-sach'
    : 'https://ophim17.cc/the-loai';

  const urls = [
    `${baseUrl}/${categorySlug}`,
    `${baseUrl}/${categorySlug}?page=2`,
    `${baseUrl}/${categorySlug}?page=3`,
    `${baseUrl}/${categorySlug}?page=4`,
    `${baseUrl}/${categorySlug}?page=5`,
  ];

  const data = [];

  // Lấy dữ liệu từ các trang
  for (const url of urls) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $('table.min-w-full tbody tr td.whitespace-nowrap .ml-4 a').each((index, element) => {
      const linkHref = $(element).attr('href');
      data.push({
        href: 'https://ophim17.cc' + linkHref
      });
    });
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getEpisodes = async (movie) => {
    try {
      const movieResponse = await axios.get(movie.href);
      const movieHtml = movieResponse.data;
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
  
      let localImagePath = '';
  
      const existingfilm = await Linkfilm.findOne({
        where: {
          title: title,
        }
      });
  
      // Lưu trữ các URL của ảnh không tải được
      let failedImageDownloads = [];
  
      // Function tải ảnh với retry và delay mechanism
      const downloadImageWithRetry = async (url, retries = 3, delay = 1000) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
          try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return response.data;
          } catch (error) {
            console.error(`Error downloading image (attempt ${attempt}): ${error.message}`);
            if (attempt === retries) {
              // Nếu vẫn không thành công sau số lần retry, thêm URL vào danh sách failed
              failedImageDownloads.push(url);
            }
            await sleep(delay);
          }
        }
      };
  
      // Lưu image vào file nếu tồn tại ảnh và phim chưa có trong cơ sở dữ liệu
      if (hinhanh && !existingfilm) {
        try {
          const imageData = await downloadImageWithRetry(hinhanh);
          if (imageData) {
            const uuidhinhanh = `${uuidv4()}.jpg`;
            const localPath = path.join(__dirname, '../../public/images', uuidhinhanh);
  
            // Ghi file vào thư mục
            fs.writeFileSync(localPath, imageData);
            localImagePath = `${uuidhinhanh}`;
          }
        } catch (error) {
          console.error(`Failed to save image: ${error.message}`);
        }
      }
  
      // Xử lý các tập phim
      const episodeElements = $$('.grid.grid-cols-3.md\\:grid-cols-6.lg\\:grid-cols-16.gap-2 a');
      for (let i = 0; i < episodeElements.length; i++) {
        const episodeHref = $$(episodeElements[i]).attr('href');
        const episodeNumber = i + 1;
  
        const existingEpisode = await Linkfilm.findOne({
          where: {
            title: title,
            episode: episodeNumber
          }
        });
  
        if (!existingEpisode) {
          await Linkfilm.create({
            title: title,
            episode: episodeNumber,
            linkfilm: episodeHref,
          });
        }
  
        await sleep(500); // Thời gian chờ giữa mỗi tập
      }
  
      // Nếu có ảnh bị lỗi, thử tải lại sau khi tất cả các tập phim được xử lý
      if (failedImageDownloads.length > 0) {
        console.log('Retrying failed image downloads...');
        for (let i = 0; i < failedImageDownloads.length; i++) {
          const imageUrl = failedImageDownloads[i];
          try {
            const imageData = await downloadImageWithRetry(imageUrl);
            if (imageData) {
              const uuidhinhanh = `${uuidv4()}.jpg`;
              const localPath = path.join(__dirname, '../../public/images', uuidhinhanh);
              fs.writeFileSync(localPath, imageData);
              console.log(`Successfully retried and saved image: ${imageUrl}`);
            }
          } catch (error) {
            console.error(`Failed to retry download for image: ${imageUrl}`);
          }
          await sleep(1000); // Thêm thời gian chờ giữa các lần thử lại
        }
      }
  
      return {
        title,
        nameenglish,
        hinhanh: localImagePath, // Trả về đường dẫn ảnh đã lưu
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

  // Lưu dữ liệu phim vào database
  for (const movie of results) {
    const existingProduct = await Product.findOne({ where: { title: movie.title } });
    if (!existingProduct) {
      await Product.create(movie);
    }
  }

  return results;
};

// Route handler
const Crawlphim = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const results = await crawlPhimFromUrl(category);
    res.status(200).json(results);
  } catch (error) {
    console.error(`Failed to crawl phim: ${error.message}`);
    res.status(500).json({ error: `Failed to crawl phim: ${error.message}` });
  }
};

// Scheduled crawl job
const Scheduled_crawls = async (req, res) => {
  try {
    const { categories, date, time } = req.body;

    const result = await scheduled_crawl.create({
      category: JSON.stringify(categories),
      crawl_date: date,
      crawl_time: time,
      status: 1,
    });

    if (result) {
      return res.status(200).json({ status: 200, message: "Scheduled crawl created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Cron job chạy mỗi 10 phút
cron.schedule('*/60 * * * *', async () => {
  try {
    const now = new Date();
    const localNow = moment(now).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const crawlDate = localNow.split(' ')[0];
    const crawlTime = localNow.split(' ')[1];

    const scheduledJobs = await scheduled_crawl.findAll({
      where: {
        status: 1,
        crawl_date: crawlDate,
        crawl_time: { [Op.lte]: crawlTime }
      }
    });

    if (scheduledJobs.length > 0) {
      for (const job of scheduledJobs) {
        console.log("firstjob",job)
        const categories = JSON.parse(job.category);
        for (const category of categories) {
          await crawlPhimFromUrl(category);
        }
        await job.update({ status: 0 });
      }
    }
  } catch (error) {
    console.error(`Cron job error: ${error.message}`);
  }
});

const Schedule_crawl =async (req,res)=>{
  try {
    const data = await scheduled_crawl.findAll();
    if(data){
       return res.json(data);
    }  
  } catch (error) {
    console.log(error)
  }    
  
}
const Delete_Scheduled_crawls = async (req, res) => {
  try {
    const { id } = req.query;  
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await scheduled_crawl.destroy({
      where: { id: id }
    });

    if (result) {
      return res.status(200).json({ message: "Crawl deleted successfully" });
    } else {
      return res.status(404).json({ error: "Crawl not found" });
    }
  } catch (error) {
    console.error("Error deleting scheduled crawl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {Delete_Scheduled_crawls, Schedule_crawl,Crawlphim, Scheduled_crawls };
