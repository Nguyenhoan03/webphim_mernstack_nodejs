import React, { useEffect } from "react";
import "./Styles.scss";
import { CiSearch, CiLogin, CiBookmark } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
export default function HeaderCompoment() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (token && name) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    setIsLoggedIn(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
    <div className="Headercompoment">
      <div className="container">
        <div className="header">
          <div className="header_logo">
            <Link to="/">
              <img
                src="https://motchillj.net/motchill.png?v1.0.2"
                alt="Motchill Logo"
                style={{ height: "auto", maxHeight: 70 }}
              />
            </Link>{" "}
          </div>
          <div className="header_search">
            <div className="search_container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  className="d-flex"
                  style={{
                    backgroundColor: "#27272A",
                    width: 450,
                    marginLeft: 50,
                    height: 50,
                    border: "1px solid gray",
                    borderRadius: 8,
                    paddingLeft: 10,
                  }}
                  placeholder="Ví dụ: tên phim, tên diễn viên,..."
                />
                <CiSearch className="search_icon" style={{ marginLeft: 10 }} />
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <>
              <div className="header_user">
                <span
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={toggleDropdown}
                >
                  <FaUser style={{marginRight:7}}/> {name} <LuChevronDown style={{marginTop:3}}/>
                </span>
                {showDropdown && (
                  <div className="dropdown_menu">
                    <ul>
                      <li>
                        <Link to="/thong-tin-tai-khoan">
                          Thông tin tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link to="/cai-dat">Cài đặt</Link>
                      </li>
                      <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="header_bookmark">
                <Link to="/bookmark">
                  <CiBookmark style={{ marginRight: 10 }} /> Bookmark
                </Link>
              </div>
            </>
          ) : (
            <div className="header_actions d-flex">
              <div className="header_login mt-2">
                <Link to="/dang-nhap">
                  <CiLogin style={{ marginRight: 10 }} /> Đăng nhập
                </Link>
              </div>
              <div className="header_register mt-2">
                <Link to="/dang-ky">
                  <RxAvatar style={{ marginRight: 10 }} /> Đăng ký
                </Link>
              </div>
              <div className="header_bookmark">
                <Link to="/bookmark">
                  <CiBookmark style={{ marginRight: 10 }} /> Bookmark
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="header_footer">
          <ul className="nav_list">
            <li
              className="nav_item"
              style={{ borderBottom: "3px solid white" }}
            >
              <Link className="nav_link">TRANG CHỦ</Link>
            </li>
            <li className="nav_item">
              <Link className="nav_link">
                THỂ LOẠI <LuChevronDown className="nav_icon" />
              </Link>
              <ul className="ul_theloai">
                {data_theloai.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to}>{item.theloai}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav_item">
              <Link className="nav_link">
                QUỐC GIA <LuChevronDown className="nav_icon" />
              </Link>
              <ul className="ul_theloai">
                {data_quocgia.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to}>{item.quocgia}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav_item">
              <Link className="nav_link">
                DANH MỤC <LuChevronDown className="nav_icon" />
                <ul className="ul_theloai">
                  {data_danhmuc.map((item, index) => (
                    <li key={index}>
                      <Link to={item.to}>{item.danhmuc}</Link>
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
