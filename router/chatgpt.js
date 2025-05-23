// const express = require('express');
// const openAI = require('openai');
// const router = express.Router();


// const openai = new openAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// router.post('/tanya obat', async (req, res) => {
//     const {namaobat} = req.body;
    
//     try {
//         const chatCompletion = await openai.chatCompletion.create({
//             model : "gpt-3.5-turbo",
//             messages : [
//                 { role: "system", content: "kami adalah asisten farmasi yang menjelaskan kegunaan obat secara ringkas dan jelas."},
//                 { role: "user", content: `jelaskan apa kegunaan dari obat ${namaobat}.`}
//             ],
//             max_tokens: 200
//         });

//         const jawaban = chatCompletion.choices[0].message.content;
//         res.json({jawaban});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "gagal mendapatkan respon dari chatgpt"});
//     }
// });

// module.exports = router;
