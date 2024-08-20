const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
let refreshTokens = [];
const Servicelogin = async (email, password) => {
  try {
    const data = await User.findOne({ where: { email } });
    if (!data) {
      return { success: false, message: "User not found" };
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return { success: false, message: 'Thông tin đăng nhập không chính xác' };
    }
    const token = jwt.sign({ id: data.id}, process.env.SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
    const name = data.username;
    const id = data.id;
    refreshTokens.push(refreshToken);
    return { success: true,refreshToken, token, name,id };
  } catch (error) {
    console.error("Error in Servicelogin:", error);
    throw new Error("Server error");
  }
}

const Servicerefreshtoken = async (req, res, refreshToken) => {
  try {
    console.log("firstrefeshtokennservicerefesh", refreshToken);

    if (!refreshToken) {
      return res.sendStatus(401); // No token provided
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403); // Invalid token
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        console.log("Token verification failed:", err); // Log the verification error
        return res.sendStatus(403); // Token expired or invalid
      }

      console.log("Token verification succeeded for ID:", data.id);
      const tokennew = jwt.sign({ id: data.id }, process.env.SECRET, { expiresIn: '1d' });
      // console.log("firstrefeshtokennservicerefeshtokennew", tokennew);

      res.json({ tokennew }); // Return the new access token
    });
  } catch (error) {
    console.error("Error in refreshToken service:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const Serviceregister = async (email, name, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword
      });
      return { success: true, user: newUser };
    } else {
      return { success: false, message: 'Email already exists' };
    }
  } catch (error) {
    console.error("Error in Serviceregister:", error);
    throw new Error("Server error");
  }
}

module.exports = { Servicelogin, Serviceregister,Servicerefreshtoken };
