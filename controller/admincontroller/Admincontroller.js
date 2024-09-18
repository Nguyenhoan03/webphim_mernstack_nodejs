const Adminservices = require('../../services/Adminservices/Adminservices');

const Addphimcontroller = async (req, res, next) => {
    try {
      const formdata = req.body;
      console.log("firstformdata", formdata);
      const data = await Adminservices.Addphimservices(formdata);
      if (data.response === "success") {
        return res.status(200).json({ message: 'Thêm thành công' });
      } else {
        return res.status(500).json({ message: 'Thêm thất bại' });
      }
    } catch (error) {
      next(error);
    }
  };
  module.exports = { Addphimcontroller };
  