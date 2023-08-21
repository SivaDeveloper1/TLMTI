const express = require('express');
const { connectDB } = require('./src/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.text({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.raw({ inflate: true, limit: "50mb", type: "text/xml" }));

const passport = require('passport');
require('./src/config/passport');
app.use(passport.initialize());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

const mobileRoutes = require('./src/mobile/routes/mobileRoutes');

process.on("uncaughtException", function (error) {
  console.log("Server uncaughtException Error : Before Restart uncaughtException", error);
});

process.on("unhandledRejection", function(error) {
  console.log("Server unhandledRejection  Error : Before Restart unhandledRejection", error);
});

// Routes
app.use('/mobile', mobileRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
