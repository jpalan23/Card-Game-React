import React, { Component } from 'react';
import './Dealer.css'
import HandOfCards from './../Widgets/HandOfCards/HandOfCards';

class Dealer extends Component {
    constructor(props){
        super(props);
        this.state = {
            hand : [],
            total : 0,
            show: false,
        }
    }
    

    componentWillMount(){
        let totalPoints = 0;
        // Adding suit for css in Card and keeping single char for display of card
        let propHand = this.props.hand;
        propHand.forEach(card => {
            card['suit'] = 'suit' + card['suit'];
            let value = card['value'].charAt(0);
            if(value === 'A'){
                totalPoints += 1;
            }else if(value === 'Q' || value === 'J' || value === 'K'){
                totalPoints += 10;
            }else{
                totalPoints += parseInt(value, 10);
            }
            card['value'] = value;
        });
        this.setState({
            hand: propHand,
            total : totalPoints
        });
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
                    <HandOfCards hand = {this.state.hand}  show = {cardBackground}/>
                </div>
                <div className="buttonSet">
                    <button onClick = {this.showCards}>{this.state.show ? 'Hide' : 'Show' } Hand</button>
                    <button>Draw Card</button>
                </div>
                <div className="score">
                    <h2>{this.state.total}</h2>
                </div>
            </div>
        );
    }
}

export default Dealer;