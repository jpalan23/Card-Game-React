import React, { Component } from 'react';
import './App.css';
import Dealer from './components/Dealer/Dealer';
import Player from './components/Player/Player';
import StartGame from './components/StartGame/StartGame';

class App extends Component {
    state ={
        isStart: false,
        dealer:[
            {suit: 'HEARTS', value: '7' },
            {suit: 'SPADES', value:  'QUEEN'},
            {suit: 'HEARTS', value:  'ACE'},
            {suit: 'SPADES', value:  '3'},
        ],
        player:[
            {suit: 'HEARTS', value: '7' },
            {suit: 'SPADES', value:  'QUEEN'},
            {suit: 'HEARTS', value:  'ACE'},
            {suit: 'SPADES', value:  '3'},
        ]
    }
    

    letsStartGame = (e) => {
        const start = this.state.isStart;
        this.setState({isStart: !start})
    };


    render() {
          
        let show = null;
        if (this.state.isStart){
            show = (
            <div  className="App">
                <Dealer hand = {this.state.dealer}/>
                <Player hand = {this.state.player}/>
            </div>
            );
        }else{
            show = (
                <div className="App">
                    <StartGame click = {(e) => this.letsStartGame (e)} />
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