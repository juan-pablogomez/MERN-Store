import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import productsRoutes from "./routes/products.routes.js";
import indexRoutes from "./routes/index.routes.js";

dotenv.config();
const __dirname = path.resolve();

class Server {
  constructor() {
    this.app = express();
    connectDB();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("PORT", process.env.PORT || 5000);
    this.app.use(express.json());

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "/frontend/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
      });
    }
  }

  routes() {
    this.app.use(indexRoutes);
    this.app.use("/api/products", productsRoutes);
  }

  start() {
    this.app.listen(
      this.app.get("PORT"), () => {
        console.log("Server is running on port: ", this.app.get("PORT"));
      })
  }
}

export default Server;

const server = new Server();
server.start();
