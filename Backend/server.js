// backend/server.js - Modified version
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// Update CORS configuration to allow requests from the frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://kiit-rentals.netlify.app', 'https://kiit-rentals.vercel.app', 'https://kiit-rentals-anushrey10.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // Handle all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

app.listen(PORT, () => {  
    connectDB();
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});