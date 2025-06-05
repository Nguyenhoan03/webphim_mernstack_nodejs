const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const initRoutes = require('./routes/index');
const app = express();
const server = http.createServer(app);

// Thêm dòng này để import models Sequelize
const db = require('./models');
const Product = db.Product;
const Linkfilm = db.Linkfilm;

// Route sitemap động dùng Sequelize
app.get('/sitemap/movies', async (req, res) => {
  try {
    // Lấy tất cả phim
    const products = await Product.findAll({
      attributes: ['title'],
      raw: true
    });

    // Lấy tất cả tập phim
    const links = await Linkfilm.findAll({
      attributes: ['title', 'episode'],
      raw: true
    });

    // Gom các tập phim theo title
    const movieMap = {};
    links.forEach(link => {
      if (!movieMap[link.title]) movieMap[link.title] = [];
      movieMap[link.title].push(link.episode);
    });

    // Kết hợp vào mảng kết quả
    const result = products.map(prod => ({
      title: prod.title,
      episodes: movieMap[prod.title] || []
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('server', server);

initRoutes(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
