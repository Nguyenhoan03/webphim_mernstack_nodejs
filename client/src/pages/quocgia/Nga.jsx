import React, { useEffect, useState,Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_nga } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Nga() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_nga(appliedFilters);
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
  <title>Xem Phim Nga Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Nga mới nhất, chất lượng cao với nhiều thể loại: hành động, tình cảm, tâm lý và nhiều thể loại khác tại Nghiện Phim." />
  <meta name="keywords" content="phim Nga, xem phim Nga, phim hành động Nga, phim tình cảm Nga, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Nga Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Khám phá những bộ phim Nga đặc sắc và hấp dẫn với chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Nga" />
  <meta property="og:url" content="https://www.nghienphim.com/nga" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/nga" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Nga</p>
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
                    Phim Nga
                </p>
                <div className="row">
                    <div className="hanhdongleft col-md-9">
                        <div className="">
                            <div className="category_phim">
<Suspense fallback={<div>Loadding...</div>}>

                            <FilterfilmCompoment
                            data={data}
                            filters={filters}
                            setFilters={setFilters}
                            appliedFilters={appliedFilters}
                            setAppliedFilters={setAppliedFilters}
                        />
</Suspense>

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
