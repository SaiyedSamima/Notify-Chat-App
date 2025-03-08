import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);


    // if (!decoded) {
    //   return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    // }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = user; // Attach user to request
      next();
    });

    // const user = await User.findById(decoded.userId);
    // console.log("User:", user);

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // req.user = user;

    // next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};