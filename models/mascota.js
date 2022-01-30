const mongoose = require('mongoose');
const schema = mongoose.Schema;

const mascotaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String
})


// CREAR EL MODELA

const mascota = mongoose.model('mascota', mascotaSchema);

module.exports = mascota;