import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
    const cardValue = props.value;
    return (
        <div className={`Card ${props.show}`}>
            <div className = {` ${props.suit}`}>
                <div className="top-left ">
                    <span>{cardValue}</span>
                </div>
                <p>{cardValue}</p>
                <div className="bottom-right">
                    <span>{cardValue}</span>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    value: PropTypes.string,
    suit: PropTypes.string,
    show: PropTypes.string
}

Card.defaultProps = {
    suit: '',
    value: '',
    show: 'back'
}


export default Card;