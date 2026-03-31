const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).send({ success: false, message: "Authorization token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "foodnest-dev-secret");
    req.user = decoded;
    req.body.id = decoded.id;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Auth failed", error: error.message });
  }
};
