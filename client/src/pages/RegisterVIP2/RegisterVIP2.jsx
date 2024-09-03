import React, { useState, useEffect, useContext } from 'react';
import './RegisterVIP2.scss';
import { useLocation } from 'react-router';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { HomeContext } from '../../store/HomeContext';

const RegisterVIP2 = () => {
  const {token} = useContext(HomeContext);
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('1'); 
  const [selectedPayment, setSelectedPayment] = useState('momo');
  const [selectedPricePlan, setSelectedPricePlan] = useState(0);
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const location = useLocation();
  const title_package = useParams();
  
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');

    if (price) {
      const priceMatch = price.match(/^\d+/); 
      if (priceMatch) {
        const numberPriceFinish = Number(priceMatch[0]);
        setSelectedPricePlan(numberPriceFinish); 
      }
    }
  }, [location.search]);

  useEffect(() => {
    const nextPayment = new Date(currentDate);
    nextPayment.setMonth(nextPayment.getMonth() + Number(selectedPlan));
    
    const nextPaymentDay = String(nextPayment.getDate()).padStart(2, '0');
    const nextPaymentMonth = String(nextPayment.getMonth() + 1).padStart(2, '0');
    const nextPaymentYear = nextPayment.getFullYear();
    
    const formattedNextPaymentDate = `${nextPaymentDay}/${nextPaymentMonth}/${nextPaymentYear}`;
    setNextPaymentDate(formattedNextPaymentDate);

  }, [selectedPlan]); // Only depend on selectedPlan
  
  const calculatedPrice = selectedPricePlan * Number(selectedPlan);
  console.log("firstPay_banktranferv",selectedPayment)
  const Handle_pay = (selectedPayment) =>{
    
      if(token ){
         navigate(`${selectedPayment}?price=${selectedPricePlan * selectedPlan}`)
      }else{
        alert("Bạn cần đăng nhập để có thể đăng ký gói cao cấp")
      }
  }
  return (
    <div className="subscription-page">
      <div className="row">
        <div className="col-md-9">
          <h2 className="step-title">Bước 1/3: Chọn thời hạn gói VIP HBO GO</h2>
          <div className="plan-options">
            <label className={`plan-option ${selectedPlan === '1' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="plan"
                value="1"
                checked={selectedPlan === '1'}
                onChange={() => setSelectedPlan('1')}
              />
              <span>01 THÁNG - </span>
              <span className="price">{selectedPricePlan}.000 VND</span>
            </label>

            <label className={`plan-option ${selectedPlan === '3' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="plan"
                value="3"
                checked={selectedPlan === '3'}
                onChange={() => setSelectedPlan('3')}
              />
              <span>03 THÁNG - </span>
              <span className="price">{selectedPricePlan * 3}.000 VND</span>
            </label>

            <label className={`plan-option ${selectedPlan === '6' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="plan"
                value="6"
                checked={selectedPlan === '6'}
                onChange={() => setSelectedPlan('6')}
              />
              <span>06 THÁNG - </span>
              <span className="price">{selectedPricePlan * 6}.000 VND</span>
            </label>

            <label className={`plan-option ${selectedPlan === '12' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="plan"
                value="12"
                checked={selectedPlan === '12'}
                onChange={() => setSelectedPlan('12')}
              />
              <span>12 THÁNG - </span>
              <span className="price">{selectedPricePlan * 12}.000 VND</span>
            </label>
          </div>

          <h2 className="step-title">Bước 2/3: Chọn phương thức thanh toán</h2>
          <div className="payment-options">
            <label className={`payment-option ${selectedPayment === 'momo' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="momo"
                checked={selectedPayment === 'momo'}
                onChange={() => setSelectedPayment('momo')}
              />
              <span>Ví MoMo</span>
            </label>

            <label className={`payment-option ${selectedPayment === 'zalopay' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="zalopay"
                checked={selectedPayment === 'zalopay'}
                onChange={() => setSelectedPayment('zalopay')}
              />
              <span>Ví điện tử ZaloPay</span>
            </label>

            <label className={`payment-option ${selectedPayment === 'bank_transfer' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="bank_transfer"
                checked={selectedPayment === 'bank_transfer'}
                onChange={() => setSelectedPayment('bank_transfer')}
              />
              <span>Chuyển khoản ngân hàng</span>
            </label>
          </div>
        </div>
        <div className="col-md-3">
          <div className="summary-box">
            <h3>Thông tin chi tiết</h3>
            <p>Tên gói: {title_package.title}</p>
            <p>Thời hạn gói: {selectedPlan} tháng</p>
            <p>Ngày hiệu lực: {formattedDate}</p>
            <p>Sử dụng đến: Khi bạn hủy</p>
            <p>Kỳ thanh toán tiếp theo: {nextPaymentDate}</p> {/* Display next payment date */}
            <p>Trị giá: {calculatedPrice}.000 VND</p>
            <p>Giảm giá: 0 VND</p>
            <div className="total">
              <span style={{color:'red'}}>Thành tiền:</span>
              <span>{calculatedPrice}.000 VND</span>
            </div>
            <button className="pay-button" onClick={()=>Handle_pay(selectedPayment)}>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterVIP2;
