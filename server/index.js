import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import useRouter from "./routes/user.routes.js";
import {notFound, errorHandler} from './middleware/error.mddleware.js'


const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from this origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     credentials: true, // Allow cookies and authorization headers
//   })
// );

const PORT = process.env.PORT || 8080


if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/user", useRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on  http://localhost:" + PORT)
    connectDB()
})