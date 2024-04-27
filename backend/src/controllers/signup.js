import User from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(401).json({
          message: "All fields are required.",
          success: false
      })
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists', success: false });
    
    // Create new user
    user = new User({ username, email, password });
    
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    
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
    res.status(500).json({ msg: 'Server Error', success: false });
  }
}

export default signup;