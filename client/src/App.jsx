import React, { useEffect,useState,useRef}  from 'react'
import {io} from 'socket.io-client'
import './App.css'
import {Button, Container, TextField, Typography,Box, Stack} from '@mui/material'

function App() {
  
  const [message, setmessage] = useState("");
  const [room, setroom] = useState("");
  const socket = useRef(null);
  const [socketid, setSocketId] = useState("");
  const [messages, setmessages] = useState([]);
  
  console.log(messages);
  useEffect(() => {
    socket.current=io('http://localhost:3000');

    socket.current.on("connect",()=> {
      console.log("Connected to server with ID:", socket.current.id)
      setSocketId(socket.current.id);
    });
    socket.current.on("message",(data)=>{
      console.log("Message received:", data);
      // You can update the UI or state here to display the message
      setmessages((messages)=> [...messages,data]);
    })

    // socket.current.on("welcome", (message) => {
    //   console.log(message)
    // });
    return()=>{
      socket.current.disconnect();
    };
  },[])

    const handleSubmit = (e) => {
    e.preventDefault();
    if(socket.current){
      socket.current.emit("message", {message,room});
      setmessage("");
      setroom("");
    }
    
  }

  return (
    <>
      <div>
        <Container maxWidth="sm" className="App">
          <Box sx={{  padding: 2 }}>

          <Typography>
          Socket.IO Client
          </Typography>

          <Typography variant='h6' component='div' gutterBottom>
            This is socket id : {socket.current?.id ?? "connecting..."}
          </Typography>

          <form action="" onSubmit={handleSubmit}>
            <TextField label="Message" fullWidth margin="normal" value={message} onChange={(e) => setmessage(e.target.value)} />
              <TextField label="Room" fullWidth margin="normal" value={room} onChange={(e) => setroom(e.target.value)} />
            <Button type='submit' variant="contained" color="primary">Send</Button>

          </form>
<Stack>
{messages.map((msg, i) => (
  <Typography key={i}>
    {typeof msg === "string" ? msg : `${msg.message} `}
  </Typography>
))}
</Stack>


          </Box>
        </Container>
      </div>
    </>
  )
}

export default App
