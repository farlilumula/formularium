const { text } = require("express");
// import module mongoose
const mongoose = require("mongoose");
const { stringify } = require("uuid");
// membuat schema / tabel menggunakan mongose
const { Schema } = mongoose;
const { Int32 } = require('mongodb');



const stokSchema = new mongoose.Schema({
    nama_outlet: String,
    kode_obat: { type: String, unique: true },
    nama_obat: String,
    isi_obat: Number,
    satuan: String,
    qty: Number
});

module.exports = mongoose.model('Stok', stokSchema);