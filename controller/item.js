// import modul express
const { response, request } = require("express");
// import custom id unik dgan menggunakan nmp uuid
const { v4: uuidv4 } = require("uuid");
// import modul item dari models
const Item = require("../models/item");
const Stok = require('../models/stock');

module.exports = {
  index: function (req, res) {
    let keyword = {};
    if (req.query.keyword) {
      const rawKeywords = req.query.keyword.split("%%").map(k => k.trim()); // pisahkan berdasarkan '%%'
      const regexes = rawKeywords.map(k => new RegExp(k, "i")); // buat regex untuk tiap keyword
    
      // Buat kondisi $or untuk setiap field, dan $and untuk menggabungkan semua keyword
      const andConditions = regexes.map(regex => ({
        $or: [
          { kata_kunci: { $regex: regex } },
          { nama_obat: { $regex: regex } },
          { zat_aktif: { $regex: regex } },
        ]
      }));
    
      keyword = { $and: andConditions };
    }




    const query = Item.aggregate([
      { $match: keyword }, // Pencarian berdasarkan input keyword
      {
        $lookup: {
          from: "stoks",           // Nama koleksi (bukan nama model!)
          localField: "kode_obat", // Field di koleksi Item
          foreignField: "kode_obat", // Field yang cocok di koleksi Stok
          as: "stok_data"
        }
      },
      {
        $limit: 15
      }
    ])


    query.exec(function (error, items) {
      if (error) console.log(error);

      console.log(items);

        if (error) {
            console.error(error);
            return res.render("user/index", {
                items: [],
                errorMessage: "Terjadi kesalahan saat mengambil data.",
            });
        }

        if (!items || items.length === 0) {
            return res.render("user/index", {
                items: [],
                errorMessage: "Data tidak ditemukan.",
            });
        }

      if (error) {
        console.error(error);
        return res.render("user/index", {
          items: [],
          errorMessage: "Terjadi kesalahan saat mengambil data.",
        });
      }

      if (!items || items.length === 0) {
        return res.render("user/index", {
          items: [],
          errorMessage: "Data tidak ditemukan.",
        });
      }

      const formattedItems = items.map((item) => ({
        ...item,
        hnappnFormatted: new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(item.hnappn || 0),
      }));

      res.render("user/index", { items : formattedItems });
    });
  },

  show: function (req, res) {
    const id = req.params.id;
    Item.findById(id, function (error, data) {
      if (error) console.log(error);
      console.log(data);
      res.render("user/show", { item: data });
    });
  },

  create: function (req, res) {
    res.render("pages/about");
  },
  store: function (req, res) {
    Item.create(
      {
        kode_obat: req.body.kode_obat,
        nama_obat: req.body.nama_obat,
        zat_aktif: req.body.zat_aktif,
        kode_complement: req.body.kode_complement,
        kode_indikasi: req.body.kode_indikasi,
        indikasi: req.body.indikasi,
        hnappn: req.body.hnappn,
        link_gambar: req.body.link_gambar,
        kode_pasien: req.body.kode_pasien,
        pasien: req.body.pasien,
        kontra_indikasi: req.body.kontra_indikasi,
        indication: req.body.indication,
        dosis: req.body.dosis,
        description: req.body.description,
        aturan_pakai: req.body.aturan_pakai,
        efek_samping: req.body.efek_samping,
        golongan: req.body.golongan,
        upselling_1: req.body.upselling_1,
        hargaupselling_1: req.body.hargaupselling_1,
        upselling_2: req.body.upselling_2,
        hargaupselling_2: req.body.hargaupselling_2,
        upselling_3: req.body.upselling_3,
        hargaupselling_3: req.body.hargaupselling_3,
        crosseling_1: req.body.crosseling_1,
        hargacrosseling_1: req.body.hargacrosseling_1,
        crosseling_2: req.body.crosseling_2,
        hargacrosseling_2: req.body.hargacrosseling_2,
        crosseling_3: req.body.crosseling_3,
        hargacrosseling_3: req.body.hargacrosseling_3,
      },
      function (error, result) {
        if (error) console.log(error);

        console.log(result);
        res.redirect("/items");
      }
    );
  },

  edit: function (req, res) {
    const id = req.params.id;
    Item.findById(id, function (error, items) {
      if (error) console.log(error);

      console.log(items);
      res.render("user/edit", { items });
    });
  },


  update: async function (req, res) {
    const id = req.params.id;

    try {
      const updated = await Item.findByIdAndUpdate(
          id,
          {
            kode_obat: req.body.kode_obat,
            nama_obat: req.body.nama_obat,
            zat_aktif: req.body.zat_aktif,
            kode_complement: req.body.kode_complement,
            kode_indikasi: req.body.kode_indikasi,
            indikasi: req.body.indikasi,
            hnappn: req.body.hnappn,
            link_gambar: req.body.link_gambar,
            kode_pasien: req.body.kode_pasien,
            pasien: req.body.pasien,
            kontra_indikasi: req.body.kontra_indikasi,
            indication: req.body.indication,
            dosis: req.body.dosis,
            description: req.body.description,
            aturan_pakai: req.body.aturan_pakai,
            efek_samping: req.body.efek_samping,
            golongan: req.body.golongan,
            upselling_1: req.body.upselling_1,
            hargaupselling_1: req.body.hargaupselling_1,
            upselling_2: req.body.upselling_2,
            hargaupselling_2: req.body.hargaupselling_2,
            upselling_3: req.body.upselling_3,
            hargaupselling_3: req.body.hargaupselling_3,
            crosseling_1: req.body.crosseling_1,
            hargacrosseling_1: req.body.hargacrosseling_1,
            crosseling_2: req.body.crosseling_2,
            hargacrosseling_2: req.body.hargacrosseling_2,
            crosseling_3: req.body.crosseling_3,
            hargacrosseling_3: req.body.hargacrosseling_3,
          },
          { new: true }
      );

      if (!updated) {
        return res.status(404).send("Item tidak ditemukan.");
      }

      res.redirect("/items"); // arahkan ke halaman index setelah update
    } catch (error) {
      console.error("Gagal update:", error);
      res.status(500).send("Terjadi kesalahan saat mengupdate item.");
    }
  },

  delete: function (req, res) {
    let id = req.params.id;
    items = users.filter((user) => user.id != id);
    res.send({
      status: true,
      data: users,
      message: "Data User berhasil di Delete",
      method: req.method,
      url: req.url,
    });
  },
};
