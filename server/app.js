import express from "express";
import {Server} from 'socket.io';
import { createServer } from "http";

const port=3000;
const app=express();
const httpServer= createServer(app);


const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection",(socket)=>{
    console.log("user connected");
    console.log("ID",socket.id);
})


httpServer.listen(port,()=>{
    console.log(`server is running in port ${port}`);
});