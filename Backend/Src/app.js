import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import {connectToSocket} from "./Controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(app);

app.use(cors())
app.use(express.json({limit:"42kb"}))
app.use(express.urlencoded({limit:"42kb",extended:true}))

app.set("port", process.env.PORT || 8000);

app.get("/home", (req, res) => {
  return res.json({ Hello: "world" });
});

const start = async () => {
  const connectionDB = await mongoose.connect(
    "mongodb+srv://yakshvardhansinghmehta_db_user:MimNr4ndyO2YTLS1@vccluster.fxrdb8c.mongodb.net/?appName=VcCluster",
  );
  console.log(`MongoDb connected to DB Host : ${connectionDB.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Listening at port 8000");
  });
};

start();
