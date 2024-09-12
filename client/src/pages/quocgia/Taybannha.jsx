import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_taybannha } from "../../services/Productservices";

import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";import { Helmet } from "react-helmet";

export default function Taybannha() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_taybannha(appliedFilters);
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
  <title>Xem Phim Tây Ban Nha Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Tây Ban Nha mới nhất, chất lượng cao với nhiều thể loại: hành động, tình cảm, trinh thám, kinh dị và nhiều hơn nữa tại Nghiện Phim." />
  <meta name="keywords" content="phim Tây Ban Nha, xem phim Tây Ban Nha, phim tình cảm Tây Ban Nha, phim kinh dị Tây Ban Nha, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Tây Ban Nha Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Khám phá những bộ phim Tây Ban Nha đặc sắc và hấp dẫn với chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Tây_Ban_Nha" />
  <meta property="og:url" content="https://www.nghienphim.com/tay-ban-nha" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/tay-ban-nha" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Tây Ban Nha</p>
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
                    Phim Tây Ban Nha
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
