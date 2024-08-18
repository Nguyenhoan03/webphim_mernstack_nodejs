import React, { useEffect, useState,useContext,useMemo,Suspense } from 'react';
import Slider from 'react-slick';
import { Producthome } from '../../services/Productservices';
import './Style.scss';
import { Link } from 'react-router-dom';
// import Slickslider from '../../compoment/Slickslider/Slickslider';
// import Homepagebodyright from '../../compoment/Homepagebodyright/Homepagebodyright'
import { HomeContext } from '../../store/HomeContext';
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
  
  const rendercategorycontent = (title,data)=>(
    <div className="phimhanquoc mt-4">
    <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>{title}</h2>
    <div className="category_phim">
      <div className="row">
        {data && data.map((pbm, index) => (
          <div key={index} className="category_phim_card col-md-3" style={{ position: 'relative', height: '100%' }}>
            <Link to={`/${pbm.title}`} style={{color:'white',}}>
            <p
              className="title-badge"
              style={{ position: 'absolute', top: 5, left: 15, backgroundColor: '#BF1D28', color: 'white', fontWeight: 650, fontSize: 12, borderRadius: 4, width: 117, textAlign: 'center' }}
            >
              {pbm.trangthai}-{pbm.ngonngu}
            </p>
            <img style={{ width: 175, height: 245 }} src={pbm.hinhanh} alt={pbm.title} />
            <p className="description-badge2" style={{ marginLeft: 12 }}>
              {pbm.sotap && pbm.sotap.includes('Tập') ? pbm.sotap : `${pbm.sotap} Tập`}
            </p>
            <p className="description-badge" style={{ marginLeft: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {pbm.title}
            </p>
              </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  )


  return (
    <div className='homepage'>
      <div className="container">
        <div className="" style={{ margin: 'auto', marginLeft: '28%' }}>
          <img style={{ justifyContent: 'center', alignContent: 'center' }} src="https://motchillhot.net/banner/xembong88-607x75.gif" alt="" />
        </div>
        <div className="homepagebody">
          <div className="phimhot" style={{backgroundColor:'black'}}>
            <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>PHIM HOT</h2>
            <div className="slider-container">
              <div className="row">
                <Suspense fallback={<div>Loadding...</div>}>
                {phimhot.length > 0 && <Slickslider settings={settings} data={phimhot} />}
                </Suspense>
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
              <div className="category_phim">
                <div className="row">
                  {dataphim && dataphim.map((pbm, index) => (
                    <div key={index} className="category_phim_card col-md-3" style={{ position: 'relative', height: '100%' }}>
                      <Link to={`/${pbm.title}`} style={{color:'white',}}>
                      <p
                        className="title-badge"
                        style={{ position: 'absolute', top: 5, left: 15, backgroundColor: '#BF1D28', color: 'white', fontWeight: 650, fontSize: 12, borderRadius: 4, width: 117, textAlign: 'center' }}
                      >
                        {pbm.trangthai}-{pbm.ngonngu}
                      </p>
                      <img style={{ width: 175, height: 245 }} src={pbm.hinhanh} alt={pbm.title} />
                      <p className="description-badge2" style={{ marginLeft: 12 }}>
                        {pbm.sotap && pbm.sotap.includes('Tập') ? pbm.sotap : `${pbm.sotap} Tập`}
                      </p>
                      <p className="description-badge" style={{ marginLeft: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {pbm.title}
                      </p>
                        </Link>
                    </div>
                  ))}
                </div>
              </div>

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
