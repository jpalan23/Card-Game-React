import React, { Component } from 'react';
import './Dealer.css';
import './../PlayersUI.css'
import HandOfCards from './../../Widgets/HandOfCards/HandOfCards';

class Dealer extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            draw: false
        }
    }

    showCards = () => {
        const currentShow = this.state.show;
        this.setState({show : !currentShow});
    }
     
    drawCard = () =>{
        let draw = this.state.draw;
        this.setState({
            draw: !draw
        });
        this.props.draw();
    }

    render() {
        let cardBackground = null;
        if (this.state.show){
            cardBackground = 'front';
        }else{ 
            cardBackground = 'back';
        }

        let disableDraw = null;
        if (this.props.hand.length > 4){
            disableDraw = 'disableDraw'
        }
        
        let winner= null;
        if(this.props.winner === 'dealer'){
            winner = 'score green';
        }else if(this.props.winner === 'draw'){
            winner ='score yellow';
        }else{
            winner = 'score';
        }

        return (
            <div className = "PlayerUI">
                <div className="hand">
                    <HandOfCards hand = {this.props.hand}  show = {cardBackground}/>
                </div>
                <div className = "title">
                    <h1> Dealer </h1>
                </div>
                <div className="buttonSet">
                    <button onClick={this.showCards}>{this.state.show ? 'Hide' : 'Show' } Hand</button>
                    <span className={winner}>{this.props.totalPoints}</span>    
                    <button className={disableDraw} onClick= {this.drawCard}>Draw Card</button>
                </div>
                
            </div>
        );
    }
}

export default Dealer;