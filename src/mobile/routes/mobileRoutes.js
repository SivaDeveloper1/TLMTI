const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const adminController = require('../controllers/adminController');
const doctorController = require('../controllers/doctorController');


const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profileImage'); // Specify the folder where profile images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.originalname);
    const filename = `profile-${uniqueSuffix}${fileExtension}`;
    cb(null, filename); // Set the dynamically generated filename
  }
});

// Multer upload configuration
const upload = multer({ storage });


// Admin Routes
router.post('/admin/signup', adminController.adminSignup);
router.post('/admin/login', adminController.adminLogin);

//Patient Routes
router.post('/patient/signup', patientController.userSignup);
router.post('/patient/login', patientController.userLogin);
router.post('/patientCreate', patientController.createPatient);
router.get('/getAllPatients', patientController.getAllPatients);
router.get('/getPatient/:id', patientController.getPatientById);
router.put('/updatePatient/:id', patientController.updatePatientById);
router.delete('/deletePatient/:id', patientController.deletePatientById);

// Doctor Routes
router.post('/doctor/signup', doctorController.doctorSignup);
router.post('/doctor/login', doctorController.doctorLogin);
router.post('/doctorCreate', doctorController.createDoctor);
router.get('/getAllDoctors', doctorController.getAllDoctors);
router.get('/getDoctor/:id', doctorController.getDoctorById);
router.put('/updateDoctor/:id', doctorController.updateDoctorById);
router.delete('/deleteDoctor/:id', doctorController.deleteDoctorById);



module.exports = router;
