import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { Productdanhmucphimbo } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

import FilterfilmCompoment from "../../../compoment/FilterfilmCompoment/FilterfilmCompoment";
import './Style.scss'
export default function Phimbo() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productdanhmucphimbo(appliedFilters);
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
  <title>Phim Bộ Hay Nhất | Motchill - Xem Phim Online Miễn Phí</title>
  <meta name="description" content="Xem phim bộ hay nhất, tuyển chọn các bộ phim nhiều tập đặc sắc từ Hàn Quốc, Trung Quốc, Mỹ và nhiều quốc gia khác. Trải nghiệm xem phim bộ HD, miễn phí, với phụ đề tiếng Việt tại nghienphim" />
  <meta name="keywords" content="phim bộ, phim bộ Hàn Quốc, phim bộ Trung Quốc, phim bộ Mỹ, phim bộ Thái Lan, phim bộ Nhật Bản, phim dài tập, phim bộ tâm lý tình cảm, phim bộ hành động, phim bộ hài hước, phim bộ mới, xem phim bộ online, phim bộ 2024" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> Motchill</p>
                    <p> &gt; </p>
                    <p> Phim bộ</p>
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
                    Phim bộ
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
