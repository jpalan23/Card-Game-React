import React, { Component } from 'react';
import './Dealer.css';
import './../PlayersUI.css';
import Card from './../../Card/Card';

class Dealer extends Component {
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
                <div className="hand">
                    {/* <HandOfCards hand = {this.props.hand} flipCard={(e) => this.flipCard(e)}/> */}
                    {handOfCards}
                </div>
                <div className = "title">
                    <h1> Dealer </h1>
                </div>
                <div className="buttonSet">
                    <span className='score'>{this.state.totalPoints}</span>    
                </div>
                
            </div>
        );
    }
}

export default Dealer;