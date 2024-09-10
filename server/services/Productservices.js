const { Product,Linkfilm ,Comment,User,Rating, sequelize} = require('../models');
const { Op, where ,fn,col,literal } = require('sequelize');
const fs = require('fs');
const path = require('path');
const cache = require('memory-cache');
const { body, validationResult } = require('express-validator');
const CheckNull = require ('../middleware/Validate/Checknull');
const { title } = require('process');
const { group } = require('console');
const { xemphim } = require('./Xemphimservices');


// Hàm ghi log vào file
const logToFile = (filename, data) => {
  const logFilePath = path.join(__dirname, filename);
  fs.appendFileSync(logFilePath, data + '\n', 'utf8');
};

const home = async () => {
  try {
    const cacheKey = 'home_data';
    let data = cache.get(cacheKey);
    // cache.del(cacheKey)
    if (data) {
      return data;
    }

    const commonAttributes = ['theloai','namphathanh','trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap','descripts'];

    const findFilms = (options) => Product.findAll({
      ...options,
      attributes: options.attributes || commonAttributes,
      group: ['title'],
      order: options.order || [['id', 'DESC']],
      limit: options.limit || 18,
    });

    const promises = [
      findFilms({
        order: [['views', 'DESC']],
        limit: 30,
      }),
      findFilms({
        where: { sotap: { [Op.gt]: 15 }, thoiluong: { [Op.gt]: 25 } },
        order: [['sotap', 'DESC'], ['thoiluong', 'DESC']],
      }),
      findFilms({
        where: { sotap: { [Op.gt]: 1 } },
      }),
      findFilms({
        where: { trangthai: { [Op.like]: '%Hoàn Tất%' } },
      }),
      findFilms({
        where: { theloai: { [Op.like]: '%Hành Động%' } },
        limit: 5,
        attributes: ['hinhanh', 'title', 'namphathanh'],
      }),
      findFilms({
        attributes: ['title', 'likes','views'],
        limit: 10,
        order: [['views', 'DESC']],
      }),
      findFilms({
        where: { category_id: 23 },
        limit: 13,
      }),
      findFilms({
        where: { category_id: 4 },
        limit: 15,
      }),
      findFilms({
        where: { category_id: 27 },
        limit: 7,
        attributes: ['hinhanh', 'title', 'namphathanh'],
      }),
      findFilms({ where: { category_id: 9 }, limit: 10 }),
      findFilms({ where: { category_id: 10 }, limit: 10 }),
    ];

    const [
      phimhot, phimbomoicapnhat, phimlemoicapnhat,
      phimdahoanthanh, phimhanhdong, phimtrending,
      phimhoathinh, phimvientuong, phimsapchieu,
      phimCategory9, phimCategory10
    ] = await Promise.all(promises);

    const phimtamlytimcam = [...phimCategory9, ...phimCategory10];

    data = {
      phimhot, phimbomoicapnhat, phimlemoicapnhat,
      phimdahoanthanh, phimhanhdong, phimtrending,
      phimhoathinh, phimtamlytimcam, phimvientuong,
      phimsapchieu
    };

    cache.put(cacheKey, data, 3600 * 1000); 

    return data;

  } catch (error) {
    console.error('Error in phimhot service:', error);
    logToFile('log.txt', `Error in phimhot service: ${error.toString()}`);
    throw error;
  }
};

const Productservice = async () => {
  try {
    const data = await Product.findAll({
      order: [['id', 'DESC']], 
    });
    return data;
  } catch (error) {
    throw(error);
  }  
}

const Productservices_edit = async (data) => {
  try {
    const updatedProduct = await Product.update(
      { ...data },  
      { where: { id: data.id } }
    );

    if (updatedProduct[0] > 0) {
      return { success: true };
    } else {
      return { success: false, message: 'No product was updated. Please check the provided ID.' };
    }
  } catch (error) {
    console.error('Error updating product:', error.message || error);
    throw new Error('Failed to update product');
  }
};







//file services
const getProductByCategory = async (categoryId) => {
  try {
  const products = await Product.findAll({
    where: {
      category_id: categoryId,
    },
    order: [['id', 'DESC']],
    attributes: ['trangthai', 'ngonngu', 'hinhanh', 'title', 'views', 'sotap'],
  });
  return products;
} catch (error) {
    console.log(error)
}
};
const detailfilm = async (titlefilm, userId) => {
  try {
    const datafilm = await Product.findOne({
      where: {title:titlefilm},
      include: [{
        model: Linkfilm,
        as: 'linkfilms',
        attributes: ['episode']
      }]
    });

    const comments = await Comment.findAll({
      where: { titlefilm: titlefilm },
      order: [['id', 'DESC']],
      include: [{
        model: User,
        as: 'users',
        attributes: ['username']
      }],
    });

    const general_assessment = await Rating.findAll({
      where: { titlefilm: titlefilm },
      attributes: [
        'rating',
        [sequelize.fn('COUNT', sequelize.col('rating')), 'ratingTotal'],
      ],
      group: ['rating']
    });

    // Calculate the average rating
    let totalRatings = 0;
    let sumOfRatings = 0;
    
    general_assessment.forEach(ratingGroup => {
      const rating = ratingGroup.dataValues.rating;
      const count = parseInt(ratingGroup.dataValues.ratingTotal, 10);
      totalRatings += count;
      sumOfRatings += rating * count;
    });
    
    const averageRating = totalRatings > 0 ? (sumOfRatings / totalRatings).toFixed(1) : 0;

    // Fetch the rating by the user if userId is provided
    let rating_star = null;
    if (userId) {
      rating_star = await Rating.findOne({
        where: {
          titlefilm: titlefilm,
          user_id: userId,
        }
      });
    }

    // Return all data in one response object
    return { 
      datafilm, 
      comments, 
      rating_star, 
      general_assessment: { 
        averageRating, 
        totalRatings 
      } 
    };

  } catch (error) {
    console.error('Error while fetching film detail:', error);
    throw error;
  }
};

const Productservices_Getdetail_xemphim =async (titlefilm)=>{
  try {
     const data = await Linkfilm.findAll({
      where:{title: titlefilm}
     })
     console.log("firstdataProductservices_Getdetail_xemphim",data);
     if(data){
      return data;
     }
  } catch (error) {
    throw(error)
  }
}

const Productservices_create_xemphim = async (selectedTitle, episode, linkfilm) => {
  try {
      const newFilm = await Linkfilm.create({ title:selectedTitle, episode, linkfilm });

      if (newFilm) {
          return { success: true };
      } else {
          return { success: false };
      }
  } catch (error) {
      throw error;
  }
};


//phim bộ
const danhmucphim = async (category_id, filters = {}) => {
  
  try {
    const { orderBy, category, country, typeId, year } = filters;
    const where = { category_id };

    // Build dynamic conditions based on filters
    if (category) {
      where.theloai = { [Op.like]: `%${category}%` };
    }
    if (country) {
      where.quocgia = { [Op.like]: `%${country}%` };
    }
    if (typeId) {
      where.typeId = typeId;
    }
    if (year) {
      where.namphathanh = year;
    }

    let orderClause = [];
    if (orderBy == "id") {
      orderClause = [['id', 'DESC']];
    } else if (orderBy == "views") {
      orderClause = [['views', 'DESC']];
    } else if (orderBy == "year") {
      orderClause = [['year', 'ASC']];
    }else{
      orderClause = [['id', 'DESC']];
    }

    const data = await Product.findAll({
      where,
      order: orderClause.length > 0 ? orderClause : undefined,
    });

    return data;
  } catch (error) {
    console.error('Error while fetching film detail:', error);
    throw error;
  }
};

const quocgia = async (quocgia, filters = {}) => {
  console.log("first_quocgia service", quocgia);
  try {
    const { orderBy, category, country, typeId, year } = filters;
    const wherefilters = {};

    // Build dynamic conditions based on filters
    if (category) {
      wherefilters.theloai = { [Op.like]: `%${category}%` };
    }
    if (country) {
      wherefilters.quocgia = { [Op.like]: `%${country}%` };
    }
    if (typeId) {
      wherefilters.typeId = typeId;
    }
    if (year) {
      wherefilters.namphathanh = year;
    }

    let orderClause = [];
    if (orderBy === "createdAt") {
      orderClause = [['createdAt', 'DESC']];
    } else if (orderBy === "views") {
      orderClause = [['views', 'DESC']];
    } else if (orderBy === "year") {
      orderClause = [['namphathanh', 'ASC']];
    }

    const data = await Product.findAll({
      where: {
        quocgia: { [Op.like]: `%${quocgia}%` },
        ...wherefilters,
      },
      order: orderClause,  // Add the order clause if necessary
    });

    return data;
  } catch (error) {
    throw error;
  }
};



const post_comment = async (userId, titlefilm, contentcomment,parent_id) => {
  // Kiểm tra dữ liệu đầu vào
  if (userId == null || titlefilm == null || contentcomment == null) {
    throw new Error('Missing required fields: userId, titlefilm, or contentcomment');
  }

  try {
    await Comment.create({
      titlefilm: titlefilm,
      comment: contentcomment,
      user_id: userId,
      parent_id: parent_id || null,
    });
    return { success: true };
  } catch (error) {
    throw error;
  }
};
const post_ratingstar = async (titlefilm, id, starselect) => {
  if (id == null || titlefilm == null || starselect == null) {
    throw new Error('Missing required fields: Id, titlefilm, or starselect');
  } else {
    try {
      // Tìm kiếm bản ghi trước
      const [rating, created] = await Rating.findOrCreate({
        where: {
          titlefilm: titlefilm,
          user_id: id
        },
        defaults: {
          rating: starselect
        }
      });

      // Nếu bản ghi đã tồn tại, cập nhật giá trị rating
      if (!created) {
        rating.rating = starselect; // Cập nhật rating
        await rating.save(); // Lưu thay đổi
      }

      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

const Productservices_editpackageVIP1 = async (title,VIP1) => {
  try {
    const data = await Product.update(
      { VIP1: VIP1 }, 
      { where: { title: title }} 
    );
    console.log("firstdataaaserrviceseditpackageVIP1",data);
    if (data[0] > 0){
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error in Productservices_editpackageVIP1:", error);
    throw error;
  }
};
const lastUpdated = {}; 
const THROTTLE_TIME = 500;

const Productservices_updateview = async (title) => {
  const currentTime = Date.now();

  if (!lastUpdated[title] || (currentTime - lastUpdated[title]) > THROTTLE_TIME) {
    try {
      const data = await Product.increment(
        { views: 1 }, 
        { where: { title: title } }
      );

      if (data[0][1] > 0) {
        lastUpdated[title] = currentTime;
        return { success: true };
      } else {
        return { success: false, message: "Failed to update view count" };
      }
    } catch (error) {
      console.error("Error in Productservices_updateview:", error);
      throw error;
    }
  } else {
    return { success: true }; // View count not incremented due to throttling
  }
};

const Productservices_delete = async (title) => {
  const transaction = await sequelize.transaction();
  try {
     const linkfilmDelete = await Linkfilm.destroy({
       where: {title: title },
       transaction
     });
     
     const productDelete = await Product.destroy({
       where: { title: title },
       transaction
     });

     if (productDelete > 0 && linkfilmDelete >= 0) {
         await transaction.commit();
         return { success: true };
     } else {
         await transaction.rollback();
         return { success: false, message: "No product or associated links found with the given title" };
     }
  } catch (error) {
     await transaction.rollback();
     throw error;
  }
}



module.exports = {Productservices_delete,Productservices_updateview,Productservices_edit, home, getProductByCategory,detailfilm,danhmucphim,quocgia,post_comment,post_ratingstar,Productservice,Productservices_Getdetail_xemphim,Productservices_create_xemphim,Productservices_editpackageVIP1};
