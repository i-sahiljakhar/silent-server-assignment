const jwt = require("jsonwebtoken");

const  authMiddleware  =  (req, res, next) => {
  
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET || "default-secret-key";
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
    req.user = decoded;
    next(); //this is required
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const requestLogger = (req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
};

// Dono middlewares export karo
module.exports = {
  authMiddleware,
  requestLogger
};

