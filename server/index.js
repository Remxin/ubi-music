const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(http);
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')


//-------- cors options --------
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}

// -------- app use --------
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

// -------- importing routes ---------
const authRoutes = require('./routes/authRoutes')

// --------- connecting to database ---------
const mongoose = require('mongoose');
const mongodbUrl = 'mongodb://127.0.0.1:27017/musicApp';
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('mongoDB successfully connected')).catch(err => console.log(err));
const Song = require('./models/Song');
const User = require('./models/User');

const PORT = process.env.PORT || 5000;

// -------- connecting to socketio --------
io.on('connection', (socket) => {
    console.log('a user connected')
    Song.find().then(result => {
        socket.emit('output-songs', result)
    }).catch(err => console.log(err));

    socket.on('get-playlist', actuallPlaylist => {
        // let playList;
        let playList = actuallPlaylist.map((songId => {
            Song.findById(songId).then(result => {
                socket.emit('output-playlist', result)
                // return 
            });
        }))
    })
})

// -------- using routes --------
app.use(authRoutes)

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});