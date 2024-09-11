import React, { useState, useEffect } from 'react';
import './Style.scss';
import { useParams, Link } from 'react-router-dom';
import Homepagebodyright from '../../compoment/Homepagebodyright/Homepagebodyright';
import CommentCompoment from '../../compoment/CommentCompoment/CommentCompoment';
import { ProductDetail } from '../../services/Productservices';
import { Dataxemphim } from '../../services/Xemfilmservices';
import { MdError } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { IoIosHome } from 'react-icons/io';
import { BsArrowsFullscreen } from "react-icons/bs";
import { Helmet } from 'react-helmet';

export default function Xemphim() {
  const { title, episode } = useParams();
  const [datafilm, setDataFilm] = useState(null);
  const [datadetail, setDataDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ktranextepisode, setKtraNextEpisode] = useState(false);
  const [parent_id, setParentId] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Dataxemphim(title, episode);
        setDataFilm(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (title && episode) fetchData();
  }, [title, episode]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (title) {
          const data = await ProductDetail(title);
          setDataDetail(data.datafilm);
          setComment(data.comments);
          setParentId(data.parent_id);
        }
      } catch (error) {
        setError(error);
      }
    };

    if (title) fetchDetail();
  }, [title]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!datafilm) return null;

  const tongsotapfilm = datadetail?.linkfilms.length;
  const numbertapfilmcurent = parseInt(episode.replace('tap-', ''));
  const tapTiepTheo = numbertapfilmcurent + 1;

  const handlenextepisode = () => {
    if (numbertapfilmcurent < tongsotapfilm) {
      window.location.href = `/xem-phim/${datadetail.title}/tap-${tapTiepTheo}`;
    } else {
      setKtraNextEpisode(true);
    }
  };

  return (
    <div className=''>
         <Helmet>
        <title>Xem phim {`${datafilm?.title} - Tập ${datafilm?.episode}`}</title>
        <meta name='description' content={`${datafilm?.title} - Tập ${datafilm?.episode}`} />
        <meta name='keywords' content={`${datafilm?.title}, Xem phim ${datafilm?.title}, tập ${datafilm?.episode}`} />
        <meta property='og:title' content={`Xem phim ${datafilm?.title} - Tập ${datafilm?.episode}`} />
        <meta property='og:description' content={`${datafilm?.title} - Tập ${datafilm?.episode}`} />
        <meta property='og:type' content='video.episode' />
      </Helmet>

      <div className="container">
        <Breadcrumb datadetail={datadetail} datafilm={datafilm} />
        
        <div className="row pagexemphim">
          <div className="xemphim_left col-md-9">
            <VideoPlayer linkfilm={datafilm.linkfilm} />
            <VideoControls 
              handlenextepisode={handlenextepisode} 
              ktranextepisode={ktranextepisode} 
            />
            <EpisodeList 
              datadetail={datadetail} 
              numbertapfilmcurent={numbertapfilmcurent} 
            />
            <Description 
              datadetail={datadetail} 
              datafilm={datafilm} 
            />
            <CommentCompoment 
              titlefilm={title} 
              comments={comment} 
              parent_id={parent_id} 
            />
          </div>
          
          <div className="xemphim_right col-md-3">
            <Homepagebodyright />
          </div>
        </div>
      </div>
    </div>
  );
}

const Breadcrumb = ({ datadetail, datafilm }) => (
  <div className="caption mt-3 d-flex">
    <p><IoIosHome /> nghienphim</p>
    <p> &gt; </p>
    <p> {datadetail?.theloai}</p>
    <p> &gt; </p>
    <p style={{ color: 'white' }}> {datafilm?.title} - Tập {datafilm?.episode}</p>
  </div>
);

const VideoPlayer = ({ linkfilm }) => (
  <div className="xemphim" style={{ paddingLeft: 15, position: 'relative' }}>
    <iframe 
      id="videoFrame"
      src={linkfilm}
      frameBorder="0"
      allowFullScreen
      style={{ display: 'block', width: '100%', height: 400, border: 'none', scrolling: 'auto' }}
    />
  </div>
);

const VideoControls = ({ handlenextepisode, ktranextepisode }) => (
  <div className="container mt-2 d-flex justify-content-between">
    <div className="d-flex">
      <button className='btn text-white' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 12 }}>
        <BsArrowsFullscreen /> Phóng to
      </button>
      <button className='btn text-white ms-2' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 12 }}>
        <MdError /> Báo lỗi
      </button>
    </div>
    <ServerSwitch />
    <div className="d-flex">
      <button className='btn text-white' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 12 }}>
        <FaRegLightbulb /> Tắt đèn
      </button>
      <button onClick={handlenextepisode} className='btn ms-2' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 12, color: ktranextepisode ? 'gray' : 'white' }}>
        <TbPlayerTrackNext /> Tập tiếp
      </button>
    </div>
  </div>
);

const ServerSwitch = () => (
  <div className="xemphim_btnserver text-center">
    <p style={{ textTransform: 'uppercase', fontWeight: 500, color: 'white' }}>Đổi Server (Nếu Lag)</p>
    <div className="d-flex justify-content-center">
      <button className='btn mx-2' style={{ backgroundColor: '#27272A', color: 'white' }}>Server 1</button>
      <button className='btn mx-2' style={{ backgroundColor: '#27272A', color: 'white' }}>Server 2</button>
      <button className='btn mx-2' style={{ backgroundColor: '#27272A', color: 'white' }}>Server 3</button>
    </div>
  </div>
);

const EpisodeList = ({ datadetail, numbertapfilmcurent }) => (
  <div className="danhsachtap mt-5 px-3" style={{ borderBottom: '2px solid gray' }}>
    <p style={{ color: 'tomato', paddingTop: 5 }}>Nếu không xem được vui lòng đổi server hoặc tải lại trang !</p>
    <p style={{ textTransform: 'uppercase', color: 'white', fontWeight: 550 }}>Danh sách tập</p>
    <div className="list_episodexemphim pb-3">
      {datadetail?.linkfilms.map((episodelist, key) => (
        <button key={key} style={{ backgroundColor: numbertapfilmcurent === episodelist.episode ? '#A3765D' : '' }}>
          <Link to={`/xem-phim/${datadetail.title}/tap-${episodelist.episode}`}>Tập {episodelist.episode}</Link>
        </button>
      ))}
    </div>
  </div>
);

const Description = ({ datadetail, datafilm }) => (
  <div className="descriptsxemphim pt-3">
    <h1 style={{ color: 'rgb(229 231 235)', fontWeight: 700, textTransform: 'uppercase', fontSize: 20 }}>
      {datadetail?.title} TẬP {datafilm?.episode}
    </h1>
    <h2 style={{ fontSize: '19px', color: 'rgb(229, 231, 235)', fontWeight: 400 }}>
      {datadetail?.title} - {datadetail?.nameenglish} ({datadetail?.chatluong} - {datadetail?.ngonngu})
    </h2>
    {/* <RatingStars /> */}
    <p style={{ color: 'grey' }}>(7.5 điểm/55 lượt đánh giá)</p>
    <div className="motafilm">
      <p style={{ color: 'rgb(156 163 175)' }}>
        <span style={{ fontWeight: 'bold' }}>{datadetail?.title}</span> {datadetail?.descripts}
      </p>
    </div>
  </div>
);

// const RatingStars = () => (
//   <div>
//     {Array.from({ length: 10 }).map((_, index) => (
//       <img key={index} src="https://nghienphimj.net/theme/images/star-off.png" alt="Star" />
//     ))}
//   </div>
// );
