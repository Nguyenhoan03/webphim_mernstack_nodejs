
import Homepage from '../pages/Homepage/Homepage';
import Detailpage from '../pages/Detailpage/Detailpage';
import Xemphim from '../pages/Xemphim/Xemphim';
import Phimbo from '../pages/Theloai/Phimbo/Phimbo';
import Vientuong from '../pages/Theloai/Vientuong/Vientuong';
import Search from '../pages/Search/Search'
import Plus18 from '../pages/Theloai/18+/Plus18';
import Amnhac from '../pages/Theloai/amnhac/Amnhac';
import Chientranh from '../pages/Theloai/chientranh/Chientranh';
import Chinhkich from '../pages/Theloai/chinhkich/Chinhkich';
import Cotrang from '../pages/Theloai/cotrang/Cotrang';
import Bian from '../pages/Theloai/Bian/Bian';
import Giadinh from '../pages/Theloai/giadinh/Giadinh';
import Haihuoc from '../pages/Theloai/haihuoc/Haihuoc';
import Hinhsu from '../pages/Theloai/hinhsu/Hinhsu';
import Hoathinh from '../pages/Theloai/hoathinh/Hoathinh';
import Hocduong from '../pages/Theloai/hocduong/Hocduong';
import Khoahoc from '../pages/Theloai/khoahoc/Khoahoc';
import Kinhdi from '../pages/Theloai/kinhdi/Kinhdi';
import Kinhdien from '../pages/Theloai/kinhdien/Kinhdien';
import Phieuluu from '../pages/Theloai/phieuluu/Phieuluu';
import Tailieu from '../pages/Theloai/tailieu/Tailieu';
import Tamly from '../pages/Theloai/Tamly/Tamly';
import Thanthoai from '../pages/Theloai/thanthoai/Thanthoai';
import Thethao from '../pages/Theloai/thethao/Thethao';
import Tinhcam from '../pages/Theloai/tinhcam/Tinhcam';
import Vothuat from '../pages/Theloai/vothuat/Vothuat';
import Phimle from '../pages/Theloai/phimle/Phimle';
import Phimshows from '../pages/Theloai/phimshows/Phimshows';
import Phimsapchieu from '../pages/Theloai/phimsapchieu/Phimsapchieu';
import Hanhdong from '../pages/Theloai/Hanhdong/Hanhdong';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Ando from '../pages/quocgia/Ando';
import Trungquoc from '../pages/quocgia/Trungquoc';
import Hanquoc from '../pages/quocgia/Hanquoc';
import Nhatban from '../pages/quocgia/Nhatban';
import Thailan from '../pages/quocgia/Thailan';
import Aumy from '../pages/quocgia/Aumy';
import Dailoan from '../pages/quocgia/Dailoan';
import Hongkong from '../pages/quocgia/Hongkong';
import Anh from '../pages/quocgia/Anh';
import Phap from '../pages/quocgia/Phap';
import Canada from '../pages/quocgia/Canada';
import Quocgiakhac from '../pages/quocgia/Quocgiakhac';
import Duc from '../pages/quocgia/Duc';
import Taybannha from '../pages/quocgia/Taybannha';
import Thonhiky from '../pages/quocgia/Thonhiky';
import Halan from '../pages/quocgia/Halan';
import Indonesia from '../pages/quocgia/Indonesia';
import Nga from '../pages/quocgia/Nga';
import Mexico from '../pages/quocgia/Mexico';
import Balan from '../pages/quocgia/Balan';
import Uc from '../pages/quocgia/Uc';
import Thuydien from '../pages/quocgia/Thuydien';
import Malaysia from '../pages/quocgia/Malaysia';
import Brazil from '../pages/quocgia/Brazil';
import Philippines from '../pages/quocgia/Philippines';
import Bodaonha from '../pages/quocgia/Bodaonha';
import Y from '../pages/quocgia/Y';
import Danmach from '../pages/quocgia/Danmach';
import Uae from '../pages/quocgia/Uae';
import Nauy from '../pages/quocgia/Nauy';
import Thuysi from '../pages/quocgia/Thuysi';
import Chauphi from '../pages/quocgia/Chauphi';
import Namphi from '../pages/quocgia/Namphi';
import Ukraina from '../pages/quocgia/Ukraina';
import Arapxeut from '../pages/quocgia/Arapxeut';

import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import Users from '../pages/Admin/Users/Users';
import Autocrawlphim from '../pages/Admin/Autocrawlphim/Autocrawlphim';
import Product from '../pages/Admin/Product/Product';
import Addphim from '../pages/Admin/Product/Addphim/Addphim';
import Addepisode from '../pages/Admin/Product/Addepisode/Addepisode';
import PrivateRoute from '../compoment/PrivateRoute/PrivateRoute';
import NotFound from '../pages/Notfound/Notfound';
import RegisterVIP from '../pages/RegisterVIP/RegisterVIP';
import Pay_banktranfer from '../pages/Pay/Pay_banktranfer/Pay_banktranfer';
import RegisterVIP2 from '../pages/RegisterVIP2/RegisterVIP2';
  export const routes = [
    {
      path: '/not-found',
      page: NotFound,
      isShowHeader: true,
    },
    {
      path: '*',
      page: NotFound,
      isShowHeader: true,
    },
    {
      path: '/dang-ky-goi-vip',
      page: RegisterVIP,
      isShowHeader: true,
    },
    {
      path: '/dang-ky-goi-vip/:title',
      page: RegisterVIP2,
      isShowHeader: true,
    },
    {
      path: '/dang-ky-goi-vip/:title/:paymentMethod',
      page: Pay_banktranfer,
      isShowHeader: true,
    },
  // Admin Routes
  {
    path: '/admin/products',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Product />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/products/add_phim',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Addphim />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/products/add_episode',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Addepisode />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/dashboard',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Dashboard />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/users',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Users />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/auto_crawlphim',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Autocrawlphim />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },

//
  {
    path: '/',
    page: Homepage,
    isShowHeader: true,
  },

  {
    path: '/:title',
    page: Detailpage,
    isShowHeader: true,
  },
  {
    path: '/tim-kiem/:content_search',
    page: Search ,
    isShowHeader: true,
  },
  {
    path: '/xem-phim/:title/:episode',
    page: Xemphim,
    isShowHeader: true,
  },

  {
    path: '/dang-nhap',
    page: Login,
    isShowHeader: true,
  },
  {
    path: '/dang-ky',
    page: Register,
    isShowHeader: true,
  },

  {
    path: '/phim-bo',
    page: Phimbo,
    isShowHeader: true,
  },
  {
    path: '/phim-le',
    page: Phimle,
    isShowHeader: true,
  },
  {
    path: '/phim-shows',
    page: Phimshows,
    isShowHeader: true,
  },
  {
    path: '/phim-sap-chieu',
    page: Phimsapchieu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hanh-dong',
    page: Hanhdong, 
    isShowHeader: true,
  },
  {
    path: '/the-loai/vien-tuong',
    page: Vientuong,
    isShowHeader: true,
  },
  {
    path: '/the-loai/bi-an',
    page: Bian,
    isShowHeader: true,
  },
  {
    path: '/the-loai/am-nhac',
    page: Amnhac,
    isShowHeader: true,
  },
  {
    path: '/the-loai/18+',
    page: Plus18,
    isShowHeader: true,
  },
  {
    path: '/the-loai/chien-tranh',
    page: Chientranh,
    isShowHeader: true,
  },
  {
    path: '/the-loai/chinh-kich',
    page: Chinhkich,
    isShowHeader: true,
  },
  {
    path: '/the-loai/co-trang',
    page: Cotrang,
    isShowHeader: true,
  },
  {
    path: '/the-loai/gia-dinh',
    page: Giadinh,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hai-huoc',
    page: Haihuoc,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hinh-su',
    page: Hinhsu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hoat-hinh',
    page: Hoathinh,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hoc-duong',
    page: Hocduong,
    isShowHeader: true,
  },
  {
    path: '/the-loai/khoa-hoc',
    page: Khoahoc,
    isShowHeader: true,
  },
  {
    path: '/the-loai/kinh-di',
    page: Kinhdi,
    isShowHeader: true,
  },
  {
    path: '/the-loai/kinh-dien',
    page: Kinhdien,
    isShowHeader: true,
  },
  {
    path: '/the-loai/phieu-luu',
    page: Phieuluu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/tai-lieu',
    page: Tailieu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/tam-ly',
    page: Tamly,
    isShowHeader: true,
  },
  {
    path: '/the-loai/than-thoai',
    page: Thanthoai,
    isShowHeader: true,
  },
  {
    path: '/the-loai/the-thao',
    page: Thethao,
    isShowHeader: true,
  },
  {
    path: '/the-loai/tinh-cam',
    page: Tinhcam,
    isShowHeader: true,
  },
  {
    path: '/the-loai/vo-thuat',
    page: Vothuat,
    isShowHeader: true,
  },
 

  //phim theo quốc gia
  { path: '/an-do', page: Ando, isShowHeader: true },
  { path: '/trung-quoc', page: Trungquoc, isShowHeader: true },
  { path: '/han-quoc', page: Hanquoc, isShowHeader: true },
  { path: '/nhat-ban', page: Nhatban, isShowHeader: true },
  { path: '/thai-lan', page: Thailan, isShowHeader: true },
  { path: '/au-my', page: Aumy, isShowHeader: true },
  { path: '/dai-loan', page: Dailoan, isShowHeader: true },
  { path: '/hong-kong', page: Hongkong, isShowHeader: true },
  { path: '/anh', page: Anh, isShowHeader: true },
  { path: '/phap', page: Phap, isShowHeader: true },
  { path: '/canada', page: Canada, isShowHeader: true },
  { path: '/quoc-gia-khac', page: Quocgiakhac, isShowHeader: true },
  { path: '/duc', page: Duc, isShowHeader: true },
  { path: '/tay-ban-nha', page: Taybannha, isShowHeader: true },
  { path: '/tho-nhi-ky', page: Thonhiky, isShowHeader: true },
  { path: '/ha-lan', page: Halan, isShowHeader: true },
  { path: '/indonesia', page: Indonesia, isShowHeader: true },
  { path: '/nga', page: Nga, isShowHeader: true },
  { path: '/mexico', page: Mexico, isShowHeader: true },
  { path: '/ba-lan', page: Balan, isShowHeader: true },
  { path: '/uc', page: Uc, isShowHeader: true },
  { path: '/thuy-dien', page: Thuydien, isShowHeader: true },
  { path: '/malaysia', page: Malaysia, isShowHeader: true },
  { path: '/brazil', page: Brazil, isShowHeader: true },
  { path: '/philippines', page: Philippines, isShowHeader: true },
  { path: '/bo-dao-nha', page: Bodaonha, isShowHeader: true },
  { path: '/y', page: Y, isShowHeader: true },
  { path: '/dan-mach', page: Danmach, isShowHeader: true },
  { path: '/uae', page: Uae, isShowHeader: true },
  { path: '/na-uy', page: Nauy, isShowHeader: true },
  { path: '/thuy-si', page: Thuysi, isShowHeader: true },
  { path: '/chau-phi', page: Chauphi, isShowHeader: true },
  { path: '/nam-phi', page: Namphi, isShowHeader: true },
  { path: '/ukraina', page: Ukraina, isShowHeader: true },
  { path: '/a-rap-xe-ut', page: Arapxeut, isShowHeader: true },
];
