const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  specialist: String,
  availableTimes: [String],
  password: String,
  city: String,
  country: String,
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
