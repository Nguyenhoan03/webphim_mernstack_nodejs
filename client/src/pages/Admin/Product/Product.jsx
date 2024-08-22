import React, { useEffect, useState } from "react";
import Leftadmincompoment from "../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment";
import Right_navbarcompoment from "../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment";

import {
  MdShoppingCart,
  MdAttachMoney,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import LazyLoad from "react-lazyload";
import { FaSearch } from "react-icons/fa";

export default function Product() {
  const [dataphim, setDataphim] = useState([]);

  const StatusCard = ({ icon, count, title }) => {
    return (
      <div className="status-card">
        <div className="status-card__icon">{icon}</div>
        <div className="status-card__info">
          <h4>{count}</h4>
          <span>{title}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataAllPhim = await axios.get(
          `${process.env.REACT_APP_API_URL}/product`
        );
        if (dataAllPhim) {
          setDataphim(dataAllPhim.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50;
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(dataphim)
    ? dataphim.slice(offset, offset + itemsPerPage)
    : [];
  const pageCount = Math.ceil(dataphim.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const Items = ({ currentItems }) => {
    return (
      <tbody>
        {currentItems &&
          currentItems.map((data, index) => (
            <LazyLoad
              key={index}
              height={100}
              offset={[-100, 0]}
              placeholder={
                <tr>
                  <td colSpan="19">Loading...</td>
                </tr>
              }
            >
              <tr>
                <td>{data.title}</td>
                <td>
                  <img
                    src={data.hinhanh}
                    alt={data.title}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{data.nameenglish}</td>
                <td>{data.trangthai}</td>
                <td>{data.sotap}</td>
                <td>{data.thoiluong}</td>
                <td>{data.namphathanh}</td>
                <td>{data.chatluong}</td>
                <td>{data.ngonngu}</td>
                <td>{data.daodien}</td>
                <td>{data.dienvien}</td>
                <td>{data.theloai}</td>
                <td>{data.quocgia}</td>
                <td>{data.descripts}</td>
                <td>{data.views}</td>
                <td>{data.likes}</td>
                <td>{data.category_id}</td>
                <td>
                  <FaEdit style={{ fontSize: 25, color: "green" }} />{" "}
                </td>
                <td>
                  <MdDeleteForever style={{ fontSize: 25, color: "red" }} />{" "}
                </td>
              </tr>
            </LazyLoad>
          ))}
      </tbody>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="row">
        <div className="col-md-2">
          <Leftadmincompoment />
        </div>
        <div className="col-md-10">
          <Right_navbarcompoment />
          <div className="row mt-4">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdShoppingCart />}
                count={dataphim.length}
                title="Tổng số phim"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdAttachMoney />}
                count="$2,632"
                title="Doanh thu"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<FaUserFriends />}
                count="1,711"
                title="Tổng số người dùng"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdOutlineShoppingBag />}
                count="2,001"
                title="Lượt truy cập hằng ngày"
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <button className="btn btn-primary">
                <Link
                  to="./add_phim"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Thêm phim mới
                </Link>
              </button>
            </div>
            <div className="">
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="">
                  <h2>Danh sách phim</h2>
                </div>
                <div
                  className=""
                  style={{ display: "inline-block", position: "relative" }}
                >
                  <input
                    type="text"
                    placeholder="nhập phim cần tìm ..."
                    style={{
                      paddingLeft: "10px",
                      position: "relative",
                      width: "400px",
                      height:"40px",
                      borderRadius: "10px"
                    }}
                  />
                  <FaSearch
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "40%",
                      transform: "translateY(-50%)",
                      color: "#888",
                    }}
                  />
                </div>
              </div>

              <table className="tableadminproduct">
                {/* <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Hình ảnh</th>
                                    <th>Nameenglish</th>
                                    <th>Trạng thái</th>
                                    <th>Số tập</th>
                                    <th>Thời lượng</th>
                                    <th>Năm phát hành</th>
                                    <th>Chất lượng</th>
                                    <th>Ngôn ngữ</th>
                                    <th>Đạo diễn</th>
                                    <th>Diễn viên</th>
                                    <th>Thể loại</th>
                                    <th>Quốc gia</th>
                                    <th>Mô tả</th>
                                    <th>Lượt xem</th>
                                    <th>Lượt thích</th>
                                    <th>ID danh mục</th>
                                    <th className='bg-primary'>Sửa</th>
                                    <th className='bg-danger'>Xóa</th>
                                </tr>
                            </thead> */}
                <Items currentItems={currentItems} />
              </table>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
