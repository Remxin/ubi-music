const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    feat: {
        type: String,
        required: false,
        default: ""
    },
    fullName: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: false,
        default: ""
    },
    other: {
        type: String,
        required: false,
        default: ""
    }
})

const Song = mongoose.model('song', songSchema);
module.exports = Song;

// ----- Example schema -----

// {
// "name": "",
// "author": "",
// "type": "",
// "feat": "",
// "fullName": "",
// "album": "",
// "other": ""
// }