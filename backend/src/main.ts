import express from "express";
import authRoutes from "./routes/authRoutes"
import cors from "cors"
const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))
const PORT = 8383;



app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})