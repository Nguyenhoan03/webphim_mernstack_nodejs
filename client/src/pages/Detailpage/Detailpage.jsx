import React, { useState,useContext, useEffect,useMemo } from 'react'
import './Style.scss'
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from '../../compoment/Homepagebodyright/Homepagebodyright'
import { Link, useParams } from 'react-router-dom';
import { AiFillLike } from "react-icons/ai";
import { IoBookmark } from "react-icons/io5";

import { CiStar } from "react-icons/ci";
import Slickslider from '../../compoment/Slickslider/Slickslider';
import { HomeContext } from '../../store/HomeContext';
import axios from 'axios';
import { ProductDetail } from '../../services/Productservices';
import { Helmet } from 'react-helmet';

import CommentCompoment from '../../compoment/CommentCompoment/CommentCompoment';
export default function Detailpage() {
  const { phimhot} = useContext(HomeContext);
  const memophimhot = useMemo(()=> phimhot, [phimhot])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }), []);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`next-arrow custom-arrow ${className}`}
        style={style}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`prev-arrow custom-arrow ${className}`}
        style={style}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  }

 
  const [checkbutton,setcheckbutton] = useState(1);
 const handlecheckbutton = (key)=>{
     setcheckbutton(key);
    }
    const {title} = useParams();
    const [datadetail, setdatadetail] = useState(null); 
    const [comment, setcomment] = useState(null);
    const [parent_id, setparent_id] = useState(null);
 
   useEffect(() => {
    const fetchData = async () => {
      try {
        if (title) {
          const data = await ProductDetail(title);
          setdatadetail(data.datafilm);
          setcomment(data.comments);
          setparent_id(data.parent_id);

        }
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handlebuttonxemfilm = ()=>{
       if(datadetail.linkfilms && datadetail.linkfilms.length > 0){
        window.location.href = `/xem-phim/${datadetail.title}/tap-1`;
       }
       else{
        alert('Hiện tại phim này chưa cập nhật để xem !');
       }
        
  }
  return (
    <div className='detailpage'>
      <Helmet>
      <title>{datadetail && datadetail.title}</title>
      <meta name='description' content={datadetail && datadetail.title} />
      </Helmet>
        <div className="container">
            <div className="caption mt-3 d-flex">
                <p><IoIosHome /> Motchill</p>
                <p> > </p>
                <p> {datadetail.theloai.split(',')[0] || ''}</p>
                <p> > </p>
                <p style={{color:'white'}}> {datadetail.title}</p>
            </div>


            <div className="content_detailpage">
        <div className="row">
        <div className="detailpage_left col-md-9 ">
            <div className="content_detailpage_card ">
            <div className="d-flex">
              <div className="" style={{display:'inline-block',position:'relative'}}>
                  <img style={{width: 290,height: 400}} src={datadetail.hinhanh ? datadetail.hinhanh : ''} alt="" />
                  <div className="content_detailpage_card_button" style={{position:'absolute',bottom: 0, left:0,height:75,width:'100%',backgroundColor:'rgba(0,0,0,0.8)'}}>
                  <button className='btn btn-primary'><Link>Tải phim</Link></button>
                  <button className='btn btn-tomato' onClick={handlebuttonxemfilm}>
                  Xem phim
                </button>

                  </div>
              </div>
              <div className="" style={{marginLeft:10}}>
                <div className="">
              <h1 className="movie-title">{datadetail.title}</h1>
        <h2 className="movie-subtitle text-light">{datadetail.nameenglish}</h2>
        <ul className="movie-details">
          <li><strong>Trạng thái:</strong> {datadetail.trangthai}</li>
          <li><strong>Thời luọng:</strong> {datadetail.thoiluong}</li>
          <li><strong>Đạo diễn:</strong> {datadetail.daodien}</li>
          <li><strong>Thời lượng:</strong> {datadetail.thoiluong}</li>
          <li><strong>Số tập:</strong> {datadetail.sotap}</li>
          <li><strong>Chất lượng:</strong>{datadetail.chatluong} </li>
          <li><strong>Ngôn ngữ:</strong> {datadetail.ngonngu}</li>
          <li><strong>Năm phát hành:</strong> {datadetail.namphathanh}</li>
          <li><strong>Quốc gia:</strong> {datadetail.quocgia}</li>
          <li><strong>Thể loại:</strong> {datadetail.theloai}</li>
          <li><strong>Diễn viên:</strong> {datadetail.dienvien}</li>
        </ul>
        </div>
        <div className="mt-1">
            <div className="movie-details-button">
                <button style={{width:100}}><AiFillLike /> Thích 3</button>
                <button style={{width:60}}> Chia sẻ</button>
                <button><IoBookmark /> Lưu vào facebook</button>
            </div>
            <div className="d-flex movie-details-evaluate mt-2" >
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

            <p style={{color:'white'}}>(9.2 điểm/ 31 lượt)</p>
            </div>
        </div>
     
              </div>
                 
              </div>
              <div className="mt-3">
                <div className="movie-details-episode">
              <button style={{backgroundColor: checkbutton ===1 ? '#A3765D':''}} onClick={()=>handlecheckbutton(1)}>DANH SÁCH TẬP</button>
              <button onClick={()=>handlecheckbutton(2)} style={{marginLeft:12,backgroundColor: checkbutton ===2 ? '#A3765D':''}}>THÔNG TIN PHIM</button>
              </div>
              <div className="info mt-2" style={{backgroundColor:'#161515',borderRadius:10}}>
                 <div className="py-3 px-2">
                  {
                    checkbutton === 1 ? (<div className="">
                    <p style={{fontSize:22,fontWeight:550,color:'rgb(182, 179, 179)'}}>DANH SÁCH TẬP</p>
                    <div className="list_episode">
                      {datadetail.linkfilms.map((episodelist,key)=>(
                        <button key={key}><Link to={`/xem-phim/${datadetail.title}/tap-${episodelist.episode}`}>Tập {episodelist.episode}</Link></button>

                      ))}
                        
                    </div>
                    </div>
                    ) : (
                      <div className="">
                      <p style={{fontSize:22,fontWeight:550,color:'rgb(182, 179, 179)'}}>Tóm tắt</p>
                      <p style={{color:'rgb(182, 179, 179)'}}>{datadetail.descripts}</p>
                      </div>
                    )
                  }
                
                

                 </div>
              </div>
              </div>  

             <div className="">
            <CommentCompoment titlefilm = {title} comments={comment} parent_id={parent_id}/>
            </div>
           

              </div>
              <div className="mt-3">
                <div className="" style={{paddingLeft:10}}>
                  <div className="d-flex">
                  <p><CiStar style={{color:'tomato'}}/></p>
              <h2 style={{ fontSize: 18, fontFamily: 'roboto', fontWeight: 600, textTransform: 'uppercase', color: 'white',marginLeft:10,paddingTop:5 }}>PHIM ĐỀ CỬ</h2>
              </div>
              <div className="">
              <Slickslider settings={settings} data={memophimhot} />
              </div>
              </div>
              </div>
        </div>
        <div className="detailpage_right col-md-3">
            <Homepagebodyright/>
        </div>
        </div>
        </div>
        </div>
      
    </div>
  )
}
