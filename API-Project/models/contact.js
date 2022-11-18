const mongoose = require("mongoose"); //import mongoose

// tea schema
const ContactSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    image: String,
    email: String,
    phoneNumber: String,
});

const Contact = mongoose.model('Contact', ContactSchema); //convert to model named Contact
module.exports = Contact; //export for controller use

