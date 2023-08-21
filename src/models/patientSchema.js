const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  gender: String,
  maritalStatus: String,
  age: Number,
  DOB: Date,
  pincode: String,
  country: String,
  state: String,
  district: String,
  cityVillage: String,
  street: String,
  doorNo: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
