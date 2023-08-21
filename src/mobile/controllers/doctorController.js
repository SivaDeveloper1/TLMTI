const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Doctor = require('../../models/doctorSchema');
const moment = require('moment');

exports.doctorLogin = (req, res, next) => {
  passport.authenticate('doctor', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Login failed', user: user });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ userId: user._id }, 'mySecretKey123');
      return res.json({ user, token });
    });
  })(req, res, next);
};

exports.doctorSignup = async (req, res) => {
    try {
      const { name, email, mobile, specialist, availableTimes, password, city, country } = req.body;
  
      // Check if doctor already exists with the given email or mobile
      const existingDoctor = await Doctor.findOne({ $or: [{ email }, { mobile }] });
      if (existingDoctor) {
        return res.status(409).json({ message: 'Doctor already exists with the provided email or mobile' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new doctor
      const newDoctor = new Doctor({
        name,
        email,
        mobile,
        specialist,
        availableTimes,
        password: hashedPassword,
        city,
        country,
      });
  
      await newDoctor.save();
  
      return res.status(201).json({ message: 'Doctor created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred' });
    }
};
  

// Create Doctor
exports.createDoctor = async (req, res) => {
  try {
    // Extract doctor details from the request body
    const { name, email, mobile, specialist, availableTimes, password, city, country } = req.body;

    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      email,
      mobile,
      specialist,
      availableTimes,
      password,
      city,
      country,
    });

    // Save the doctor to the database
    await newDoctor.save();

    return res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Read All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.json(doctors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Read Doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json(doctor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Update Doctor by ID
exports.updateDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updates = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updates, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json(updatedDoctor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Delete Doctor by ID
exports.deleteDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const deletedDoctor = await Doctor.findByIdAndRemove(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
