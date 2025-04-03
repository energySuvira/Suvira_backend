const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    desc:{
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    appearance: {
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    applications:{
        type: String,
        required: true
    },
    image:{
        type: String,
        requiredd: true
    }
}, {
    timestamps: true
});

const ProductSchema = mongoose.model('ProductSchema', productSchema);
module.exports = ProductSchema;