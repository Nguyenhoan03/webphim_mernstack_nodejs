// src/components/Navbar.js

import React from 'react';
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import "./Right_navbarcompoment.scss"
const Right_navbarcompoment = () => {
    return (
        <div className="navbar">
            <input type="text" placeholder="Search here..." />
            <div className="navbar__icons">
                <FaBell />
                <FaUserCircle />
            </div>
        </div>
    );
};

export default Right_navbarcompoment;
