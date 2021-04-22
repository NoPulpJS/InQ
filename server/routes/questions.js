const express = require('express');
const questionsController = require('../controllers/questionsController');

const router = express.Router();

router.post('/submit',
  questionsController.submit,
  questionsController.categories,
  // questionsController.companies,
  (req, res) => res.status(200));

module.exports = { router };
