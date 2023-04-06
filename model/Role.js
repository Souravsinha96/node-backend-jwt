const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  User: Number,
  Editor: Number,
  Admin: Number,
});
module.exports = mongoose.model('Role', rolesSchema);
