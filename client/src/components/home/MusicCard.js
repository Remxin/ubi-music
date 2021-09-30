import React from 'react';
import './MusicCard.css';
import { useHistory } from 'react-router-dom';

const MusicCard = (props) => {
    const musicImage = `/images/${props.music.fullName}.jpg`;
    let smallFontSize = {}
    const history = useHistory();
    
    const redirectToSong = (song) => {
        history.push({
            pathname: "/music/" + song._id,
            state: { music: song }
        });
    }

    if (props.music.feat !== "") {
        smallFontSize ={
            fontSize: 10+'px'
        }
    }

    return (
        <div className="song-card" onClick={() => redirectToSong(props.music)} key={props.music._id}>
                <div className="song-image">
                    <img src={musicImage} alt="song image"/>
                </div>
                <div className="song-description">
                    <h3 className="song-name" style={smallFontSize}>{props.music.name} <span>{props.music.feat}</span></h3>
                    <h5 className="song-author">{props.music.author}</h5>
                </div>
        </div>
    )
}

export default MusicCard
