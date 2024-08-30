const { User,role_user,roles } = require('../models');
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
     // kiểm tra quyền user
     const data_role = await User.getRoles(data.id);     
     const roles = data_role.roles;
     //
    const token = jwt.sign({ id: data.id}, process.env.SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
    const name = data.username;
    const id = data.id;
    refreshTokens.push(refreshToken);
    return { success: true,refreshToken, token, name,id,roles };
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

const Serviceregister = async (email, password,name) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        username : name,
        password: hashedPassword
      });
      const userRole = await roles.findOne({ where: { name: 'user' } });
      if (userRole) {
        await role_user.create({ userid: newUser.id, roleid: userRole.id });
      }

      return { success: true, user: newUser };
    } else {
      return { success: false, message: 'Email already exists' };
    }
  } catch (error) {
    console.error("Error in Serviceregister:", error);
    throw new Error("Server error");
  }
}
const ServicegetallUser = async () => {
  try {
    const users = await User.findAll();

    const usersWithRolesAndPermissions = await Promise.all(
      users.map(async (user) => {
        const roles = await User.getRoles(user.id);
        const permissions = await User.getPermissions(user.id);

        return {
          ...user.dataValues,
          roles: roles.roles,
          permissions: permissions.length ? permissions : ["No_Permissions"]
        };
      })
    );

    if (usersWithRolesAndPermissions && usersWithRolesAndPermissions.length > 0) {
      return { success: true, data: usersWithRolesAndPermissions };
    } else {
      return { success: false, message: "No users found" };
    }
  } catch (error) {
    console.error("Error in ServicegetallUser:", error);
    throw new Error("Server error");
  }
};


const ServiceUpdateRoles = async (id_user_update,edited_roles)=>{
      try {
        const user = await User.findByPk(id_user_update);
        if (!user) {
          throw new Error('User not found');
        }
        
        const all_roles = await roles.findAll({
          where: {
            name: edited_roles,
          }
        });
        if (all_roles.length === 0) {
          throw new Error('One or more roles not found');
        }
        
        // Cập nhật vai trò cho người dùng bằng cách thiết lập lại liên kết thông qua bảng trung gian `role_user`
        await user.setRoles(all_roles);
        return { success: true, message: 'Roles updated successfully' };
      } catch (error) {
        console.error("Error in ServiceUpdateRoles:", error);
        throw error;
      }
}


module.exports = { Servicelogin, Serviceregister,Servicerefreshtoken,ServicegetallUser,ServiceUpdateRoles };
