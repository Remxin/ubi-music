const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(http);

app.use(express.json());

const mongoose = require('mongoose');
const mongodbUrl = 'mongodb://127.0.0.1:27017/musicApp';
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('mongoDB successfully connected')).catch(err => console.log(err));
const Song = require('./models/Song');

const PORT = process.env.PORT || 5000;

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

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});