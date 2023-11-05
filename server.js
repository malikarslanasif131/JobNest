import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path"; // Import the 'path' module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "./ars-portfolio/build")));
//import route
import userRoute from "./routes/userRoute.js";

import { authMiddleware } from "./middleware/authMiddleware.js";

//config connect
dotenv.config();
// connectDB();

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// Serve static files from the 'uploads' directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define a route for the server
app.use("/api/user/", userRoute);

app.get("/api/test", (req, res) => {
  res.send("Hello from the Express server!");
});
app.get("/api/auth/test", authMiddleware, (req, res) => {
  res.send("Hello from the Express server and test Auth middleware!");
});

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./ars-portfolio/build/index.html"));
// });

const port = process.env.PORT || 8000;
// Start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`.bgCyan.white);
  });
});
// console.log("forgot password hit ".bgGray.magenta);
