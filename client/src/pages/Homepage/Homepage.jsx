import React, { useEffect, useState,useContext,Suspense } from 'react';
import { Producthome } from '../../services/Productservices';
import './Style.scss';
import { Helmet } from 'react-helmet';

import MovieCard from '../../compoment/MovieCard/MovieCard';
import { HomeContext } from '../../store/HomeContext';
import LazyLoad from "react-lazyload";

const Homepagebodyright = React.lazy(() => import('../../compoment/Homepagebodyright/Homepagebodyright'));
const Slickslider = React.lazy(() => import('../../compoment/Slickslider/Slickslider'));
export default function Homepage() {
  const { settings,phimhot } = useContext(HomeContext);
 
  const [phimbomoi, setphimbomoi] = useState([]);
  const [phimlemoi, setphimlemoi] = useState([]);
  const [phimhoanthanh, setphimhoanthanh] = useState([]);
 
  const [phimhoathinh, setphimhoathinh] = useState([]);
  const [phimtamlytinhcam, setphimtamlytinhcam] = useState([]);
  const [phimvientuong, setphimvientuong] = useState([]);
  const [dataphim, setDataphim] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Producthome();
      setphimbomoi(data.phimbomoicapnhat);
      setphimlemoi(data.phimlemoicapnhat);
      setphimhoanthanh(data.phimdahoanthanh);
      setphimhoathinh(data.phimhoathinh);
      setphimtamlytinhcam(data.phimtamlytimcam);
      setphimvientuong(data.phimvientuong);
      setDataphim(data.phimbomoicapnhat); 
    };
    fetchData();
  }, []);

  const handleClickpb = (key) => {
    setActiveTab(key);
    const newData = [phimbomoi, phimlemoi, phimhoanthanh][key];
    setDataphim(newData);
  };
  
  const rendercategorycontent = (title, data) => (
    <LazyLoad height={200} offset={100} once>
      <div className="phimhanquoc mt-4">
        <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>{title}</h2>
        <MovieCard data={data} />
      </div>
    </LazyLoad>
  );


  return (
    
    <div className='homepage'>
        <Helmet>
  <title>Nghiện Phim | Xem Phim Online Miễn Phí - Tổng Hợp Phim Hay Nhất 2024</title>
  <meta name="description" content="Xem phim online miễn phí với tuyển tập đầy đủ các thể loại: hành động, tình cảm, hài hước, kinh dị, cổ trang, khoa học viễn tưởng, phim bộ, phim lẻ, phim sắp chiếu, và nhiều hơn nữa. Trải nghiệm phim chất lượng cao với phụ đề tiếng Việt tại Nghiện Phim." />
  <meta name="keywords" content="xem phim online, phim hành động, phim tình cảm, phim hài, phim kinh dị, phim cổ trang, phim khoa học viễn tưởng, phim bộ, phim lẻ, phim sắp chiếu, phim shows, phim tài liệu, phim tâm lý, phim hoạt hình, phim 2024, xem phim miễn phí, xem phim chất lượng cao, phim phụ đề tiếng Việt" />
  
  <meta property="og:title" content="Nghiện Phim | Xem Phim Online Miễn Phí - Tổng Hợp Phim Hay Nhất 2024" />
  <meta property="og:description" content="Khám phá kho phim online miễn phí với đầy đủ các thể loại: hành động, tình cảm, hài hước, kinh dị, cổ trang, khoa học viễn tưởng, phim bộ, phim lẻ, và nhiều hơn nữa. Trải nghiệm phim chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="https://motchillj.net/motchill.png?v1.0.2" />
  <meta property="og:url" content="https://www.nghienphim.com/" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Nghiện Phim | Xem Phim Online Miễn Phí - Tổng Hợp Phim Hay Nhất 2024" />
  <meta name="twitter:description" content="Xem phim online miễn phí với nhiều thể loại: hành động, tình cảm, hài hước, kinh dị, cổ trang, khoa học viễn tưởng, và nhiều thể loại khác tại Nghiện Phim." />
  <meta name="twitter:image" content="https://motchillj.net/motchill.png?v1.0.2" />

  <link rel="canonical" href="https://nghienphim.click/" />
  <meta name="robots" content="index, follow" />
</Helmet>
      <div className="container">
      <div className="img_ad">
    <img src="https://motchillhot.net/banner/xembong88-607x75.gif" alt="" />
</div>

        <div className="homepagebody">
          <div className="phimhot" style={{backgroundColor:'black'}}>
            <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>PHIM HOT</h2>
            <div className="slider-container">
              <div className="row">
                {/* <Suspense fallback={<div>Loadding...</div>}> */}
                {phimhot.length > 0 && <Slickslider settings={settings} data={phimhot} />}
                {/* </Suspense> */}
              </div>
            </div>
          </div>
          <div className="row mt-3" >
           <div className="homepagebody_left col-md-9">
            <div className="category">
              <div className="category_caption">
                <p
                  style={{
                    color: activeTab === 0 ? '#ff9601' : 'white',
                    borderBottom: activeTab === 0 ? '3px solid #ff9601' : '3px solid gray',
                    paddingBottom: 0,
                    textTransform: 'uppercase'
                  }}
                  onClick={() => handleClickpb(0)}
                >
                  PHIM BỘ MỚI CẬP NHẬT
                </p>
                <p
                  className='mt-1'
                  style={{
                    color: activeTab === 1 ? '#ff9601' : 'white',
                    borderBottom: activeTab === 1 ? '3px solid #ff9601' : '3px solid gray',
                    paddingBottom: 0,
                    textTransform: 'uppercase'
                  }}
                  onClick={() => handleClickpb(1)}
                >
                  Phim lẻ mới cập nhật
                </p>
                <p
                  className='mt-1'
                  style={{
                    color: activeTab === 2 ? '#ff9601' : 'white',
                    borderBottom: activeTab === 2 ? '3px solid #ff9601' : '3px solid gray',
                    paddingBottom: 0,
                    textTransform: 'uppercase'
                  }}
                  onClick={() => handleClickpb(2)}
                >
                  Phim đã hoàn thành
                </p>
              </div>
            
              <MovieCard data={dataphim}/>


              {rendercategorycontent('PHIM HOẠT HÌNH', phimhoathinh)}
              {rendercategorycontent('PHIM TÂM LÝ TÌNH CẢM', phimtamlytinhcam)}
              {rendercategorycontent('PHIM VIỄN TƯỞNG', phimvientuong)}
            </div>
          </div>
          <div className="col-md-3">
              <Suspense fallback={<div>Loading...</div>}>
                <Homepagebodyright />
              </Suspense>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
