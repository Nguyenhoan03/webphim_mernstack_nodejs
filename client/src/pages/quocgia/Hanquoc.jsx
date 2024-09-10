import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { Productquocgia_hanquoc } from "../../services/Productservices";
import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";import { Helmet } from "react-helmet";

export default function Hanquoc() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productquocgia_hanquoc(appliedFilters);
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
  <title>Xem Phim Hàn Quốc Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Hàn Quốc mới nhất, hấp dẫn với đầy đủ các thể loại: tình cảm, hành động, hài hước và nhiều hơn nữa tại Nghiện Phim." />
  <meta name="keywords" content="phim Hàn Quốc, xem phim Hàn Quốc, phim tình cảm Hàn Quốc, phim hành động Hàn Quốc, phim lẻ Hàn Quốc, phim bộ Hàn Quốc" />
  <meta property="og:title" content="Xem Phim Hàn Quốc Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Thưởng thức những bộ phim Hàn Quốc đình đám nhất với chất lượng cao. Xem phim tình cảm, hài hước, hành động và nhiều thể loại khác tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Hàn_Quốc" />
  <meta property="og:url" content="https://www.nghienphim.com/han-quoc" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/han-quoc" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> Motchill</p>
                    <p> &gt; </p>
                    <p>Hàn Quốc</p>
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
                    Phim Hàn Quốc
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
