import User from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
          message: "All fields are required.",
          success: false
      })
    };

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials', success: false });
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials', success: false });
    
    // Create and return JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      // The { httpOnly: true } option ensures that the cookie is only accessible from the server and not from client-side JavaScript.
      res.cookie('token', token, { httpOnly: true });
      res.json({ token: token, success: true });
    });
  
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', success: false} );
  }
}

export default login;