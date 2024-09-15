import React, { useState } from "react";
import Leftadmincompoment from "../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment";
import Right_navbarcompoment from "../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment";
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

  const [choosecrawl, setchoosecrawl] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false); // Track if crawl is scheduled

  const handleclickchoose = (cate) => {
    if (cate === "chooseall") {
      setchoosecrawl(categories);
    }
    setchoosecrawl((prev) => [...prev, cate]);
  };

  // Handles the date selection for scheduling the crawl
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handles the time selection for scheduling the crawl
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Function to handle scheduling the crawl
  const handleScheduleCrawl = () => {
    if (choosecrawl.length > 0 && selectedDate && selectedTime) {
      // Assuming that scheduling works here
      setIsScheduled(true);
    } else {
      alert("Please select categories, date, and time to schedule the crawl.");
    }
  };

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
                onClick={handleScheduleCrawl}
              >
                Đặt lịch bắt đầu cào
              </button>
            </div>
          </div>

          {/* Scheduled Crawl Information */}
          {isScheduled && (
            <div className="scheduled-info mt-4">
              <h4 className="text-success">Lịch cào phim đã được đặt:</h4>
              <p>
                <strong>Ngày cào: </strong> {selectedDate}
              </p>
              <p>
                <strong>Thời gian cào: </strong> {selectedTime}
              </p>
              <p>
                <strong>Thể loại đã chọn: </strong>{" "}
                {choosecrawl.length > 0
                  ? choosecrawl.join(", ")
                  : "Không có thể loại nào được chọn"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
