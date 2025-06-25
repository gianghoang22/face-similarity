const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const uploadDir = path.join(__dirname, "uploads");
// Tạo thư mục uploads nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use(
  cors({
    origin: "*", // Cho phép tất cả các nguồn
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
const upload = multer({ dest: "uploads/" });

app.post(
  "/compare",
  upload.fields([{ name: "img1" }, { name: "img2" }]),
  (req, res) => {
    const img1 = req.files["img1"][0].path;
    const img2 = req.files["img2"][0].path;

    const command = `python face_similarity.py ${img1} ${img2}`;

    exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(img1); // xóa file sau khi xử lý
      fs.unlinkSync(img2);

      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: "Python script error" });
      }

      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: "Invalid JSON from Python" });
      }
    });
  }
);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Face Similarity API",
    endpoints: {
      compare: "/compare (POST)",
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
