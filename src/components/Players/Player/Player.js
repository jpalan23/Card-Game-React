import React, { Component } from 'react';
import './Player.css';
import './../PlayersUI.css';
import Card from './../../Card/Card';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            hand: [],
            totalPoints: 0
        }
    }

    componentWillMount(){
        const hand = [...this.props.hand];
        const points = this.props.totalPoints;
        this.setState({
            hand: hand,
            totalPoints: points
        });
    }

    // Checking for new props
    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props){
            const hand = [...nextProps.hand];
            const points = nextProps.totalPoints;
            this.setState({
                hand:hand,
                totalPoints: points 
            });
        }
    }

    flipCard= (code)=>{
        const hand = [...this.state.hand];
        let totalPoints = this.state.totalPoints;
        const cardIndex = hand.findIndex(card=>{
            return card.code === code;
        });
        const card = hand[cardIndex];
        const show = card.show;
        if(show === 'faceUp'){
            totalPoints -= card.points;
            card.show = 'faceDown';
        }else{
            totalPoints += card.points;
            card.show = 'faceUp';
        }
        hand[cardIndex] = card;
        this.setState({
            totalPoints:totalPoints,
            hand:hand
        });
    };

    render() {

        let handOfCards = null;
        if(this.state.hand.length > 0){
        handOfCards =(
            <div className="spread">
                {
                    this.state.hand.map(card =>{
                      return <Card 
                        click={() => this.flipCard(card.code)}
                        key = {card.code}                   
                        value= {card.value} 
                        suit = {card.suit}
                        show = {card.show} />    
                    })
                }
            </div>
        );}
        
        return (
            <div className = "PlayerUI">
                <div className="buttonSet">
                    <span className='score'>{this.state.totalPoints}</span>
                </div>
                <div className = "title">
                    <h1> Player </h1>
                </div>
                <div className="hand">
                    {handOfCards}
                    {/* <HandOfCards hand = {this.props.hand}  show = {cardBackground}/> */}
                </div>
                
                
            </div>
        );
    }
}

export default Player;