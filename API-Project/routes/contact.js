const express = require('express'); //import express
const router  = express.Router();


// Controller Location
const contactController = require('../controllers/contact');

// Routes
router.post('/contact', contactController.uploadImg, contactController.newContact);
router.get('/contact', contactController.getAllContact);

router.get('/contact/:_id', contactController.getOneContact);
router.put('/contact/:_id', contactController.uploadImg, contactController.updateOneContact);
router.delete('/contact/:_id', contactController.deleteOneContact);

//Export the routes
module.exports = router;