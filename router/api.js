const express = require("express");
const router = express.Router();
const Item = require("../models/item"); // pastikan path-nya sesuai dengan model kamu

// Route untuk suggestion
router.get("/suggestions", async (req, res) => {
  const keyword = req.query.q;
  if (!keyword) return res.json([]);

  try {
    const regex = new RegExp("^" + keyword, "i"); // diawali kata kunci
    const results = await Item.find({
      $or: [
        { kata_kunci: { $regex: regex } },
        { nama_obat: { $regex: regex } },
        { zat_aktif: { $regex: regex } },
      ],
    })
      .limit(10)
      .select("kata_kunci nama_obat zat_aktif -_id");

    const suggestions = Array.from(
      new Set(
        results.flatMap((item) => [
          item.kata_kunci,
          item.nama_obat,
          item.zat_aktif,
        ])
      )
    ).filter(Boolean);

    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

module.exports = router;
