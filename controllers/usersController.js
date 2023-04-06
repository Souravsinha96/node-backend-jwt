const User = require('../model/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: 'No user found' });
  res.json(users);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'User ID required' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.send(400).json({ message: 'ID parameter is required' });
  const user = await User.findOne({ _id: req?.params?.id }).exec();
  if (!user)
    return res
      .status(400)
      .json({ message: `NO user matches ID ${req.params.id}.` });
  const result = await user.deleteOne({ _id: req.body.id });
  res.json({ status: true, result, message: 'user deleted' });
};

const updateUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: `ID parameter is required` });
  }
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `NO user matches ID ${req.params.id}.` });
  }
  if (req.body?.username) user.username = req.body.username;
  const result = await user.save();

  res.json(result);
};

const editUserRole = async (req, res) => {
  const { id, newRoles } = req?.body;

  if (!id || !newRoles)
    return res.status(400).json({ message: 'ID and newRole are required.' });
  const foundUser = await User.findOne({ _id: id }).exec();

  foundUser.roles = newRoles;
  const result = await foundUser.save();

  res.json(result);
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  editUserRole,
};
