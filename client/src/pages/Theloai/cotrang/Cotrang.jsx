import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { Productdanhmucphimcotrang } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

import FilterfilmCompoment from "../../../compoment/FilterfilmCompoment/FilterfilmCompoment";
export default function Cotrang() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productdanhmucphimcotrang(appliedFilters);
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
  <title>Phim Cổ Trang | Motchill - Xem phim online</title>
  <meta name="description" content="Tuyển tập phim cổ trang đặc sắc từ nhiều nền văn hóa, bao gồm Trung Quốc, Hàn Quốc, và nhiều quốc gia khác. Xem phim cổ trang chất lượng cao tại nghienphim" />
  <meta name="keywords" content="phim cổ trang, phim cổ trang Trung Quốc, phim cổ trang Hàn Quốc, phim cổ trang Việt Nam, xem phim cổ trang, phim cổ trang mới" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> Motchill</p>
                    <p> &gt; </p>
                    <p> Cổ trang</p>
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
                    Phim cổ trang
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
