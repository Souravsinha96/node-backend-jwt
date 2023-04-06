const Role = require('../model/Role');

const getAllRoles = async (req, res) => {
  const roles = await Role.find();
  if (!roles) return res.status(204).json({ message: 'No role found' });
  res.json(roles);
};
module.exports = { getAllRoles };
