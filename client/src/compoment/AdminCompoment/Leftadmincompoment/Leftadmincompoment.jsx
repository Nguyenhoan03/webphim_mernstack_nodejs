import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiProtools } from "react-icons/si";
import { GrAnalytics } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { useLocation, Link } from 'react-router-dom';
import "./Leftadmincompoment.scss";

const Leftadmincompoment = () => {
  const location = useLocation();
  const url = location.pathname;
  const sliceurl = url.replace('/admin/', '');

  return (
    <div className="Leftadmincompoment bg-white">
      <div className="sidebar__logo">
        <img src="https://png.pngtree.com/template/20200107/ourmid/pngtree-movie-logo-design-image_345319.jpg" alt="logo" />
      </div>
      <ul className="sidebar__menu">
        <li style={{ backgroundColor: sliceurl === 'dashboard' ? '#3c475c' : '' }}>
          <Link to="/admin/dashboard" style={{ color: sliceurl === 'dashboard' ? '#fff' : '#000' }}>
            <MdDashboard /> Dashboard
          </Link>
        </li>
        <li style={{ backgroundColor: sliceurl === 'users' ? '#3c475c' : '' }}>
          <Link to="/admin/users" style={{ color: sliceurl === 'users' ? '#fff' : '#000' }}>
            <FaUsers /> Users
          </Link>
        </li>
        <li style={{ backgroundColor: sliceurl === 'products' ? '#3c475c' : '' }}>
          <Link to="/admin/products" style={{ color: sliceurl === 'products' ? '#fff' : '#000' }}>
            <SiProtools /> Products
          </Link>
        </li>
        <li style={{ backgroundColor: sliceurl === 'analytics' ? '#3c475c' : '' }}>
          <Link to="/admin/analytics" style={{ color: sliceurl === 'analytics' ? '#fff' : '#000' }}>
            <GrAnalytics /> Analytics
          </Link>
        </li>
        <li style={{ backgroundColor: sliceurl === 'auto_crawlphim' ? '#3c475c' : '' }}>
          <Link to="/admin/auto_crawlphim" style={{ color: sliceurl === 'auto_crawlphim' ? '#fff' : '#000' }}>
            <GrAnalytics /> Auto crawl phim
          </Link>
        </li>
        <li style={{ backgroundColor: sliceurl === 'settings' ? '#3c475c' : '' }}>
          <Link to="/admin/settings" style={{ color: sliceurl === 'settings' ? '#fff' : '#000' }}>
            <IoSettings /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Leftadmincompoment;
