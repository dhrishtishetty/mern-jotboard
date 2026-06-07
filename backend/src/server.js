import express from "express";
import router from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", router);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
});


