const { User, role_user, roles, permissions } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
let refreshTokens = [];
const { OAuth2Client } = require('google-auth-library');
let client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const Servicelogin = async (email, password, googleToken) => {
  try {
    let user;
    if (googleToken) {
      console.log("Google token received:", googleToken);
     
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      const name = payload.name;
    
      
      user = await User.findOne({ where: { email } });
    
      if (!user) {
        user = await User.create({
          email,
          username: name,
        });
       
        const userRole = await roles.findOne({ where: { name: 'user' } });
        if (userRole) {
          await role_user.create({ userid: user.id, roleid: userRole.id });
          console.log("Role assigned to user:", userRole);
        }
      }
    } else {
      user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, message: "User not found" };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: 'Thông tin đăng nhập không chính xác' };
      }
    }

    const data_role = await User.getRoles(user.id);
    const userRoles = data_role.roles;
    const userPermissions = await User.getPermissions(user.id) || [];

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    refreshTokens.push(refreshToken);

    return { success: true, refreshToken, token, name: user.username, id: user.id, roles: userRoles, permissions: userPermissions };
  } catch (error) {
    console.error("Error in Servicelogin:", error);
    throw new Error("Server error");
  }
};

const Servicerefreshtoken = async (req, res, refreshToken) => {
  try {
    console.log("firstrefeshtokennservicerefesh", refreshToken);

    if (!refreshToken) {
      return res.sendStatus(401); 
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403); 
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        console.log("Token verification failed:", err); 
        return res.sendStatus(403); 
      }

      console.log("Token verification succeeded for ID:", data.id);
      const tokennew = jwt.sign({ id: data.id }, process.env.SECRET, { expiresIn: '1d' });
      
      res.json({ tokennew }); 
    });
  } catch (error) {
    console.error("Error in refreshToken service:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const Serviceregister = async (email, password, name) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        username: name,
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
};

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

const ServiceUpdateRoles = async (id_user_update, edited_roles) => {
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

    await user.setRoles(all_roles);
    return { success: true, message: 'Roles updated successfully' };
  } catch (error) {
    console.error("Error in ServiceUpdateRoles:", error);
    throw error;
  }
};

const ServiceUpdatePermissions = async (id_user_update, edited_Permissions) => {
  try {
    const user = await User.findByPk(id_user_update);
    if (!user) {
      throw new Error("User not found");
    }

    const all_permissions = await permissions.findAll({
      where: {
        name: edited_Permissions, 
      }
    });

    await user.setPermissions(all_permissions);  
    return { success: true, message: 'Permissions updated successfully' };

  } catch (error) {
    throw (error);
  }
};

module.exports = { Servicelogin, Serviceregister, Servicerefreshtoken, ServicegetallUser, ServiceUpdateRoles, ServiceUpdatePermissions };