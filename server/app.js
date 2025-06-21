import express from "express";
import {Server} from 'socket.io';
import { createServer } from "http";
import cors from "cors";

const port=3000;
const app=express();
const httpServer= createServer(app);


const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection",(socket)=>{
    console.log("user connected");
    console.log("ID",socket.id);
    
    socket.on("message",(data)=>{
        console.log("message received",data);
        // console.log("room number",room);
        // Emit the message to all connected clients
        io.to(data.room).emit("message",data);
        // send to all including sender
    })
})


httpServer.listen(port,()=>{
    console.log(`server is running in port ${port}`);
});