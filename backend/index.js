// import required packages
const express = require('express')
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// initialize the Express application
const app = express()
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = 3000

// connection to MongoDB locally
const url = 'mongodb://127.0.0.1:27017/chat-app'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected succsessfully');
    })

    .catch(err => {
        console.error('connection error', err);
    })

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World')
})


// Initialize a simple API endpoint for fetching chat history
app.get('/chatHistory', async (req, res) => {
    const messages = await ChatMessage.find();
    res.json(messages);
  }); 

// Handle socket events
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('chat', (data) => {
      console.log('Message received:', data);
      io.emit('chat', data);
    });
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  
app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`)
})