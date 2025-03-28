import express from "express"
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";



dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '50mb' })); // Increase payload size limit for JSON
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 


app.listen(PORT, () => {
    console.log("Server is running on PORT : " + PORT);
    connectDB();
});