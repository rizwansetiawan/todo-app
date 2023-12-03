const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Ambil token dari header
  const token = req.header("Authorization"); // id user saat sign login

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization denied, invalid token format" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token.slice(7), "todosApp"); // Menghapus "Bearer " dari token

    // Tambahkan ID pengguna ke objek permintaan
    req.userId = decoded.userId;

    next();  // Lanjutkan ke rute selanjutnya
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: "Token has expired" });
    } else {
      res.status(401).json({ message: "Token is not valid" });
    }
  }
};
