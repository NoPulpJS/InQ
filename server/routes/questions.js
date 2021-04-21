const express = require('express');
const questionsController = require('../controllers/questionsController');
const router = express.Router();

router.post('/submit',
  questionsController.submit,
 (req, res) => {
  return res.status(200)
})

module.exports = { router }