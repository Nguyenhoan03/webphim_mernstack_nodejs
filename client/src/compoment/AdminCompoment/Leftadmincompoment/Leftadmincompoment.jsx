import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiProtools } from "react-icons/si";
import { GrAnalytics } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { useLocation, Link } from 'react-router-dom';
import "./Leftadmincompoment.scss";
import { HomeContext } from '../../../store/HomeContext';
import { useContext } from 'react';
const Leftadmincompoment = () => {
  const {roles,permissions} = useContext(HomeContext);
  const location = useLocation();
  const url = location.pathname;
  const sliceurl = url.replace('/admin/', '');
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
  };

  
  const hasRole = (role) => {
    return roles.includes(role);
  }
  const hasPermissions = (permission) => {
    return permissions.includes(permission);
  }

  return (
    <div className="Leftadmincompoment">
      <div className="sidebar__logo">
        <img src="https://png.pngtree.com/template/20200107/ourmid/pngtree-movie-logo-design-image_345319.jpg" alt="logo" />
      </div>
      <ul className="sidebar__menu">
        <li className={sliceurl === 'dashboard' ? 'active' : ''}>
          <Link style={{color:'white'}} to="/admin/dashboard">
            <MdDashboard /> Dashboard
          </Link>
        </li>
        {hasRole('admin') && (
        <li className={sliceurl === 'users' ? 'active' : ''}>
          <Link style={{color:'white'}} to="/admin/users">
            <FaUsers /> Users
          </Link>
        </li>
        )
      }
        <li className={sliceurl === 'products' ? 'active' : ''} style={{ position: 'relative' }}>
  <div onClick={toggleSubMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    
    {hasRole('admin') && (
      <Link to="/admin/products" style={{color: 'white'}}>
        <SiProtools /> Products
      </Link>
    )}
    
    {hasPermissions('VIP2') && (
      <span style={{paddingLeft: 10}}>VIP2</span>
    )}
    
    {(hasRole('admin') || hasPermissions('VIP2')) && (
      <span style={{paddingLeft: 10}}>{isSubMenuVisible ? '▲' : '▼'}</span>
    )}
    
  </div>

  {(hasRole('admin') || hasPermissions('VIP2')) && (
    <ul className={`sidebar__submenu ${isSubMenuVisible ? 'visible' : ''}`}>
      <li>
        <Link to="/admin/products/add_phim">Thêm phim mới</Link>
      </li>
      <li>
        <Link to="/admin/products/add_episode">Thêm tập phim</Link>
      </li>
    </ul>
  )}
</li>

        <li className={sliceurl === 'analytics' ? 'active' : ''}>
          <Link style={{color:'white'}} to="/admin/analytics">
            <GrAnalytics /> Analytics
          </Link>
        </li>   
        {hasRole('admin') && (
        <li className={sliceurl === 'auto_crawlphim' ? 'active' : ''}>
          <Link style={{color:'white'}} to="/admin/auto_crawlphim">
            <GrAnalytics /> Auto crawl phim
          </Link>
        </li>
        )
      }
<li className={sliceurl === 'settings' ? 'active' : ''}>
          <Link style={{color:'white'}} to="/admin/settings">
            <IoSettings /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Leftadmincompoment;
