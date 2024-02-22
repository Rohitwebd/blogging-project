const express = require('express');
const { createNews } = require('../Controllers/newsController');
const newsRoute = express.Router();


newsRoute.route("/new").post(createNews)


module.exports = newsRoute