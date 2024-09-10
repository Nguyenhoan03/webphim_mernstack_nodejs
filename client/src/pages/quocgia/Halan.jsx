import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_halan } from "../../services/Productservices";

import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";import { Helmet } from "react-helmet";

export default function Halan() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_halan(appliedFilters);
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
  <title>Xem Phim Hà Lan Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Khám phá bộ sưu tập phim Hà Lan mới nhất với đa dạng thể loại: hài hước, tình cảm, hành động và nhiều hơn nữa tại Nghiện Phim." />
  <meta name="keywords" content="phim Hà Lan, xem phim Hà Lan, phim tình cảm Hà Lan, phim hành động Hà Lan, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Hà Lan Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Xem phim Hà Lan đặc sắc, chất lượng cao với nhiều thể loại hấp dẫn tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Hà_Lan" />
  <meta property="og:url" content="https://www.nghienphim.com/ha-lan" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/ha-lan" />
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
