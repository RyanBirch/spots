// initialize express
const express = require('express');
const app = express();

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') app.use(express.static('client/build'))

// database
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mern_auth_jwt'
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true
})

// routes for api and view
const routes = require('./routes')
app.use(routes)

// set port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🌎 ==> API server now on port ${PORT}!`))