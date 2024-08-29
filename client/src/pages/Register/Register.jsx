import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { Userregister } from "../../services/Users";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (confirmPassword !== password) {
      setError("Passwords do not match. Please check your inputs.");
    } else {
      try {
        const response = await Userregister(email, password,name);
        if (response.success) {
          navigate('/dang-nhap'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        } else {
          setError(response.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setError("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="caption mt-3 d-flex">
          <p>
            <IoIosHome /> Motchill
          </p>
          <p> &gt; </p>
          <p style={{ color: "white" }}> Đăng ký</p>
        </div>

        <div className="formlogin">
          <form>
            <h2 style={{ textTransform: 'uppercase' }}>Đăng ký</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Họ tên</label>
              <input
                type="text"
                id="email"
                placeholder="Nhập họ tên"
                value={name}
                required
                onChange={(e) => setname(e.target.value)}
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Nhập lại password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleRegister} className="submit-btn">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
