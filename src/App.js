import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Dealer from './components/Players/Dealer/Dealer';
import Player from './components/Players/Player/Player';
import StartGame from './components/StartGame/StartGame';

class App extends Component {
    state = {
        isStart: false,
        deckId : '',
        isLoading: true,
        dealer:[],
        player:[],
        dealerPoints: 0,
        playerPoints: 0,
        winner: false
    }

    // Calling Deck API for drawing initial Cards
    componentDidMount(){
        axios.get('/new/shuffle/?deck_count=1')
            .then(response => {
                const deckId = response.data.deck_id;
                // Creating a new deck
                this.setState({
                    deckId : deckId
                })
                let dealerPoints = 0;
                let playerPoints = 0;
                //Calling 8 cards, 4 for Dealer and 4 for player 
                axios.get(`/${deckId}/draw/?count=8`)
                .then(card_response =>{
                    const cards = card_response.data.cards;
                    let dealer = [];
                    let player = [];
                    for (var i = 0; i < cards.length; i++){
                        let card = cards[i];
                        let suit = 'suit' + card.suit; // For CSS of Card
                        let value = card.value.charAt(0); // For Print value on Card
                        let currentPoint = this.getPoints(value); // Extracting points from API
                        if (i < 4){
                            dealerPoints += currentPoint;
                            dealer.push({
                                suit: suit,
                                value: value,
                                code: card.code
                            });
                        }else{
                            playerPoints += currentPoint;
                            player.push({
                                suit: suit,
                                value: value,
                                code: card.code
                            });
                        }
                    }
                    let winner = this.getWinner(dealerPoints,playerPoints);
                    
                    this.setState({
                        dealerPoints: dealerPoints,
                        playerPoints: playerPoints,
                        player: player,
                        dealer: dealer,
                        isLoading: false,
                        winner: winner
                    })
                })
                .catch();

            }).catch(error =>{});
    }
    
    getWinner = (dealerPoints, playerPoints) =>{
        let winner;
        if(dealerPoints > playerPoints){
            winner = 'dealer';
            
        }else if(playerPoints > dealerPoints){
            winner = 'player';
        }else{
            winner = 'draw';
        }
        return winner
    };

    letsStartGame = (e) => {
        const start = this.state.isStart;
        this.setState({isStart: !start})
    };

    // Calling Deck API for drawing 1 card called from either of players
    drawCard = (e,player)=>{
        console.log(e);
        let deckId = this.state.deckId;
        axios.get(`/${deckId}/draw/?count=1`)
            .then(response =>{
                const card = response.data.cards[0];
                let suit = 'suit' + card.suit;
                let value = card.value.charAt(0);
                let points = this.getPoints(value);
                let dealerPoints = this.state.dealerPoints;
                let playerPoints = this.state.playerPoints;
                if(player === 'Dealer'){
                    let dealer = this.state.dealer;
                    
                    dealer.push(
                        {
                            suit: suit,
                            value: value,
                            code: card.code

                        }
                    );
                    dealerPoints += points;
                    let winner = this.getWinner(dealerPoints,playerPoints);
                    this.setState({
                        dealer: dealer,
                        dealerPoints: dealerPoints,
                        winner: winner
                    });
                }else{
                    let player = this.state.player;
                    player.push(
                        {
                            suit: suit,
                            value: value,
                            code: card.code

                        }
                    );
                    playerPoints += points;
                    let winner = this.getWinner(dealerPoints,playerPoints);
                    this.setState({
                        player: player,
                        playerPoints: playerPoints,
                        winner: winner
                    });
                }
                
            }).catch()
    };

    reShuffle = ()=>{
        let deckId = this.state.deckId;
        axios.get(`/${deckId}/shuffle/?`)
        .then(response => {
            let dealerPoints = 0;
            let playerPoints = 0;
            //Calling 8 cards, 4 for Dealer and 4 for player 
            axios.get(`/${deckId}/draw/?count=8`)
            .then(card_response =>{
                const cards = card_response.data.cards;
                let dealer = [];
                let player = [];
                for (var i = 0; i < cards.length; i++){
                    let card = cards[i];
                    let suit = 'suit' + card.suit; // For CSS of Card
                    let value = card.value.charAt(0); // For Print value on Card
                    let currentPoint = this.getPoints(value); // Extracting points from API
                    if (i < 4){
                        dealerPoints += currentPoint;
                        dealer.push({
                            suit: suit,
                            value: value,
                            code: card.code
                        });
                    }else{
                        playerPoints += currentPoint;
                        player.push({
                            suit: suit,
                            value: value,
                            code: card.code
                        });
                    }
                }
                let winner = this.getWinner(dealerPoints,playerPoints);
                this.setState({
                    dealerPoints: dealerPoints,
                    playerPoints: playerPoints,
                    player: player,
                    dealer: dealer,
                    isLoading: false,
                    winner: winner
                })
            })
            .catch();

        }).catch(error =>{});
    };

    getPoints = (value)=>{
        let currentPoint = 0;
        if(value === 'A'){
            currentPoint = 1;
        }else if(value === 'Q' || value === 'J' || value === 'K'){
            currentPoint = 10;
        }else{
            currentPoint = parseInt(value, 10);
        }
        return currentPoint;
    };

    render() {
          
        let show = null;
        if (this.state.isStart){
            show = (
            <div  className="App">
                <div className="mainGame">
                    <span className="refresh" onClick={this.reShuffle}><img src="/images/refresh.svg" alt="Refresh"></img>
                    </span>
                    <Dealer hand = {this.state.dealer} winner={this.state.winner} totalPoints = {this.state.dealerPoints} draw = {(e) => this.drawCard(e,'Dealer')}/>
                    <Player hand = {this.state.player} winner={this.state.winner} totalPoints ={this.state.playerPoints} draw = {(e) => this.drawCard(e,'Player')}/>
                    
                </div>        
            </div>
            );
        }else{
            show = (
                <div className="App">
                    <StartGame loading ={this.state.isLoading}  click = {(e) => this.letsStartGame (e)} />
                </div>
            );
        }
        return (
            <div>
                {show}
            </div>
        );
    }
}

export default App;