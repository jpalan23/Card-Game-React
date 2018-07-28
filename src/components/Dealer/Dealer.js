import React, { Component } from 'react';
import './Dealer.css'
import HandOfCards from './../Widgets/HandOfCards/HandOfCards';

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
     

    render() {
        let cardBackground = null;
        if (this.state.show){
            cardBackground = 'front';
        }else{ 
            cardBackground = 'back';
        }
        

        return (
            <div className = "Dealer">
                <div className = "title">
                    <h1> Dealer </h1>
                </div>
                <div className="hand">
                    <HandOfCards hand = {this.props.hand}  show = {cardBackground}/>
                </div>
                <div className="buttonSet">
                    <button onClick = {this.showCards}>{this.state.show ? 'Hide' : 'Show' } Hand</button>
                    <button onClick= {this.props.draw}>Draw Card</button>
                </div>
                <div className="score">
                    <h2>{this.props.totalPoints}</h2>
                </div>
            </div>
        );
    }
}

export default Dealer;