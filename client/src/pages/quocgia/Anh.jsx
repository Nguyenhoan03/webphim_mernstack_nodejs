import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_anh } from "../../services/Productservices";

import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";import { Helmet } from "react-helmet";

export default function Anh() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_anh(appliedFilters);
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
  <title>Xem Phim Anh Quốc Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Anh Quốc mới nhất, chất lượng cao với các thể loại: tình cảm, kinh dị, hành động và nhiều thể loại khác tại Nghiện Phim." />
  <meta name="keywords" content="phim Anh, xem phim Anh Quốc, phim tình cảm Anh, phim kinh dị Anh, phim hành động Anh" />
  <meta property="og:title" content="Xem Phim Anh Quốc Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Khám phá bộ sưu tập phim Anh Quốc mới nhất, đa dạng thể loại với chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Anh" />
  <meta property="og:url" content="https://www.nghienphim.com/anh" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/anh" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
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
                    Phim Anh
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
