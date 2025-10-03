const db = require("../models"); // pastikan ada models/index.js Sequelize
const File = db.file; // model File (lihat step 3)

// Upload file → simpan ke DB
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Tidak ada file yang diupload." });
    }

    // Simpan ke DB
    const file = await File.create({
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer
    });

    res.status(200).send({
      message: "File berhasil diupload!",
      fileId: file.id
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send({ message: "Gagal upload file." });
  }
};

// Download file tunggal
exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).send({ message: "File tidak ditemukan." });
    }

    res.setHeader("Content-Type", file.mimetype);
    res.setHeader("Content-Disposition", `attachment; filename=${file.filename}`);
    res.send(file.data);
  } catch (err) {
    res.status(500).send({ message: "Gagal download file." });
  }
};

// Preview file (langsung tampil tanpa download)
exports.previewFile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).send({ message: "File tidak ditemukan." });
    }

    res.setHeader("Content-Type", file.mimetype);
    res.send(file.data);
  } catch (err) {
    res.status(500).send({ message: "Gagal preview file." });
  }
};

// Hapus file
exports.deleteFile = async (req, res) => {
  try {
    const deleted = await File.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).send({ message: "File tidak ditemukan." });
    }
    res.send({ message: "File berhasil dihapus." });
  } catch (err) {
    res.status(500).send({ message: "Gagal menghapus file." });
  }
};

// Get file as BLOB (JSON base64)
exports.getFileAsBlob = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).send({ message: "File tidak ditemukan." });
    }

    res.send({
      id: file.id,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      data: file.data.toString("base64")
    });
  } catch (err) {
    res.status(500).send({ message: "Gagal ambil file." });
  }
};
