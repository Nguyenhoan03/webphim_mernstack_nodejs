import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { Productdanhmucphimkhoahoc } from "../../../services/Productservices";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import FilterfilmCompoment from "../../../compoment/FilterfilmCompoment/FilterfilmCompoment";
import Itemsdanhmucfilm from "../../../compoment/Itemsdanhmucfilm/Itemsdanhmucfilm";
import { Helmet } from "react-helmet";
export default function Khoahoc() {
  const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Productdanhmucphimkhoahoc(appliedFilters);
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
  <title>Phim Khoa Học | nghienphim - Xem phim online</title>
  <meta name="description" content="Xem phim khoa học đầy kiến thức, từ những khám phá vũ trụ đến các thí nghiệm thú vị tại nghienphim" />
  <meta name="keywords" content="phim khoa học, phim khám phá, phim khoa học viễn tưởng, phim khám phá vũ trụ, xem phim khoa học" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Phim 18+</p>
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
                    phim 18+
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