const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Patient = require('../../models/patientSchema');
const moment = require('moment');

exports.userLogin = (req, res, next) => {
  passport.authenticate('patient', { session: false }, (err, user, info) => {
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

exports.userSignup = async (req, res) => {
    try {
      const { name, email, mobile, password, gender, maritalStatus, age, DOB, pincode, country, state, district, cityVillage, street, doorNo } = req.body;
  
      const existingPatient = await Patient.findOne({ $or: [{ email }, { mobile }] });
      if (existingPatient) {
        return res.status(409).json({ message: 'Patient already exists with the provided email or mobile' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new patient
      const newPatient = new Patient({
        name,
        email,
        mobile,
        password: hashedPassword,
        gender,
        maritalStatus,
        age,
        DOB,
        pincode,
        country,
        state,
        district,
        cityVillage,
        street,
        doorNo,
      });
  
      await newPatient.save();
  
      return res.status(201).json({ message: 'Patient created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred' });
    }
};
  
// Create Patient
exports.createPatient = async (req, res) => {
  try {
    // Extract patient details from the request body
    const { name, email, mobile, password, gender, maritalStatus, age, DOB, pincode, country, state, district, cityVillage, street, doorNo } = req.body;

    // Check if patient already exists with the given email or mobile
    const existingPatient = await Patient.findOne({ $or: [{ email }, { mobile }] });
    if (existingPatient) {
      return res.status(409).json({ message: 'Patient already exists with the provided email or mobile' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient
    const newPatient = new Patient({
      name,
      email,
      mobile,
      password: hashedPassword,
      gender,
      maritalStatus,
      age,
      DOB,
      pincode,
      country,
      state,
      district,
      cityVillage,
      street,
      doorNo,
    });

    await newPatient.save();

    return res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Read All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.json(patients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Read Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    return res.json(patient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Update Patient by ID
exports.updatePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updates = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updates, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    return res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

// Delete Patient by ID
exports.deletePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndRemove(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    return res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
