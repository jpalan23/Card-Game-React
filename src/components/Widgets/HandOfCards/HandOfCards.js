import React from 'react';
import './HandOfCards.css';
import Card from './../Card/Card';
import PropTypes from 'prop-types';

const HandOfCards = (props) => {
    let cards = null;

    if (props.show === 'back'){
        cards = props.hand.map(card => {
            return (
            <div key = {card.code} className = "eachCard" >
                <Card />>    
            </div>
            )
        });
    }else{
        cards = props.hand.map(card => {
            return  (
                <div key = {card.code} className = "eachCard" >
                    <Card
                        key = {card.code}
                        value= {card.value} 
                        suit = {card.suit}
                        show = 'front' />    
                </div>
            )              
        });
    }

    

    return (
        <div className = "spread">
            {cards}
        </div>
    );
};

HandOfCards.propTypes = {
    hand: PropTypes.array
}

export default HandOfCards;