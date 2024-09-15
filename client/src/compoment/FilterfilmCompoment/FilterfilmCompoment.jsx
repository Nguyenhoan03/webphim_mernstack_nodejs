import React from 'react';
import Itemsdanhmucfilm from '../Itemsdanhmucfilm/Itemsdanhmucfilm';
import { useNavigate } from 'react-router-dom';

export default function FilterfilmCompoment({ data, filters, setFilters, appliedFilters, setAppliedFilters }) {
    const navigate = useNavigate();

    const handleFilterChange = (e, key) => {
        const value = e.target.value;
        setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    };

    const handleFilterClick = () => {
        setAppliedFilters(filters);
        const queryParams = new URLSearchParams(filters).toString();
        navigate(`?${queryParams}`);
    };

    return (
        <div>
            <div
                style={{
                    color: '#fff',
                    padding: '20px',
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginTop: -10,
                }}
            >
                <div className="hanhdongleft_filter">
                    <label>Mới Cập Nhật</label>
                    <select
                        id="orderBy"
                        style={{ width: '100%', padding: '5px', borderRadius: 10 }}
                        onChange={e => handleFilterChange(e, 'orderBy')}
                    >
                        <option value=""></option>
                        <option value="createdAt">Mới Cập Nhật</option>
                        <option value="views">Lượt Xem</option>
                       
                    </select>
                </div>
                <div className="hanhdongleft_filter">
                    <label>Hành Động</label>
                    <select
                        id="category"
                        style={{ width: '100%', padding: '5px', borderRadius: 10 }}
                        onChange={e => handleFilterChange(e, 'category')}
                    >
                        <option value=""></option>
                        <option value="Hành Động">Hành Động</option>
                        <option value="Viễn Tưởng">Viễn Tưởng</option>
                        <option value="Bí Ẩn">Bí Ẩn</option>
                        {/* Add more options here */}
                    </select>
                </div>
                <div className="hanhdongleft_filter">
                    <label>Quốc Gia</label>
                    <select
                        id="country"
                        style={{ width: '100%', padding: '5px', borderRadius: 10 }}
                        onChange={e => handleFilterChange(e, 'country')}
                    >
                        <option value=""></option>
                        <option value="Trung Quốc">Trung Quốc</option>
                        <option value="Hàn Quốc">Hàn Quốc</option>
                        {/* Add more options here */}
                    </select>
                </div>
                <div className="hanhdongleft_filter">
                    <label>Phim Bộ/Lẻ</label>
                    <select
                        id="typeId"
                        style={{ width: '100%', padding: '5px', borderRadius: 10 }}
                        onChange={e => handleFilterChange(e, 'typeId')}
                    >
                        <option value=""></option>
                        <option value="24">Phim Bộ</option>
                        <option value="25">Phim Lẻ</option>
                        <option value="27">Phim Sắp Chiếu</option>
                        <option value="26">TV Show</option>
                    </select>
                </div>
                <div className="hanhdongleft_filter">
                    <label>Năm Sản Xuất</label>
                    <select
                        id="year"
                        style={{ width: '100%', padding: '5px', borderRadius: 10 }}
                        onChange={e => handleFilterChange(e, 'year')}
                    >
                        <option value=""></option>
                        {Array.from({ length: 15 }, (_, index) => 2009 + index + 1).map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hanhdongleft_filter">
                    <label>Từ Khóa</label>
                    <input
                        type="text"
                        style={{ width: '100%', padding: '5px', borderRadius: 10 }}
                        placeholder="Từ Khóa..."
                        onChange={e => handleFilterChange(e, 'keyword')}
                    />
                </div>
                <div className="hanhdongleft_filter" style={{ marginTop: 30 }}>
                    <button
                        style={{
                            width: '100%',
                            padding: '5px',
                            backgroundColor: '#a67c52',
                            color: '#fff',
                            fontWeight: 550,
                            border: 'none',
                            borderRadius: '5px',
                        }}
                        onClick={handleFilterClick}
                    >
                        Lọc phim
                    </button>
                </div>
            </div>

            <div className="">
                <div className="category_phim">
                    <Itemsdanhmucfilm data={data} />
                </div>
            </div>
        </div>
    );
}
