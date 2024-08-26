import React, { useState } from 'react';
import './RegisterVIP2.scss'
const RegisterVIP2  = () => {
  const [selectedPlan, setSelectedPlan] = useState('1-month');
  const [selectedPayment, setSelectedPayment] = useState('momo');

  return (
    <div className="subscription-page">
      <div className="row">
        <div className="col-md-9">
      <h2 className="step-title">Bước 1/3: Chọn thời hạn gói VIP HBO GO</h2>
      <div className="plan-options">
        <label className={`plan-option ${selectedPlan === '1-month-auto' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            value="1-month-auto"
            checked={selectedPlan === '1-month-auto'}
            onChange={() => setSelectedPlan('1-month-auto')}
          />
          <span>01 THÁNG - TỰ ĐỘNG GIA HẠN</span>
          <span className="price">99.000 VND</span>
        </label>

        <label className={`plan-option ${selectedPlan === '1-month' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            value="1-month"
            checked={selectedPlan === '1-month'}
            onChange={() => setSelectedPlan('1-month')}
          />
          <span>01 THÁNG</span>
          <span className="price">109.000 VND</span>
        </label>

        <label className={`plan-option ${selectedPlan === '3-months' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            value="3-months"
            checked={selectedPlan === '3-months'}
            onChange={() => setSelectedPlan('3-months')}
          />
          <span>03 THÁNG</span>
          <span className="price">249.000 VND</span>
        </label>

        <label className={`plan-option ${selectedPlan === '6-months' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            value="6-months"
            checked={selectedPlan === '6-months'}
            onChange={() => setSelectedPlan('6-months')}
          />
          <span>06 THÁNG</span>
          <span className="price">499.000 VND</span>
        </label>

        <label className={`plan-option ${selectedPlan === '12-months' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            value="12-months"
            checked={selectedPlan === '12-months'}
            onChange={() => setSelectedPlan('12-months')}
          />
          <span>12 THÁNG</span>
          <span className="price">999.000 VND</span>
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

        <label className={`payment-option ${selectedPayment === 'visa' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="visa"
            checked={selectedPayment === 'visa'}
            onChange={() => setSelectedPayment('visa')}
          />
          <span>Thẻ Thanh Toán Quốc Tế (Visa/MasterCard)</span>
        </label>
      </div>
      </div>
     <div className="col-md-3">
      <div className="summary-box">
        <h3>Thông tin chi tiết</h3>
        <p>Tên gói: VIP HBO GO</p>
        <p>Thời hạn gói: {selectedPlan === '1-month-auto' ? '01 Tháng - Tự động gia hạn' : selectedPlan.replace('-', ' ')}</p>
        <p>Ngày hiệu lực: 26/08/2024</p>
        <p>Sử dụng đến: Khi bạn hủy</p>
        <p>Kỳ thanh toán tiếp theo: 25/09/2024</p>
        <p>Trị giá: {selectedPlan === '1-month-auto' ? '99.000 VND' : selectedPlan === '1-month' ? '109.000 VND' : selectedPlan === '3-months' ? '249.000 VND' : selectedPlan === '6-months' ? '499.000 VND' : '999.000 VND'}</p>
        <p>Giảm giá: 0 VND</p>
        <div className="total">
          <span>Thành tiền:</span>
          <span>{selectedPlan === '1-month-auto' ? '99.000 VND' : selectedPlan === '1-month' ? '109.000 VND' : selectedPlan === '3-months' ? '249.000 VND' : selectedPlan === '6-months' ? '499.000 VND' : '999.000 VND'}</span>
        </div>
        <button className="pay-button">Thanh toán</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default RegisterVIP2;
