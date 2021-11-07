const mongoose = require('mongoose');

//Schemas/Models
let imgSchema = new mongoose.Schema({
    id: Number,
    score: Number
 });
 
 module.exports = mongoose.model('Img', imgSchema);