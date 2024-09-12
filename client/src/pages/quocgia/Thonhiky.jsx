import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_thonhiky } from "../../services/Productservices";

import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";import { Helmet } from "react-helmet";

export default function Thonhiky() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_thonhiky(appliedFilters);
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
  <title>Xem Phim Thổ Nhĩ Kỳ Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Thổ Nhĩ Kỳ hay nhất với các thể loại: tình cảm, tâm lý, hành động và nhiều thể loại khác tại Nghiện Phim." />
  <meta name="keywords" content="phim Thổ Nhĩ Kỳ, xem phim Thổ Nhĩ Kỳ, phim tình cảm Thổ Nhĩ Kỳ, phim hành động Thổ Nhĩ Kỳ, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Thổ Nhĩ Kỳ Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Thưởng thức những bộ phim Thổ Nhĩ Kỳ đặc sắc với chất lượng cao và nội dung hấp dẫn tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Thổ_Nhĩ_Kỳ" />
  <meta property="og:url" content="https://www.nghienphim.com/tho-nhi-ky" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/tho-nhi-ky" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Thổ Nhĩ Kỳ</p>
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
                    Phim Thổ Nhĩ Kỳ
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
