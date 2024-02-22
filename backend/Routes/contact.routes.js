const express = require('express');
const { createContact } = require('../Controllers/contactController');
const contactRoute = express.Router();


contactRoute.route("/new").post(createContact)


module.exports = contactRoute