import React, { useEffect, useState,Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_ando } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Ando() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_ando(appliedFilters);
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
  <title>Xem Phim Ấn Độ Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Khám phá phim Ấn Độ mới nhất, đa dạng thể loại: tình cảm, hành động, âm nhạc, và nhiều hơn nữa. Xem phim Ấn Độ tại Nghiện Phim." />
  <meta name="keywords" content="phim Ấn Độ, xem phim Ấn Độ, phim tình cảm Ấn Độ, phim hành động Ấn Độ, phim Bollywood" />
  <meta property="og:title" content="Xem Phim Ấn Độ Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Tận hưởng những bộ phim Ấn Độ đặc sắc với đa dạng thể loại và chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Ấn_Độ" />
  <meta property="og:url" content="https://www.nghienphim.com/an-do" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/an-do" />
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
                    Phim Ấn Độ
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
