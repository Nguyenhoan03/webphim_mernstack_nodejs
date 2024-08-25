import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import "./Style.scss";
import { ServiceUserlogin } from "../../services/Users";
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await ServiceUserlogin(email, password);
      if (data.success) {
        // navigate('/');
        window.location.href = "/"
      } else {
        setError('Thông tin đăng nhập không chính xác !!!');
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {  // Sửa thành "Enter"
      handleLogin();
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="caption mt-3 d-flex">
          <p>
            <IoIosHome /> Motchill
          </p>
          <p> > </p>
          <p style={{ color: "white" }}> Đăng nhập</p>
        </div>

        <div className="formlogin">
          <form>
            <h2>Đăng nhập</h2>
           
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown cho input
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown cho input
              />
            </div>
            <div className="d-flex">
              <div className="checkbox-group py-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" style={{ color: "white" }}>
                  Ghi nhớ
                </label>
              </div>
              <div className="forgot-password">
                <a href="#">Quên mật khẩu ? </a> <Link to='/dang-ky'> Đăng kí tài khoản mới</Link>
              </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={handleLogin} className="submit-btn">
              Đăng nhập
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
}
