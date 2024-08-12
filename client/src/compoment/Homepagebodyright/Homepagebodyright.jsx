import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './Style.scss';
import { HomeContext } from '../../store/HomeContext';
export default function Homepagebodyright() {
  const { phimhanhdong, trendingData, phimsapchieu } = useContext(HomeContext);
 
  return (
    <div className="homepagebody_right mt-2">
      <div className="homepagebodyright_phimmsapchieu">
        <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>
          PHIM HÀNH ĐỘNG
        </h2>
        {phimhanhdong.map((phd, index) => (
          <div key={index} className="d-flex mt-2">
            <img style={{ width: 85, height: 105 }} src={phd.hinhanh} alt="" />
            <Link to={`/${phd.title}`}>
              <div className="homepagebodyright_phimmsapchieu_detail">
                <p style={{ marginTop: 0 }}>{phd.title}</p>
                <p>{phd.namphathanh}</p>
                <p>
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="homepagebodyright_phimmsapchieu">
        <h2>Trending</h2>
        <div className="tabs">
          <button>Ngày</button>
          <button>Tuần</button>
          <button>Tháng</button>
        </div>
        <ul>
          {trendingData.map((item) => (
            <Link to={`/${item.title}`} key={item.id}>
              <li>
                <span className="rank">{item.id}</span>
                <span className="title">{item.title}</span>
                <span className="views">{item.likes} lượt quan tâm</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="namphathanh">
      <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>
          NĂM PHÁT HÀNH
        </h2>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2025</Link></button>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2024</Link></button>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2023</Link></button>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2021</Link></button>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2021</Link></button>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2020</Link></button>
          <button className='btn btn-secondary mx-1 mt-1 btn-outline-dark'> <Link>2019</Link></button>
      </div>

      <div className="homepagebodyright_phimmsapchieu mt-3">
        <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>
          PHIM SẮP CHIẾU
        </h2>
        {phimsapchieu.map((phd, index) => (
          <div key={index} className="d-flex mt-2">
            <img style={{ width: 85, height: 105 }} src={phd.hinhanh} alt="" />
            <Link to={`/${phd.title}`}>
              <div className="homepagebodyright_phimmsapchieu_detail">
                <p style={{ marginTop: 0 }}>{phd.title}</p>
                <p>{phd.namphathanh}</p>
                <p>
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                  <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
