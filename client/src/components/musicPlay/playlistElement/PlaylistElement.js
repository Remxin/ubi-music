import React from 'react';
import './PlaylistElement.css';
import { useHistory } from 'react-router-dom';

const PlaylistElement = (props) => {
    const history = useHistory();
    const musicNowPlaying = props.nowPlaying;
    const imgSrc = '/images/' + props.music.fullName + '.jpg';
    let cardClassName;
    musicNowPlaying.fullName === props.music.fullName ? cardClassName = "playlist-card now-playing" : cardClassName="playlist-card";
    // console.log(cardClassName);

    const redirectToPlaylistSong = (song) => {
        history.push({
            pathname: "/music/" + song._id,
            state: { music: song }
        });
        window.location.reload();
    }
    return (
        <div className={cardClassName} onClick={() => redirectToPlaylistSong(props.music)}>
            <img src={imgSrc}></img>
            <div className="playlist-card-description">
                <h5>{props.music.name}</h5>
                <h6>{props.music.author}</h6>
            </div>
        </div>
    )
}

export default PlaylistElement
