const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  city: String,
  country: String,
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
