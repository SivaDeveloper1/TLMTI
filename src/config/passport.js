const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema'); 
const Patient = require('../models/patientSchema'); 
const Doctor = require('../models/doctorSchema'); 


passport.use('admin', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const admin = await Admin.findOne({
        $or: [{ email: username }, { phoneNumber: username }],
      });

      if (!admin) {
        return done(null, false, { message: 'Admin not found' });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, admin);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use('patient', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const patient = await Patient.findOne({
        $or: [{ email: username }, { phoneNumber: username }],
      });

      if (!patient) {
        return done(null, false, { message: 'Patient not found' });
      }

      const passwordMatch = await bcrypt.compare(password, patient.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, patient);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use('doctor', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const doctor = await Doctor.findOne({
        $or: [{ email: username }, { phoneNumber: username }],
      });

      if (!doctor) {
        return done(null, false, { message: 'Doctor not found' });
      }

      const passwordMatch = await bcrypt.compare(password, doctor.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, doctor);
    } catch (error) {
      return done(error);
    }
  }
));

