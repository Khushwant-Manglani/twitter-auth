import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import homeRoutes from "./routes/home.js";
import dasboardRoutes from "./routes/dashboard.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/dashboard', dasboardRoutes);

// Connect to MongoDB
async function connectDatabase() {
  await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));
}

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is listening on port: ${PORT}`);
  await connectDatabase();
});
