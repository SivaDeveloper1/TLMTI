const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  date: Date,
  // Other appointment-related fields
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
