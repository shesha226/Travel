import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Travel API is running",
        version: "1.0.0"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});

app.use('/api/users', userRoutes);
app.use('/api/experiences', experienceRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



export default app;