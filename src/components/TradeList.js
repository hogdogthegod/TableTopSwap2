import React, { Component } from 'react';

import { NoneCard } from './GameCard.js';
import TradeCard from './TradeCard.js';

import '../scss/TradeList.scss';

class TradeList extends Component {
  render() {
    let trades = [];
    this.props.tradeList.forEach( (oneTrade) => {
      trades.push(
        <TradeCard 
          currentUser={this.props.currentUser}
          trade={oneTrade}
          key={oneTrade._id}
          gameList={this.props.gameList}
        />
      );
    });
    if (trades.length === 0) trades = <NoneCard linkTo='new/trade' />;
    
    // display each section that should exist for the user
    return (
      <div className='trade-list'>
        {trades}
      </div>
    );
  }
}

TradeList.propTypes = {
  currentUser: React.PropTypes.string,
  tradeList: React.PropTypes.array,
  gameList: React.PropTypes.array.isRequired
}

export default TradeList;