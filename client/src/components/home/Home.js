import React, { useEffect, useState } from 'react';
import MusicCard from './MusicCard';
import './Home.css';
import io from 'socket.io-client';
let socket;

const Home = () => {
    const ENDPT = process.env.REACT_APP_SERVER_IP;
    console.log(ENDPT)
    const [allSongs, setAllSongs] = useState([])
    //initializing socket.io connection
    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT]);
    //request server for songs available
    useEffect(() => {
        socket.on('output-songs', songs => {
            setAllSongs(songs)
        })
    }, []);

    //setting playlist with all musics in the app
    let popPlaylist = [];
    let rapPlaylist = [];
    //setting pop playlist
    const popMusicCards = allSongs.map((music) => {
        if (music.type === 'pop') {
            popPlaylist = [...popPlaylist, music._id];
            return (
                <MusicCard music={music} />
            )
        }
    })
    //setting rap playlist
    const rapMusicCards = allSongs.map((music) => {
        if (music.type === 'rap') {
            rapPlaylist = [...rapPlaylist, music._id];
            return (
                <MusicCard music={music} key={music._id} />
            )
        }
    })
    //generation random pop playlist
    let truePopPlaylist = [];
    for (let i = 0; i < popPlaylist.length; i = i) {
        let random = Math.floor(Math.random() * (popPlaylist.length - 1));
        truePopPlaylist = [...truePopPlaylist, popPlaylist[random]];
        popPlaylist.splice(random, 1);
        if (truePopPlaylist.length > 24) {
            break
        }
    }

    //generating random rap playlist
    let trueRapPlaylist = [];
    for (let i = 0; i < rapPlaylist.length; i = i) {
        let random = Math.floor(Math.random() * (rapPlaylist.length - 1));
        trueRapPlaylist = [...trueRapPlaylist, rapPlaylist[random]];
        rapPlaylist.splice(random, 1);
        if (trueRapPlaylist.length > 24) {
            break
        }
        // i++
    }
    //passing playlists throught sessionStorage that other pages can read them
    sessionStorage.setItem('popPlaylist', JSON.stringify(truePopPlaylist));
    sessionStorage.setItem('rapPlaylist', JSON.stringify(trueRapPlaylist));
    //setting session variable that will be used in MusicPlay.js
    sessionStorage.setItem('isNotFirstSong', false);


    return (
        <div className="background">
            <h2 className="music-section-title">Pop</h2>
            <div className="music-section">
                {popMusicCards}
            </div>
            <h2 className="music-section-title">Rap</h2>
            <div className="music-section">
                {rapMusicCards}
            </div>
        </div>
    )
}

export default Home
