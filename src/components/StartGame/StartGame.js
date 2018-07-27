import React from 'react';
import Card from './../Widgets/Card/Card';
import './StartGame.css';
import PropTypes from 'prop-types';

const StartGame = (props) => {

    return (
        <div className="StartGame">
            <Card />
            <button onClick = {props.click}> Start Game </button>
        </div>
    );
};

StartGame.propTypes = {
    click : PropTypes.func
}

export default StartGame;