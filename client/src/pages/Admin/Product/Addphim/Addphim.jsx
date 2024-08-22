import React, { useEffect, useState } from 'react';
import Leftadmincompoment from '../../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./Addphim.scss";
import Adminservices from '../../../../services/Admin/Adminservices';
import axios from 'axios';


export default function Addphim() {
  const [formData, setFormData] = useState({
    title: '',
    hinhanh: '',
    nameenglish: '',
    trangthai: '',
    sotap: '',
    thoiluong: '',
    namphathanh: '',
    chatluong: '',
    ngonngu: '',
    daodien: '',
    dienvien: '',
    theloai: '',
    quocgia: '',
    descripts: '',
    category_id: ''
  });

  const data_quocgia = [
    { quocgia: "Trung Quốc" },
    { quocgia: "Hàn Quốc" },
    { quocgia: "Nhật Bản" },
    { quocgia: "Thái Lan" },
    { quocgia: "Âu Mỹ" },
    { quocgia: "Đài Loan" },
    { quocgia: "Hồng Kông" },
    { quocgia: "Ấn Độ" },
    { quocgia: "Anh" },
    { quocgia: "Pháp" },
    { quocgia: "Canada" },
    { quocgia: "Quốc Gia Khác" },
    { quocgia: "Đức" },
    { quocgia: "Tây Ban Nha" },
    { quocgia: "Thổ Nhĩ Kỳ" },
    { quocgia: "Hà Lan" },
    { quocgia: "Indonesia" },
    { quocgia: "Nga" },
    { quocgia: "Mexico" },
    { quocgia: "Ba Lan" },
    { quocgia: "Úc" },
    { quocgia: "Thụy Điển" },
    { quocgia: "Malaysia" },
    { quocgia: "Brazil" },
    { quocgia: "Philippines" },
    { quocgia: "Bồ Đào Nha" },
    { quocgia: "Ý" },
    { quocgia: "Đan Mạch" },
    { quocgia: "UAE" },
    { quocgia: "Na Uy" },
    { quocgia: "Thụy Sĩ" },
    { quocgia: "Châu Phi" },
    { quocgia: "Nam Phi" },
    { quocgia: "Ukraina" },
    { quocgia: "Ả Rập Xê Út" }
  ];

   const handleChange = (e) =>{
      const {name,value } = e.target;
      setFormData((predata)=>(
        {
          ...predata,
          [name]: value,
        }
      )) 
   }

   const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await Adminservices.Themphim(formData);
      if (data.message === 'Thêm thành công') {
        alert('Thêm mới phim thành công!');
        setFormData({
          title: '',
          hinhanh: '',
          nameenglish: '',
          trangthai: '',
          sotap: '',
          thoiluong: '',
          namphathanh: '',
          chatluong: '',
          ngonngu: '',
          daodien: '',
          dienvien: '',
          theloai: '',
          quocgia: '',
          descripts: '',
          category_id: ''
        });
      } else {
        alert('Có lỗi xảy ra!');
      }
    } catch (error) {
      alert('Lỗi hệ thống');
      console.log(error);
    }
  };
  const [category,setcategory] = useState([]);
  useEffect(()=>{
    const fetchdata_cate = async () =>{
          const data = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
          setcategory(data.data);
          console.log(data,"dataaaaaa")

    }
    fetchdata_cate();
  },[])
  
  return (
    <div className='dashboard-container'>
      <div className="row">
        <div className="col-md-2">
          <Leftadmincompoment />
        </div>
        <div className="col-md-10">
          <Right_navbarcompoment />
          <div className="form-container">
            <h2>Thêm Phim</h2>
            <form className="movie-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Nhập title phim"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Link hình ảnh</label>
                <input
                  type="text"
                  id="hinhanh"
                  name="hinhanh"
                  placeholder="Nhập link hình ảnh"
                  value={formData.hinhanh}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nameenglish">Name (English)</label>
                <input
                  type="text"
                  id="nameenglish"
                  name="nameenglish"
                  placeholder="Nhập nameenglish"
                  value={formData.nameenglish}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="trangthai">Trạng thái</label>
                <input
                  type="text"
                  id="trangthai"
                  name="trangthai"
                  placeholder="Nhập trạng thái"
                  value={formData.trangthai}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sotap">Số tập</label>
                <input
                  type="text"
                  id="sotap"
                  name="sotap"
                  placeholder="Nhập số tập"
                  value={formData.sotap}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="thoiluong">Thời lượng</label>
                <input
                  type="text"
                  id="thoiluong"
                  name="thoiluong"
                  placeholder="Nhập thời lượng"
                  value={formData.thoiluong}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="namphathanh">Năm phát hành</label>
                <input
                  type="text"
                  id="namphathanh"
                  name="namphathanh"
                  placeholder="Nhập năm phát hành"
                  value={formData.namphathanh}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="chatluong">Chất lượng</label>
                <input
                  type="text"
                  id="chatluong"
                  name="chatluong"
                  placeholder="Nhập chất lượng"
                  value={formData.chatluong}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ngonngu">Ngôn ngữ</label>
                <input
                  type="text"
                  id="ngonngu"
                  name="ngonngu"
                  placeholder="Nhập ngôn ngữ"
                  value={formData.ngonngu}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="daodien">Đạo diễn</label>
                <input
                  type="text"
                  id="daodien"
                  name="daodien"
                  placeholder="Nhập đạo diễn"
                  value={formData.daodien}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dienvien">Diễn viên</label>
                <input
                  type="text"
                  id="dienvien"
                  name="dienvien"
                  placeholder="Nhập diễn viên"
                  value={formData.dienvien}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="theloai">Thể loại</label>
                <input
                  type="text"
                  id="theloai"
                  name="theloai"
                  placeholder="Nhập thể loại"
                  value={formData.theloai}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quocgia">Quốc gia</label>
                <select
                 style={{width:'100%',height:40,borderRadius:7,backgroundColor:'#E8F0FE'}}
                  id="quocgia"
                  name="quocgia"
                  value={formData.quocgia}
                  onChange={handleChange}
                >
                  <option value="" disabled>Chọn quốc gia</option>
                  {data_quocgia.map((dt, index) => (
                    <option key={index} value={dt.quocgia}>
                      {dt.quocgia}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="descripts">Mô tả</label>
                <textarea
                  id="descripts"
                  name="descripts"
                  placeholder="Nhập mô tả"
                  value={formData.descripts}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quocgia">Thể loại phim</label>
                <select
                 style={{width:'100%',height:40,borderRadius:7,backgroundColor:'#E8F0FE'}}
                  id="quocgia"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                >
                  <option value="" disabled>Chọn Thể loại phim</option>
                  {category.map((dt, index) => (
                    <option key={index} value={index+1}>
                      {index+1}-{dt.namecategory}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
