import React from 'react';
import Card from './../Widgets/Card/Card';
import './StartGame.css';
import PropTypes from 'prop-types';

const StartGame = (props) => {
    let isDisabled = ' ';
    if(props.loading){
        isDisabled = 'disableButton'
    }
    return (
        <div className="StartGame">
            <Card />
            <button className={isDisabled} onClick = {props.click}> Start Game </button>
        </div>
    );
};

StartGame.propTypes = {
    click : PropTypes.func,
    loading: PropTypes.bool

}

export default StartGame;