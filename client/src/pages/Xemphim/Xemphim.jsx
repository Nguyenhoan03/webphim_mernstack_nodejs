import React, { useState, useEffect, } from 'react';
import './Style.scss';
import { useParams } from 'react-router';
import Homepagebodyright from '../../compoment/Homepagebodyright/Homepagebodyright';
import { ProductDetail } from '../../services/Productservices';
import { Dataxemphim } from '../../services/Xemfilmservices';
import { MdError } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { IoIosHome } from 'react-icons/io';
import { BsArrowsFullscreen } from "react-icons/bs";
import { Link } from 'react-router-dom';
import CommentCompoment from '../../compoment/CommentCompoment/CommentCompoment';
import { Helmet } from 'react-helmet';




export default function Xemphim() {
  const { title, episode } = useParams();
  const [datafilm, setdatafilm] = useState(null);
  const [datadetail, setdatadetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ktranextepisode, setktranextepisode] = useState(false);
  const [parent_id, setparent_id] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Dataxemphim(title, episode);
        setdatafilm(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (title && episode) {
      fetchData();
    }
  }, [title, episode]);
  const [comment, setcomment] = useState(null); 
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        if (title) {
          const data = await ProductDetail(title);
          setdatadetail(data.datafilm);
          setcomment(data.comments);
          setparent_id(data.parent_id);

        }
      } catch (error) {
        setError(error);
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchDetail();
    }
  }, [title]);
 
 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!datafilm) return null;

  const tongsotapfilm =datadetail && datadetail.linkfilms.length;
  const numbertapfilmcurent = parseInt(episode.replace('tap-', ''))
  
  const tapTiepTheo = numbertapfilmcurent + 1;
  const handlenextepisode = () => {
    if (numbertapfilmcurent < tongsotapfilm) {
     window.location.href=`/xem-phim/${datadetail && datadetail.title}/tap-${tapTiepTheo}`
    } else {
      setktranextepisode(true);
    }
  };

  return (
    
    <div className=''>
        <Helmet>
      <title>xem phim {`${datafilm && datafilm.title} - Tập ${datafilm && datafilm.episode}`}</title>
      <meta name='description' content= {`${datafilm && datafilm.title} - Tập ${datafilm && datafilm.episode}`} />
    </Helmet>

      <div className="container">
        <div className="caption mt-3 d-flex">
          <p><IoIosHome /> Motchill</p>
          <p> &gt; </p>
          <p> {datadetail && datadetail.theloai}</p>
          <p> &gt; </p>
          <p style={{ color: 'white' }}> {datafilm.title} - Tập {datafilm.episode}</p>
      
        </div>
        <div className="row pagexemphim">
          <div className="xemphim_left col-md-9">
            <div className="xemphim" style={{ paddingLeft: 15, position: 'relative' }}>
            <iframe 
              id="videoFrame"
              src={datafilm.linkfilm}
              frameBorder="0"
              allowFullScreen
              style={{ display: 'block', width: '100%', height:400, border: 'none', scrolling: 'auto' }}
          />
            </div>
           <div className="container mt-2" style={{display:'flex',justifyContent:'space-between'}}>
                <div className="" style={{padding:'0px 14px'}}>
                  <button className='btn text-white' style={{backgroundColor:'#27272A',fontWeight:550,fontSize:12}}><BsArrowsFullscreen /> Phóng to</button>
                  <button className='btn text-white' style={{backgroundColor:'#27272A',fontWeight:550,fontSize:12,marginLeft:10}}> <MdError /> Báo lỗi</button>
                </div>
                <div className="xemphim_btnserver">
                  <p style={{textTransform:'uppercase',fontWeight:500,color:'white'}}>đổi server (nếu lag)</p>
                  <div className="xemphim_btnserverparent" >
                    <button className='btn mx-2' style={{backgroundColor:'#27272A',color:'white'}}>server 1</button>
                    <button className='btn mx-2' style={{backgroundColor:'#black',color:'white'}}>server 2</button>
                    <button className='btn mx-2' style={{backgroundColor:'#black',color:'white'}}>server 3</button>
               
                  </div>
                </div>
                <div className="">
                   <button className='btn text-white' style={{backgroundColor:'#27272A',fontWeight:550,fontSize:12}}><FaRegLightbulb /> Tắt đèn</button>
                   <button onClick={()=>handlenextepisode()} className='btn' style={{backgroundColor:'#27272A', fontWeight:550, fontSize:12, marginLeft:10,color: ktranextepisode ? 'gray' : 'white'}}>
                    <TbPlayerTrackNext />
                     Tập tiếp
                  </button>
                </div>
           </div>
         
          <div className="danhsachtap mt-5 px-3" style={{backgroundColor:'',borderBottom:'2px solid gray'}}>
         <p style={{color:'tomato',paddingTop:5}}>Nếu không xem được vui lòng đổi server hoặc tải lại trang !</p>
               <p style={{textTransform:'uppercase',color:'white',fontWeight:550}}>danh sách tập</p>
               <div className="list_episodexemphim" style={{paddingBottom:25}}>
               {datadetail && datadetail.linkfilms.map((episodelist,key)=>(
                          
                        <button style={{backgroundColor: numbertapfilmcurent === episodelist.episode ? '#A3765D' : ''}} key={key}><Link to={`/xem-phim/${datadetail.title}/tap-${episodelist.episode}`}>Tập {episodelist.episode}</Link></button>

                      ))}
               </div>
          </div>

          <div className="descriptsxemphim" style={{paddingTop:15}}>
                <h1 style={{color:'rgb(229 231 235)',fontWeight:700,textTransform:'uppercase',fontSize:20}}>{datadetail && datadetail.title} TẬP {datafilm.episode}</h1>
                <h2 style={{ fontSize: '19px', color: 'rgb(229, 231, 235)', fontWeight: 400 }}>
  {datadetail && datadetail.title} - {datadetail && datadetail.nameenglish} ({datadetail && datadetail.chatluong} - {datadetail && datadetail.ngonngu})
</h2>

                <div className="">  
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                <img src="https://motchillj.net/theme/images/star-off.png" alt="" />
                </div>
                <p style={{color:'grey'}}>(7.5 điểm/55 lượt)</p>
                <div className="motafilm">
                    <p style={{color:'rgb(156 163 175)'}}><span style={{fontWeight:'bold',}}> {datadetail && datadetail.title}</span> {datadetail && datadetail.descripts}</p>
                </div>
          </div>
          <div className="comment">
          <CommentCompoment titlefilm = {title} comments={comment} parent_id={parent_id}/>
          </div>
          </div>
          <div className="xemphim_right col-md-3">
            <Homepagebodyright />
          </div>
        </div>
      </div>
    </div>
  );
}
