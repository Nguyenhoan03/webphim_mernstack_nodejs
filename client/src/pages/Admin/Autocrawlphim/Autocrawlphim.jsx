import React from 'react';
import Leftadmincompoment from '../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import axios from 'axios';
import "./Autocrawlphim.scss";

export default function Authcrawlphim() {
    const StatusCard = ({ icon, count, title }) => {
        return (
            <div className="status-card">
                <div className="status-card__icon">
                    {icon}
                </div>
                <div className="status-card__info">
                    <h4>{count}</h4>
                    <span>{title}</span>
                </div>
            </div>
        );
    };

    const categories = [
        'Hành Động', 'Cổ Trang', 'Chiến Tranh', 'Viễn Tưởng', 'Kinh Dị',
        'Tài Liệu', 'Bí Ẩn', 'Phim 18+', 'Tình Cảm', 'Tâm Lý',
        'Thể Thao', 'Phiêu Lưu', 'Âm Nhạc', 'Gia Đình', 'Học Đường',
        'Hài Hước', 'Hình Sự', 'Võ Thuật', 'Khoa học', 'Thần Thoại',
        'Chính Kịch', 'Kinh Điển', 'Hoạt Hình', 'Phim Bộ', 'Phim Lẻ', 'Phim Shows', 'Phim Sắp Chiếu'
    ];

    const handleLinkClick = async (category) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/crawl`, { category });

            if (response.status === 200) {
                alert('bạn đã crawl xong giữ liệu phim ' + category)
                window.location.reload();
            } else {
                console.error('Failed to trigger crawl:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='dashboard-container'>
            <div className="row">
                <div className="col-md-2">
                    <Leftadmincompoment />
                </div>
                <div className="col-md-10">
                    <Right_navbarcompoment />
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdShoppingCart />} count="1,995" title="Total Sales" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdAttachMoney />} count="$2,632" title="Total Income" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<FaUserFriends />} count="1,711" title="Total Orders" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdOutlineShoppingBag />} count="2,001" title="Daily Visits" />
                        </div>
                    </div>
                        <h3 className='text-danger'>Crawl Phim</h3>
                    <div className="category-buttons">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleLinkClick(category)}
                            className="category-button"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                </div>
            </div>
        </div>
    );
}
