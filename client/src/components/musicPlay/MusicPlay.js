import React, { useEffect, useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import './MusicPlay.css';
import PlaylistElement from './playlistElement/PlaylistElement';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
let socket;

const MusicPlay = (props) => {
  const ENDPT = process.env.REACT_APP_SERVER_IP;
  const history = useHistory();

  const songInfo = props.location.state.music;
  const image = "/images/" + songInfo.fullName + ".jpg";
  const song = "/music/" + songInfo.fullName + ".mp3";
  const [musicId, setMusicId] = useState(0);
  const [playlistLen, setPlaylistLen] = useState(0);
  let playlistType;

  if (songInfo.type === "pop") {
    playlistType = 'popPlaylist';
  } else if (songInfo.type == "rap") {
    playlistType = 'rapPlaylist'
  }

  const actuallPlaylistInfo = JSON.parse(sessionStorage.getItem(playlistType));
  let actuallPlaylist = [];
  const [truePlaylist, setTruePlaylist] = useState([]);
  const [truePlaylistSetted, setTruePlaylistSetted] = useState(false);

  //initializing socket.io connection
  useEffect(() => {
    socket = io(ENDPT);
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPT]);
  //getting songs informations from server
  let increment = 0;
  useEffect(() => {
    socket.emit('get-playlist', actuallPlaylistInfo);
    socket.on('output-playlist', playlist => {
      actuallPlaylist = [...actuallPlaylist, playlist]
      setTruePlaylist(actuallPlaylist);
      if (playlist.fullName === songInfo.fullName) {
        setMusicId(increment);
      }
      increment++;
      setPlaylistLen(increment);
    });
  }, [])
  //setting go to prev music onclick function
  const goToPrevMusic = () => {
    let musicIdToPlay = musicId - 1;
    if (musicIdToPlay < 0) {
      musicIdToPlay = playlistLen - 1;
    }
    const musicToPlay = truePlaylist[musicIdToPlay];
    history.push({
      pathname: "/music/" + musicToPlay._id,
      state: { music: musicToPlay }
    });
    window.location.reload();
  };

  //settion go to next music onclick function
  const goToNextMusic = () => {
    let musicIdToPlay = musicId + 1;
    if (musicIdToPlay > playlistLen - 1) {
      musicIdToPlay = 0;
    }
    const musicToPlay = truePlaylist[musicIdToPlay];
    history.push({
      pathname: "/music/" + musicToPlay._id,
      state: { music: musicToPlay }
    });
    window.location.reload();
  };

  //setting that the first song on the playlist is current song
  //there is one mistake i cannot fix despite many attempts - the playlist often changes after playing the first songs, but then stays the same. I think i need to learn more hooks to handle that error
  useEffect(() => {
    if (truePlaylist.length === 25) {
      let isNotFirstSong = JSON.parse(sessionStorage.getItem('isNotFirstSong'));
      if (!isNotFirstSong) {
        let currentMusicIndex = truePlaylist.findIndex((element) => {
          return element._id == songInfo._id
        });

        if (currentMusicIndex === -1) {
          let changedPlaylist = truePlaylist;
          changedPlaylist.pop();
          changedPlaylist = [songInfo, ...changedPlaylist]
          setTruePlaylist(changedPlaylist);
          setTruePlaylistSetted(true);

        } else {
          let changedPlaylist = truePlaylist;
          changedPlaylist.splice(currentMusicIndex, 1);
          changedPlaylist = [songInfo, ...changedPlaylist];
          setTruePlaylist(changedPlaylist)
          setTruePlaylistSetted(true);
        }
        sessionStorage.setItem('isNotFirstSong', true);
      }
    } else {
      setTruePlaylistSetted(true);
    }
    if (songInfo.type === 'pop') {
      sessionStorage.setItem('truePopPlaylist', truePlaylist);
    } else if (songInfo.type === 'rap') {
      sessionStorage.setItem('trueRapPlaylist', truePlaylist);
    }
  }, [truePlaylist])

  return (
    <div className="music-page" onLoad={() => document.getElementById('music-played').play()}>
      <div className="music-card">
        <img src={image} className="music-image" />
        <div className="music-info">
          <h3>{songInfo.name} {songInfo.feat}</h3>
          <h4>{songInfo.author}</h4>
        </div>
        <div className="previous-music" onClick={() => goToPrevMusic()}><BiSkipPrevious /></div>
        <div className="next-music" onClick={() => goToNextMusic()}><BiSkipNext className="next-music-btn" /></div>
        <audio id="music-played" controls controlsList="nodownload" onEnded={() => {
          document.getElementById("music-played").pause();
          goToNextMusic()
        }}>
          <source src={song}
            type="audio/mpeg" />
        </audio>
        <div className="playlist-cards">
          {!truePlaylistSetted ? null : truePlaylist.map((element) => {
            return (
              <PlaylistElement music={element} nowPlaying={songInfo} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MusicPlay
