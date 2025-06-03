const querystring = require('qs');
const crypto = require('crypto');

const createPayment = (req, res) => {
  console.log("object_createpayment", req.body);
  try {
    const { amount, orderInfo, returnUrl, ipAddr } = req.body;

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_SECRET_KEY;
    const vnpUrl = process.env.VNP_URL;
    const vnpReturnUrl = encodeURIComponent(returnUrl);

    if (!tmnCode || !secretKey || !vnpUrl) {
      throw new Error('Missing VNPay configuration');
    }

    const date = new Date();
    const createDate = date.toISOString().replace(/[-:]/g, '').slice(0, 14);
    const orderId = date.getTime();

    const params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Amount: amount * 100,
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: vnpReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    const sortedParams = sortObject(params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams.vnp_SecureHash = signed;

    const paymentUrl = `${vnpUrl}?${querystring.stringify(sortedParams, { encode: false })}`;
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error('Error in createPayment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const paymentReturn = (req, res) => {
  const vnpParams = req.query;
  const secureHash = vnpParams['vnp_SecureHash'];

  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = sortObject(vnpParams);
  const signData = querystring.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNP_SECRET_KEY);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    res.status(200).json({ message: 'Payment success', data: vnpParams });
  } else {
    res.status(400).json({ message: 'Payment failed' });
  }
};

const sortObject = (obj) => {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
};

module.exports = { createPayment, paymentReturn };