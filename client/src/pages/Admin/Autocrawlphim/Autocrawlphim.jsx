import React, { useEffect, useState } from "react";
import Leftadmincompoment from "../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment";
import Right_navbarcompoment from "../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MdShoppingCart,
  MdAttachMoney,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";
import "./Autocrawlphim.scss";

export default function Authcrawlphim() {
  const StatusCard = ({ icon, count, title }) => {
    return (
      <div className="status-card shadow-sm p-3 mb-4 bg-white rounded">
        <div className="status-card__icon">{icon}</div>
        <div className="status-card__info">
          <h4>{count}</h4>
          <span>{title}</span>
        </div>
      </div>
    );
  };

  const categories = [
    "Hành Động",
    "Cổ Trang",
    "Chiến Tranh",
    "Viễn Tưởng",
    "Kinh Dị",
    "Tài Liệu",
    "Bí Ẩn",
    "Phim 18+",
    "Tình Cảm",
    "Tâm Lý",
    "Thể Thao",
    "Phiêu Lưu",
    "Âm Nhạc",
    "Gia Đình",
    "Học Đường",
    "Hài Hước",
    "Hình Sự",
    "Võ Thuật",
    "Khoa học",
    "Thần Thoại",
    "Chính Kịch",
    "Kinh Điển",
    "Hoạt Hình",
    "Phim Bộ",
    "Phim Lẻ",
    "Phim Shows",
    "Phim Sắp Chiếu",
  ];

  const handleLinkClick = async (category) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/crawl`,
        { category }
      );

      if (response.status === 200) {
        alert("Bạn đã crawl xong dữ liệu phim " + category);
        window.location.reload();
      } else {
        console.error("Failed to trigger crawl:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const date_curent = new Date();
const formattedDate = date_curent.toISOString().split('T')[0];
  console.log("firstforrmatdate",formattedDate)
  const [choosecrawl, setchoosecrawl] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false); 
  const [data_crawl, setdata_crawl] = useState([]); 

  const handleclickchoose = (cate) => {
    if (cate === "chooseall") {
      setchoosecrawl(categories);
    }else{
      setchoosecrawl((prev) => {
        if (!prev.includes(cate)) {
          return [...prev, cate];
        }
        return prev;
      });
  };
}
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  console.log("first",choosecrawl)

  const handleScheduleCrawl = async () => {
    if (choosecrawl.length > 0 && selectedDate && selectedTime) {
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
  
      const currentDateTime = new Date();
  
      if (selectedDateTime <= currentDateTime) {
        alert("Thời gian đã chọn không hợp lệ. Vui lòng chọn thời gian trong tương lai.");
        return;
      }
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/create_scheduled_crawls`, {
          categories: choosecrawl,
          date: selectedDate,
          time: selectedTime,
        });
  
        if (response.data.status === 200) {
          toast.success("Bạn đã đặt lịch hẹn thành công!");
          window.location.reload();
        } else {
          toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error scheduling crawl:", error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } else {
      alert("Vui lòng chọn thể loại, ngày, và thời gian để đặt lịch.");
    }
  };
  
  
  useEffect(()=>{
    try {
      const fetch_datacrawl = async ()=>{
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/schedule_crawl`);
        if(data){
             setdata_crawl(data.data);
        }
     }
     fetch_datacrawl();  
    } catch (error) {
      console.log(error)
    }
    
  },[])
  const handleDelete_listcrawl = async(id)=>{
    try {
      const data_delete = await axios.delete(`${process.env.REACT_APP_API_URL}/delete_scheduled_crawls`,{params: { id }})
      if (data_delete.status === 200) {
        alert("Bạn đã xóa thành công");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting crawl:", error);
    }
  }
   
  
  
  return (
    <div className="dashboard-container container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Leftadmincompoment />
        </div>
        <div className="col-md-10">
          <Right_navbarcompoment />
          <div className="row mt-4">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdShoppingCart />}
                count="1,995"
                title="Total Sales"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdAttachMoney />}
                count="$2,632"
                title="Total Income"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<FaUserFriends />}
                count="1,711"
                title="Total Orders"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdOutlineShoppingBag />}
                count="2,001"
                title="Daily Visits"
              />
            </div>
          </div>
          <h3 className="text-danger">Crawl Phim</h3>
          <div className="category-buttons mb-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(category)}
                className="category-button btn btn-outline-primary me-2 mb-2"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Schedule Section */}
          <div className="schedule-crawl">
            <h3 className="text-danger mb-4">Đặt lịch hẹn cào phim</h3>
            <div className="mb-3">
              <label htmlFor="category-select" className="form-label">
                Chọn thể loại muốn cào
              </label>
              <select
                id="category-select"
                className="form-select"
                onChange={(e) => handleclickchoose(e.target.value)}
              >
                <option value="">Chọn thể loại...</option>
                <option value="chooseall" style={{color:'red'}}>Chọn tất cả thể loại *</option>
                {categories.map((cate, index) => (
                  <option key={index} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <p>Thể loại phim đã chọn để cào tự động:</p>
            <div className="selected-categories">
              {choosecrawl.length > 0 ? (
                choosecrawl.map((item, index) => (
                  <span
                    key={index}
                    className="badge bg-primary me-1 py-1 mt-2"
                  >
                    {item}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Close"
                      onClick={() => {
                        setchoosecrawl(choosecrawl.filter((_, i) => i !== index));
                      }}
                    ></button>
                  </span>
                ))
              ) : (
                <p className="text-muted">Chưa có thể loại nào được chọn</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="crawl-date" className="form-label">
                Chọn ngày cào
              </label>
              <input
                type="date"
                id="crawl-date"
                className="form-control mb-3"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label htmlFor="crawl-time" className="form-label">
                Chọn thời gian cào
              </label>
              <input
                type="time"
                id="crawl-time"
                className="form-control"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>

            <div className="mt-4 text-center">
              <button
                className="btn btn-success"
                onClick={()=>handleScheduleCrawl()}
              >
                Đặt lịch bắt đầu cào
              </button>
            </div>
          </div>

          {/* Scheduled Crawl Information */}
          {/* {isScheduled && ( */}
          <div className="scheduled-info mt-4">
  <h4 className="text-success">Danh sách đặt lịch cào phim</h4>
  {data_crawl && data_crawl.map((dt, index) => (
    <div className="scheduled-item" key={index}>
      <p>
        <strong>Ngày cào: </strong> {dt.crawl_date}
      </p>
      <p>
        <strong>Thời gian cào: </strong> {dt.crawl_time}
      </p>
      <p>
        <strong>Thể loại đã chọn: </strong> 
        { dt.category.length > 0 ? dt.category  : "Không có thể loại nào được chọn"}
      </p>
      <p><strong> Trạng thái: </strong>   {dt.status === 1 ? "chưa thực hiện" : "đã hoàn thành"}</p>
      <button 
        className="btn btn-danger"
        onClick={() => handleDelete_listcrawl(dt.id)}
      >
        Xóa
      </button>
    </div>
  ))}
</div>

          
          {/* )} */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
