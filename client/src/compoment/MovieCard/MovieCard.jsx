import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="category_phim">
      <div className="row">
        {data &&
          data.map((pbm, index) => (
            <div
              key={index}
              className="category_phim_card col-md-3"
              style={{
                position: "relative",
                height: "100%",
                marginBottom: "20px",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/${pbm.title}`} style={{ color: "white" }}>
                <p
                  className="title-badge"
                  style={{
                    position: "absolute",
                    top: 5,
                    left: 10,
                    backgroundColor: "#BF1D28",
                    color: "white",
                    fontWeight: 650,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "2px 8px",
                    textAlign: "center",
                    zIndex: 2,
                  }}
                >
                  {pbm.trangthai}-{pbm.ngonngu}
                </p>
                <img
                  style={{ width: 175, height: 245, borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                  src={pbm.hinhanh}
                  alt={pbm.title}
                />
                <p
                  className="description-badge2"
                  style={{
                    marginLeft: 12,
                    marginTop: 10,
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {pbm.sotap && pbm.sotap.includes("Tập")
                    ? pbm.sotap
                    : `${pbm.sotap} Tập`}
                </p>
                <p
                  className="description-badge"
                  style={{
                    marginLeft: 12,
                    fontWeight: 600,
                    fontSize: 16,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: 5,
                  }}
                >
                  {pbm.title}
                </p>

                {hoveredIndex === index && (
                  <div
                    className="hover-info"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      color: "white",
                      padding: "15px",
                      boxSizing: "border-box",
                      zIndex: 10,
                      borderRadius: "8px",
                    }}
                  >
                    <h5 style={{ fontSize: "18px", marginBottom: "10px" }}>
                      {pbm.title}
                    </h5>
                    <p><span style={{fontSize:'bold'}}> Thể loại:</span> {pbm.theloai}</p>
                    <p><span style={{fontSize:'bold'}}> Năm phát hành:</span> {pbm.namphathanh}</p>
                    <p><span style={{fontSize:'bold'}}> Viewer:</span> {pbm.views}</p>
                    <p className="description"><span style={{fontSize:'bold'}}> Descripts:</span> {pbm.descripts}</p>
                    <p>
                      <Link
                        to={`/${pbm.title}`}
                        style={{ color: "#FFD700", fontWeight: "bold" }}
                      >
                        Xem thêm
                      </Link>
                    </p>
                  </div>
                )}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieCard;
