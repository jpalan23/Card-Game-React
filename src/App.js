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
        playerPoints: 0
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
                
                //Calling 8 cards, 4 for Dealer and 4 for player 
                axios.get(`/${deckId}/draw/?count=8`)
                .then(card_response =>{
                    const cards = card_response.data.cards;
                    this.setCards(cards);
                })
                .catch();

            }).catch(error =>{});
    }

    // Reshuffling new Game
    reShuffle = ()=>{
        let deckId = this.state.deckId;
        axios.get(`/${deckId}/shuffle/?`)
        .then(response => {
            //Calling 8 cards, 4 for Dealer and 4 for player 
            axios.get(`/${deckId}/draw/?count=8`)
            .then(card_response =>{
                const cards = card_response.data.cards;
                this.setCards(cards);
            })
            .catch();
        }).catch(error =>{});
    };

    letsStartGame = (e) => {
        const start = this.state.isStart;
        this.setState({isStart: !start})
    };

    setCards = (cards) =>{

        let dealerPoints = 0;
        let playerPoints = 0;                    
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
                    code: card.code,
                    show: 'faceUp',
                    points: currentPoint
                });
            }else{
                playerPoints += currentPoint;
                player.push({
                    suit: suit,
                    value: value,
                    code: card.code,
                    show: 'faceUp',
                    points: currentPoint
                    
                });
            }
        }
        
        this.setState({
            dealerPoints: dealerPoints,
            playerPoints: playerPoints,
            player: player,
            dealer: dealer,
            isLoading: false,
        });
    };

    // Calling Deck API for drawing 1 card called from either of players
    drawCard = ()=>{
        let deckId = this.state.deckId;
        axios.get(`/${deckId}/draw/?count=2`)
            .then(response =>{
                const dcard = response.data.cards[0]; // Dealers Card
                let dsuit = 'suit' + dcard.suit;
                let dvalue = dcard.value.charAt(0);
                let dpoints = this.getPoints(dvalue);
                let dshow = 'faceDown';
                let dealer = this.state.dealer;                    
                dealer.push(
                    {
                        suit: dsuit,
                        value: dvalue,
                        code: dcard.code,
                        show: dshow,
                        points: dpoints

                    }
                );
                const pcard = response.data.cards[1]; // Players Card
                let psuit = 'suit' + pcard.suit;
                let pvalue = pcard.value.charAt(0);
                let ppoints = this.getPoints(pvalue);
                let pshow = 'faceDown';
                let player = this.state.player;
                
                player.push(
                    {
                        suit: psuit,
                        value: pvalue,
                        code: pcard.code,
                        show: pshow,
                        points: ppoints
                    }
                );
                this.setState({
                    player: player,
                    dealer: dealer
                });
                }    
            ).catch()
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
        
        let disableDraw = null;
        if (this.state.dealer.length > 4){
            disableDraw = 'Deal disableDraw'
        }else{
            disableDraw = 'Deal'
        }

        let show = null;
        
        if (this.state.isStart){
            show = (
            <div  className="App">
                <div className="mainGame">
                    <span className="refresh" onClick={this.reShuffle}><img src="/images/refresh.svg" alt="Refresh"></img>
                    </span>
                    <Dealer hand = {this.state.dealer}  totalPoints = {this.state.dealerPoints} />
                    <div className="dealing">
                        <button className={disableDraw}  onClick= {this.drawCard}>Deal</button>
                    </div>                    
                    <Player hand = {this.state.player}  totalPoints ={this.state.playerPoints} />
                    
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