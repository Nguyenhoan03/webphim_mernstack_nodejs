const { Product } = require('../../models');

const Addphimservices = async (formdata) => {
  try {
    const data = await Product.create(formdata); 
    if (data) {
      return { response: "success" };
    } else {
      return { response: "error" };
    }
  } catch (error) {
    throw error;
  }
};


module.exports = { Addphimservices };
