import React from 'react';
import Card from './../Widgets/Card/Card';
import './StartGame.css';

const StartGame = (props) => {

    return (
        <div className="StartGame">
            <Card />
            <button onClick = {props.click}> Start Game </button>
        </div>
    );
};

export default StartGame;