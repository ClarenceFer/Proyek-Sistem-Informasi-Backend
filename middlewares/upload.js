const multer = require("multer");

// Gunakan memoryStorage karena Railway tidak bisa simpan file permanen di disk
const storage = multer.memoryStorage();

// Filter file berdasarkan tipe
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".docx", ".txt"];
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (allowedTypes.includes("." + ext)) {
    cb(null, true);
  } else {
    cb(new Error("Format file tidak didukung. Gunakan PDF, DOCX, atau TXT."), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maksimum 10MB
  }
});

module.exports = upload;
