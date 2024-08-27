import React, { useEffect, useState } from "react";
import "./Styles.scss";
import { CiSearch, CiLogin, CiBookmark } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { Getallproduct } from "../../services/Productservices";
import { IoMdMenu } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [tabMenuVisible, setTabMenuVisible] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await Getallproduct();
        setData(response.data);
        const filterSearch = response.data
          .filter(item => item.title && item.title.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 5);
        setFilteredData(filterSearch);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    if (token && name) {
      setIsLoggedIn(true);
    }
  }, [token, name]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("id");
      setIsLoggedIn(false);
      toast.success("Bạn đã đăng xuất thành công!");
    }
  };
  

  const handleSearch = () => {
    navigate(`/tim-kiem/${search}`, { state: { data_tk: filteredData } });
  };

  const handleTabMenuToggle = () => {
    setTabMenuVisible(!tabMenuVisible);
  };

  const data_theloai = [
    { theloai: "Hành Động", to: "/the-loai/hanh-dong" },
    { theloai: "Cổ Trang", to: "/the-loai/co-trang" },
    { theloai: "Chiến Tranh", to: "/the-loai/chien-tranh" },
    { theloai: "Viễn Tưởng", to: "/the-loai/vien-tuong" },
    { theloai: "Kinh Dị", to: "/the-loai/kinh-di" },
    { theloai: "Tài Liệu", to: "/the-loai/tai-lieu" },
    { theloai: "Bí Ẩn", to: "/the-loai/bi-an" },
    { theloai: "Phim 18+", to: "/the-loai/18+" },
    { theloai: "Tình Cảm", to: "/the-loai/tinh-cam" },
    { theloai: "Tâm Lý", to: "/the-loai/tam-ly" },
    { theloai: "Thể Thao", to: "/the-loai/the-thao" },
    { theloai: "Phiêu Lưu", to: "/the-loai/phieu-luu" },
    { theloai: "Âm Nhạc", to: "/the-loai/am-nhac" },
    { theloai: "Gia Đình", to: "/the-loai/gia-dinh" },
    { theloai: "Học Đường", to: "/the-loai/hoc-duong" },
    { theloai: "Hài Hước", to: "/the-loai/hai-huoc" },
    { theloai: "Hình Sự", to: "/the-loai/hinh-su" },
    { theloai: "Võ Thuật", to: "/the-loai/vo-thuat" },
    { theloai: "Khoa học", to: "/the-loai/khoa-hoc" },
    { theloai: "Thần Thoại", to: "/the-loai/than-thoai" },
    { theloai: "Chính Kịch", to: "/the-loai/chinh-kich" },
    { theloai: "Kinh Điển", to: "/the-loai/kinh-dien" },
    { theloai: "Hoạt Hình", to: "/the-loai/hoat-hinh" },
  ];
  const data_quocgia = [
    { quocgia: "Trung Quốc", to: "/trung-quoc" },
    { quocgia: "Hàn Quốc", to: "/han-quoc" },
    { quocgia: "Nhật Bản", to: "/nhat-ban" },
    { quocgia: "Thái Lan", to: "/thai-lan" },
    { quocgia: "Âu Mỹ", to: "/au-my" },
    { quocgia: "Đài Loan", to: "/dai-loan" },
    { quocgia: "Hồng Kông", to: "/hong-kong" },
    { quocgia: "Ấn Độ", to: "/an-do" },
    { quocgia: "Anh", to: "/anh" },
    { quocgia: "Pháp", to: "/phap" },
    { quocgia: "Canada", to: "/canada" },
    { quocgia: "Quốc Gia Khác", to: "/quoc-gia-khac" },
    { quocgia: "Đức", to: "/duc" },
    { quocgia: "Tây Ban Nha", to: "/tay-ban-nha" },
    { quocgia: "Thổ Nhĩ Kỳ", to: "/tho-nhi-ky" },
    { quocgia: "Hà Lan", to: "/ha-lan" },
    { quocgia: "Indonesia", to: "/indonesia" },
    { quocgia: "Nga", to: "/nga" },
    { quocgia: "Mexico", to: "/mexico" },
    { quocgia: "Ba Lan", to: "/ba-lan" },
    { quocgia: "Úc", to: "/uc" },
    { quocgia: "Thụy Điển", to: "/thuy-dien" },
    { quocgia: "Malaysia", to: "/malaysia" },
    { quocgia: "Brazil", to: "/brazil" },
    { quocgia: "Philippines", to: "/philippines" },
    { quocgia: "Bồ Đào Nha", to: "/bo-dao-nha" },
    { quocgia: "Ý", to: "/y" },
    { quocgia: "Đan Mạch", to: "/dan-mach" },
    { quocgia: "UAE", to: "/uae" },
    { quocgia: "Na Uy", to: "/na-uy" },
    { quocgia: "Thụy Sĩ", to: "/thuy-si" },
    { quocgia: "Châu Phi", to: "/chau-phi" },
    { quocgia: "Nam Phi", to: "/nam-phi" },
    { quocgia: "Ukraina", to: "/ukraina" },
    { quocgia: "Ả Rập Xê Út", to: "/a-rap-xe-ut" },
  ];
  const data_danhmuc = [
    { danhmuc: "Phim Bộ", to: "/phim-bo" },
    { danhmuc: "Phim Lẻ", to: "/phim-le" },
    { danhmuc: "Show", to: "/phim-shows" },
    { danhmuc: "Hoạt Hình", to: "/" },
    { danhmuc: "Sắp Chiếu", to: "/phim-sap-chieu" },
    { danhmuc: "Phim Vietsub", to: "/" },
  ];


  return (
    <header className="header-component">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img
            src="https://motchillj.net/motchill.png?v1.0.2"
            alt="Motchill Logo"
            className="logo-image"
          />
        </Link>
        <div className="header-search">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Ví dụ: tên phim, tên diễn viên,..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch
              className="search-icon"
              onClick={handleSearch}
            />
            {filteredData.length > 0 && (
              <div className="search-results">
                {filteredData.map((item, index) => (
                  <div key={index} className="search-result-item">
                    <img className="result-image" src={item.hinhanh} alt="search result"/>
                    <div>
                      <Link to={`/${item.title}`} className="result-title">{item.title}</Link>
                      <p className="result-subtitle">{item.nameenglish}</p>
                    </div>
                  </div>
                ))}
                <p className="view-all-results" onClick={handleSearch}>
                  Xem tất cả kết quả
                </p>
              </div>
            )}
          </div>
        </div>
      
        <nav className={`header-nav ${tabMenuVisible ? 'visible' : 'hidden'}`}>
          <div className="nav-dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setActiveDropdown(activeDropdown === 'theloai' ? null : 'theloai')}
            >
              Thể Loại
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'theloai' ? 'show' : ''}`}>
              {data_theloai.map((item, index) => (
                <Link to={item.to} key={index} className="dropdown-item">
                  {item.theloai}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setActiveDropdown(activeDropdown === 'quocgia' ? null : 'quocgia')}
            >
              Quốc Gia
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'quocgia' ? 'show' : ''}`}>
              {data_quocgia.map((item, index) => (
                <Link to={item.to} key={index} className="dropdown-item">
                  {item.quocgia}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setActiveDropdown(activeDropdown === 'danhmuc' ? null : 'danhmuc')}
            >
              Danh Mục
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'danhmuc' ? 'show' : ''}`}>
              {data_danhmuc.map((item, index) => (
                <Link to={item.to} key={index} className="dropdown-item">
                  {item.danhmuc}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
      <Link className="dynamic-text" to="/dang-ky-goi-vip">
        Đăng ký gói VIP
      </Link>
    </div>


          <div className="header-icons">
            {isLoggedIn ? (
              <div
                className="user-menu"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="user-info">
                  <RxAvatar size={28} className="avatar" />
                  <span className="username">{name} <FaCaretDown />
                  </span>
                </div>
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li><Link to="/dang-ky-goi-vip" className="dropdown-item">Đăng Ký gói VIP</Link></li>
                    <li><Link to="/account" className="dropdown-item">Thông tin tài khoản</Link></li>
                    <li><Link to="/" onClick={handleLogout} className="dropdown-item">Đăng xuất</Link> </li>
                    
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/dang-nhap" className="login-link mx-2">
                Đăng Nhập <CiLogin size={28} className="login-icon" />
              </Link>
            )}
            {isLoggedIn && <CiBookmark size={28} className="bookmark-icon" />}
          </div>
        </nav>
    
        <div className="tab_menu" style={{ float: 'right', marginLeft: 15 }}>
          <IoMdMenu onClick={handleTabMenuToggle} style={{ fontSize: 38, color: 'white' }} />
        </div>
      </div>
      <ToastContainer />
    </header>
  );
}
