import React from 'react';
import './RegisterVIP.scss'; // Assuming you're using a separate CSS file for styling
import { Link } from 'react-router-dom';
import { HomeContext } from '../../store/HomeContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const SubscriptionPlans = () => {
    const plans = [
        {
            name: 'VIP 1',
            price: '69.000 VND',
            description: 'Giải trí không giới hạn với Phim - Show, Truyền hình, Thể thao',
            channels: '120+',
            benefits: ['Kênh truyền hình trong nước, quốc tế', 'Độc quyền phim, show Việt đỉnh cao', 'Kho phim châu Á lớn nhất', 'Phim phát song song nguồn sản xuất', '100.000+ giờ giải trí đặc sắc'],
            extras: [],
            recommended: true,
        },
        {
            name: 'VIP 2',
            price: '99.000 VND',
            description: 'Bao gồm VIP 1 & Đăng tải phim mình yêu thích đến với mọi người',
            channels: '150+',
            benefits: ['Kênh truyền hình trong nước, quốc tế', 'Độc quyền phim, show Việt đỉnh cao', 'Kho phim châu Á lớn nhất', 'Phim phát song song nguồn sản xuất', '100.000+ giờ giải trí đặc sắc', 'Kho phim HBO Go mới nhất'],
            extras: [],
            recommended: false,
        },
        
    ];
    const navigate = useNavigate();
    const {token} = useContext(HomeContext);
      const handlechoose_package = (plan)=>{
          if(token ){
             navigate(`${plan.name}?price=${plan.price}`)
          }else{
            alert("Bạn cần đăng nhập để có thể đăng ký gói cao cấp")
          }
      }
     // to={`${plan.name}?price=${plan.price}`}
    return (
        <div className="subscription-plans">
            <h2>Bước 1/3: Chọn gói</h2>
            <div className="plans-container">
                {plans.map((plan, index) => (
                    <div key={index} className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>
                        <h3>{plan.name}</h3>
                        <p className="price">{plan.price}</p>
                        <p className="description">{plan.description}</p>
                        <p className="channels">{plan.channels}+</p>
                        <ul className="benefits">
                            {plan.benefits.map((benefit, i) => (
                                <li key={i}><span>✔️</span>{benefit}</li>
                            ))}
                            {plan.extras.length > 0 && plan.extras.map((extra, j) => (
                                <li key={j} className="extra"><span>❌</span>{extra}</li>
                            ))}
                        </ul>
                        <button className='btn btn-primary' onClick={()=>handlechoose_package(plan)}> Chọn gói </button>
                    </div>
                ))}
            </div>
            <div className="offers">
                <h3>Chương trình ưu đãi gói VIP HBO GO</h3>
                <ul>
                    <li>Giảm 10% (tối đa 20.000đ) khi thanh toán qua ZaloPay với mã <strong>ANHTRAI</strong>. Xem chi tiết <a href="#">tại đây</a></li>
                    <li>Giảm 15% (tối đa 20.000đ) khi thanh toán bằng VNPAY QRCode với mã <strong>VNPAYSAYHI</strong>. Xem chi tiết <a href="#">tại đây</a></li>
                </ul>
                <button>Nhập mã VieON</button>
                <p style={{color:'white'}}>Dành cho khách hàng có mã ưu đãi tặng gói</p>
            </div>
        </div>
    );
}

export default SubscriptionPlans;
