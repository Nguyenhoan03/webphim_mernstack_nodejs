const {roles,User,permissions} = require('../models');

const Authorize = (requiredPermissions) => {
    return async (req, res, next) => {
      const userId = req.user.id; // Assume user ID is available in req.user
      const user = await User.findByPk(userId, {
        include: {
          model: roles,
          include: [permissions],
        },
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const userPermissions = user.roles.reduce((permissions, role) => {
        return permissions.concat(role.permissions.map(p => p.name));
      }, []);
  
      const hasPermission = requiredPermissions.every(permission =>
        userPermissions.includes(permission)
      );
  
      if (!hasPermission) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      next();
    };
  };
  module.exports = {Authorize}