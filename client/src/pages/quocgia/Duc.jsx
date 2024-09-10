import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_duc } from "../../services/Productservices";

import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";import { Helmet } from "react-helmet";

export default function Duc() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_duc(appliedFilters);
                setData(result);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        // Fetch data only when appliedFilters change
        fetchData();
    }, [appliedFilters]);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Đức Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Tổng hợp phim Đức mới nhất, đa dạng thể loại như hành động, tình cảm, hài hước và nhiều thể loại khác tại Nghiện Phim." />
  <meta name="keywords" content="phim Đức, xem phim Đức, phim tình cảm Đức, phim hành động Đức, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Đức Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Thưởng thức những bộ phim Đức đặc sắc với chất lượng cao và nội dung hấp dẫn tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Đức" />
  <meta property="og:url" content="https://www.nghienphim.com/duc" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/duc" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> Motchill</p>
                    <p> &gt; </p>
                    <p>Ấn Độ</p>
                </div>
                <p
                    style={{
                        textTransform: "uppercase",
                        fontSize: 23,
                        color: "white",
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                        borderBottom: "1px solid gray",
                        paddingBottom: 10,
                    }}
                >
                    Phim Ấn Độ
                </p>
                <div className="row">
                    <div className="hanhdongleft col-md-9">
                        <div className="">
                            <div className="category_phim">
                            <FilterfilmCompoment
                            data={data}
                            filters={filters}
                            setFilters={setFilters}
                            appliedFilters={appliedFilters}
                            setAppliedFilters={setAppliedFilters}
                        />
                            </div>
                        </div>
                    </div>
                    <div className="hanhdongright col-md-3">
                        <Homepagebodyright />
                    </div>
                </div>
            </div>
        </div>
    );
}
