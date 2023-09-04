import "dotenv/config";
import { connectDB } from "./db/conn.js";
import route from "./router/main.js";
import morgan from "morgan";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api",route);


app.listen(PORT,async() =>{
    console.log(`server is listening to the port ${PORT}`);
    await connectDB();
})