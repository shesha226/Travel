import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',)

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Travel API is running',
        version: '1.0.0'
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});

export default app;