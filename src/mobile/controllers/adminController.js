const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../../models/adminSchema');
const moment = require('moment');

exports.adminLogin = (req, res, next) => {
  passport.authenticate('admin', { session: false }, (err, user, info) => {
    console.log("===err,",err,user);
    if (err || !user) {
      return res.status(400).json({ message: 'Login failed', user: user });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        res.send(err);
      }

      // Generate a signed JWT token
      const token = jwt.sign({ userId: user._id }, 'mySecretKey123');
      return res.json({ user, token });
    });
  })(req, res, next);
};

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, mobile, password, city, country } = req.body;

    // Check if admin already exists with the given email or mobile
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { mobile }] });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists with the provided email or mobile' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      mobile,
      password: hashedPassword,
      city,
      country,
    });

    await newAdmin.save();

    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
