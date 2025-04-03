
const mongoose = require('mongoose');
 
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    businessMail: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ContactSchema = mongoose.model('ContactSchema', contactSchema);
module.exports = ContactSchema;