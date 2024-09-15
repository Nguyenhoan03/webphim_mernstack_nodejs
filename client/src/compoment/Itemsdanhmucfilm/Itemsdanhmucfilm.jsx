import "./Style.scss";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";
  export default function Itemsdanhmucfilm({data}) {
    const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25;
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(data) ? data.slice(offset, offset + itemsPerPage) : [];
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
      
     
    const Items = ({ currentItems }) => {
    
        return (
          <>
            {currentItems && currentItems.map((pbm, index) => (
              <div key={index} className="category_phim_card col-md-3" style={{ position: 'relative', height: '100%' }}>
                <p
                  className="title-badge"
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 15,
                    backgroundColor: '#BF1D28',
                    color: 'white',
                    fontWeight: 650,
                    fontSize: 12,
                    borderRadius: 4,
                    width: 117,
                    textAlign: 'center'
                  }}
                >
                  {pbm.trangthai}-{pbm.ngonngu}
                </p>
                <picture>
                <source srcSet={pbm.hinhanh.replace(/\.(jpg|jpeg|png)$/, ".webp")} type="image/webp" />
                <img style={{ width: 175, height: 245 }} src={pbm.hinhanh} alt={pbm.title} loading="lazy"/>
              </picture>

                <p className="description-badge2" style={{ marginLeft: 12 }}>
                  {pbm.sotap && pbm.sotap.includes('Tập') ? pbm.sotap : `${pbm.sotap} Tập`}
                </p>
                <p className="description-badge" style={{ marginLeft: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Link to={`/${pbm.title}`} style={{ color: 'white' }}>
                    {pbm.title}
                  </Link>
                </p>
              </div>
            ))}
          </>
        );
      };
    return (
      <div>
         <div className="row">
                  <Items currentItems={currentItems} />
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  activeClassName="active"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                />
      </div>
    )
  }
  