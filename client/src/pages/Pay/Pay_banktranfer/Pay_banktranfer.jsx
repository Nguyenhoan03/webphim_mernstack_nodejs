import React, { useContext } from 'react';
import './Pay_banktranfer.scss';
import { HomeContext } from '../../../store/HomeContext';
import { useLocation } from 'react-router';
import { useParams } from 'react-router';
export default function Pay_banktranfer() {
  const location = useLocation();
  const param = useParams();
  const url = new URLSearchParams(location.search);
  const price = url.get('price');
  const paymentMethod = param.paymentMethod;
  const packagechoose = param.title;
  const {name,email} = useContext(HomeContext);

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Đăng kí gói {packagechoose}</h2>
      </div>
      <div className="account-info" style={{color:'black'}}>
        {name} - {email} - <span className="price">{price}.000 VND</span>
      </div>
      <div className="payment-methods">
        <button className="payment-button">Phương thức thanh toán: Chuyển khoản</button>
      </div>
      <div className="qr-code">
      <img src={require('../../../assets/imgbank_tranfer.jpg')} alt="QR Code for Bank Transfer" />

      </div>
      <div className="note">
        Nội dung CK ghi địa chỉ email đăng kí của bạn
      </div>
      <div className="instructions">
        VD: nguyenvana@gmail.com, (Hệ thống sẽ cộng tiền vào tài khoản này cho bạn).<br />
        Phải nhập chính xác nội dung CK mà hệ thống đã hiển thị sẵn cho bạn, để được <em>CỘNG TIỀN TỰ ĐỘNG</em>.<br />
        Trường hợp sau vài phút mà bạn không nhận được tiền vui lòng gọi tới số hotline <span className="hotline">0981.282.756</span>.
      </div>
      <div className="security-logos">
        <img src="https://cdn-icons-png.flaticon.com/512/6404/6404655.png" alt="Security Logo 1" />
        <img src="https://c8.alamy.com/comp/2BRYNP8/bank-account-security-rgb-color-icon-2BRYNP8.jpg" alt="Security Logo 2" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ZBPdzULqOFGT8c53RzzeBLPqfi4fpvLxA&s" alt="Security Logo 3" />
      </div>
    </div>
  );
}
