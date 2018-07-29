import React, { Component } from 'react';
import './Player.css';
import './../PlayersUI.css';
import HandOfCards from './../../Widgets/HandOfCards/HandOfCards';

class Player extends Component {
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
        if (this.state.draw){
            disableDraw = 'disableDraw'
        }
        

        return (
            <div className = "PlayerUI">
                <div className="buttonSet">
                    <button onClick={this.showCards}>{this.state.show ? 'Hide' : 'Show' } Hand</button>
                    <span className="score">{this.props.totalPoints}</span>
                    <button className={disableDraw} onClick= {this.drawCard}>Draw Card</button>
                </div>
                <div className = "title">
                    <h1> Player </h1>
                </div>
                <div className="hand">
                    <HandOfCards hand = {this.props.hand}  show = {cardBackground}/>
                </div>
                
                
            </div>
        );
    }
}

export default Player;