const mongoose = require('mongoose');

const clientName = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    img: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ClientName = mongoose.model('ClientName', clientName);
module.exports = ClientName;