const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Pass io to routes via req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bakeitbaby')
    .then(() => console.log('MongoDB Connected ✨'))
    .catch(err => console.log('MongoDB Error: ', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/payments', require('./routes/payments'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Bake it Baby API is running... 🥐');
});

io.on('connection', (socket) => {
    console.log('A user connected via WebSocket: ', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
