const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const hostname = "https://nghienphim.click/";
const Productservices = require('./services/Productservices');

async function generateSitemap() {
  try {
    const data_title_sitemap = await Productservices.Productservice(); 
    
    const url = [
      { path: '/', priority: 1.0 },
      { path: '/:title', priority: 0.8 },
      { path: '/tim-kiem/:content_search', priority: 0.8 },
      { path: '/xem-phim/:title/:episode', priority: 0.8 },
      { path: '/dang-nhap', priority: 0.6 },
      { path: '/dang-ky', priority: 0.6 },
      
      { path: '/phim-bo', priority: 0.7 },
      { path: '/phim-le', priority: 0.7 },
      { path: '/phim-shows', priority: 0.7 },
      { path: '/phim-sap-chieu', priority: 0.7 },
      { path: '/the-loai/hanh-dong', priority: 0.7 },
      { path: '/the-loai/vien-tuong', priority: 0.7 },
      { path: '/the-loai/bi-an', priority: 0.7 },
      { path: '/the-loai/am-nhac', priority: 0.7 },
      { path: '/the-loai/18+', priority: 0.7 },
      { path: '/the-loai/chien-tranh', priority: 0.7 },
      { path: '/the-loai/chinh-kich', priority: 0.7 },
      { path: '/the-loai/co-trang', priority: 0.7 },
      { path: '/the-loai/gia-dinh', priority: 0.7 },
      { path: '/the-loai/hai-huoc', priority: 0.7 },
      { path: '/the-loai/hinh-su', priority: 0.7 },
      { path: '/the-loai/hoat-hinh', priority: 0.7 },
      { path: '/the-loai/hoc-duong', priority: 0.7 },
      { path: '/the-loai/khoa-hoc', priority: 0.7 },
      { path: '/the-loai/kinh-di', priority: 0.7 },
      { path: '/the-loai/kinh-dien', priority: 0.7 },
      { path: '/the-loai/phieu-luu', priority: 0.7 },
      { path: '/the-loai/tai-lieu', priority: 0.7 },
      { path: '/the-loai/tam-ly', priority: 0.7 },
      { path: '/the-loai/than-thoai', priority: 0.7 },
      { path: '/the-loai/the-thao', priority: 0.7 },
      { path: '/the-loai/tinh-cam', priority: 0.7 },
      { path: '/the-loai/vo-thuat', priority: 0.7 },
      
      { path: '/an-do', priority: 0.6 },
      { path: '/trung-quoc', priority: 0.6 },
      { path: '/han-quoc', priority: 0.6 },
      { path: '/nhat-ban', priority: 0.6 },
      { path: '/thai-lan', priority: 0.6 },
      { path: '/au-my', priority: 0.6 },
      { path: '/dai-loan', priority: 0.6 },
      { path: '/hong-kong', priority: 0.6 },
      { path: '/anh', priority: 0.6 },
      { path: '/phap', priority: 0.6 },
      { path: '/canada', priority: 0.6 },
      { path: '/quoc-gia-khac', priority: 0.6 },
      { path: '/duc', priority: 0.6 },
      { path: '/tay-ban-nha', priority: 0.6 },
      { path: '/tho-nhi-ky', priority: 0.6 },
      { path: '/ha-lan', priority: 0.6 },
      { path: '/indonesia', priority: 0.6 },
      { path: '/nga', priority: 0.6 },
      { path: '/mexico', priority: 0.6 },
      { path: '/ba-lan', priority: 0.6 },
      { path: '/uc', priority: 0.6 },
      { path: '/thuy-dien', priority: 0.6 },
      { path: '/malaysia', priority: 0.6 },
      { path: '/brazil', priority: 0.6 },
      { path: '/philippines', priority: 0.6 },
      { path: '/bo-dao-nha', priority: 0.6 },
      { path: '/y', priority: 0.6 },
      { path: '/dan-mach', priority: 0.6 },
      { path: '/uae', priority: 0.6 },
      { path: '/na-uy', priority: 0.6 },
      { path: '/thuy-si', priority: 0.6 },
      { path: '/chau-phi', priority: 0.6 },
      { path: '/nam-phi', priority: 0.6 },
      { path: '/ukraina', priority: 0.6 },
      { path: '/a-rap-xe-ut', priority: 0.6 },
    ];

    data_title_sitemap.forEach((product) => {
      url.push({ path: `/${product.title}`, priority: 1.0 });
    });

    const urls = url.map(({ path, priority }) => ({
      url: path.replace(/:.*$/, ''),
      changefreq: 'weekly',
      priority: priority || 0.5,
    }));

    const sitemapStream = new SitemapStream({ hostname });

    urls.forEach(({ url, changefreq, priority }) => {
      sitemapStream.write({ url, changefreq, priority });
    });

    sitemapStream.end();

    const data = await streamToPromise(sitemapStream);
    const filePath = path.join(__dirname, 'sitemap.xml');
    const writeStream = createWriteStream(filePath);
    writeStream.write(data.toString());
    writeStream.end();

    console.log("Sitemap generated successfully.");
  } catch (err) {
    console.error('Error generating sitemap:', err);
  }
}

generateSitemap();
