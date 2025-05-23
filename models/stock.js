const { text } = require("express");
// import module mongoose
const mongoose = require("mongoose");
const { stringify } = require("uuid");
// membuat schema / tabel menggunakan mongose
const { Schema } = mongoose;
const { Int32 } = require('mongodb');



const stokSchema = new mongoose.Schema({
    nama_outlet: String,
<<<<<<< HEAD
    kode_obat: String,
=======
    kode_obat: Number,
>>>>>>> 8f32eec380c0b4462dcdc67c37a117fc87d026d7
    nama_obat: String,
    isi_obat: Number,
    satuan: String,
    qty: Number
});

module.exports = mongoose.model('Stok', stokSchema);