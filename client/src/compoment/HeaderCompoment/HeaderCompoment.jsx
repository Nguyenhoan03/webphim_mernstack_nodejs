import React, { useEffect } from "react";
import "./Styles.scss";
import { CiSearch, CiLogin, CiBookmark } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function HeaderCompoment() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (token && name) {
      setIsLoggedIn(true);
    }
  }, [token, name]);

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
    <Navbar expand="lg" bg="dark" variant="dark" className="Headercompoment">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://motchillj.net/motchill.png?v1.0.2"
            alt="Motchill Logo"
            style={{ height: "auto", maxHeight: 70 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="header_search w-100">
              <div className="search_container">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "#27272A",
                      width: 450,
                      height: 50,
                      border: "1px solid gray",
                      borderRadius: 8,
                      paddingLeft: 10,
                    }}
                    placeholder="Ví dụ: tên phim, tên diễn viên,..."
                  />
                  <CiSearch className="ms-2" />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <div 
                  className="dropdown" 
                  onMouseEnter={() => setShowDropdown(true)} 
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="d-flex align-items-center">
                    <RxAvatar size={28} className="text-white me-2" />
                    <span className="text-white">minh hoàn</span>
                  </div>
                  {showDropdown && (
                    <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: 0, minWidth: '200px' }}>
                      <li>
                        <Link to="/account" className="dropdown-item">
                          Thông tin tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link to="/" onClick={handleLogout} className="dropdown-item">
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="ms-3">
                  <CiBookmark size={28} className="text-white" />
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/dang-nhap" className="text-white">
                Đăng Nhập <CiLogin size={28} className="text-white me-3" /> 
                </Link>
                {/* <Link to="/register">
                  <RxAvatar size={28} className="text-white" />
                </Link> */}
              </div>
            )}
          </div>
          </div>
          <Nav className="ms-auto">
          <NavDropdown title="Thể Loại" id="basic-nav-dropdown" className="multi-column-dropdown">
              <div className="d-flex flex-wrap" style={{ width: '300px' }}>
                {data_theloai.map((item, index) => (
                  <NavDropdown.Item as={Link} to={item.to} key={index} style={{ width: '50%' }}>
                    {item.theloai}
                  </NavDropdown.Item>
                ))}
              </div>
            </NavDropdown>
            <NavDropdown title="Quốc Gia" id="basic-nav-dropdown" >
            <div className="d-flex flex-wrap" style={{ width: '300px' }}>
              {data_quocgia.map((item, index) => (
                <NavDropdown.Item as={Link} to={item.to} key={index} style={{ width: '50%' }}>
                  {item.quocgia}
                </NavDropdown.Item>
              ))}
              </div>
            </NavDropdown>
            <NavDropdown title="Danh Mục" id="basic-nav-dropdown" >
              {data_danhmuc.map((item, index) => (
                <NavDropdown.Item as={Link} to={item.to} key={index}>
                  {item.danhmuc}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
