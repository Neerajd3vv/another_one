import express from "express";
import authRoutes from "./routes/authRoutes"

const app = express();
app.use(express.json())

const PORT = 8383;



app.use("/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})