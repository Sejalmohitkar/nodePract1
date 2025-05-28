import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check token exists
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default AuthMiddleware;
