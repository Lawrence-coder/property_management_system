import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) { // It checks if the Authorization header is present and starts with "Bearer "
    return res.status(401).json({ message: "Not authorized" }); 
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key

    req.user = {
      id: decoded.id,  
      email: decoded.email,
      role: decoded.role,
      status: decoded.status
    };

    if (req.user.status === 'Inactive') {
      return res.status(403).json({message: "Your account is deactivated. Please contact the administrat."});
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
