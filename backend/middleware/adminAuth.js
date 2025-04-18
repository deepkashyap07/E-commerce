import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token; // ✅ matches Postman key

    

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
