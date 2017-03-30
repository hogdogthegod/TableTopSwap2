import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import GameList from './GameList.js';
import TradeList from './TradeList.js';
import OneGame from './OneGame.js';
import OneTrade from './OneTrade.js';

import '../scss/MainBody.scss';

class MainBody extends Component {
  render() {
    let soughtGames = this.props.filterAllSought(this.props.gameList);
    let ownedGames = this.props.filterAllOwned(this.props.gameList);
    let mySoughtGames = this.props.filterMySought(this.props.gameList);
    let myOwnedGames = this.props.filterMyOwned(this.props.gameList);

    return (
      <Switch className='main-body-routes'>
        <Route exact path='/' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='section-header'>All Games</h2>
            <br key='br' />
            <Link to='/my_games/sought' className='sub-section-header' key='my-sought-header'>My Games Sought</Link>
            <GameList firstX={4} gameList={mySoughtGames} key='my-sought-games'/>
            <Link to='/my_games/owned' className='sub-section-header' key='my-owned-header'>My Games Offered</Link>
            <GameList firstX={4} gameList={myOwnedGames} key='my-owned-games'/>
            <Link to='/all_games/sought' className='sub-section-header' key='sought-header'>Games Sought</Link>
            <GameList firstX={4} gameList={soughtGames} key='sought-games'/>
            <Link to='/all_games/owned' className='sub-section-header' key='owned-header'>Games Offered</Link>
            <GameList firstX={4} gameList={ownedGames} key='owned-games'/>
          </div>
        )} />
        <Route exact path='/all_games' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='section-header'>Others' Games</h2>
            <br key='br' />
            <Link to='/all_games/sought' className='sub-section-header' key='sought-header'>Games Sought</Link>
            <GameList firstX={4} gameList={soughtGames} key='sought-games'/>
            <Link to='/all_games/owned' className='sub-section-header' key='owned-header'>Games Offered</Link>
            <GameList firstX={4} gameList={ownedGames} key='owned-games'/>
          </div>
        )} />
        <Route exact path='/my_games' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='section-header'>My Games</h2>
            <br key='br' />
            <Link to='/my_games/sought' className='sub-section-header' key='my-sought-header'>My Games Sought</Link>
            <GameList firstX={4} gameList={mySoughtGames} key='my-sought-games'/>
            <Link to='/my_games/owned' className='sub-section-header' key='my-owned-header'>My Games Offered</Link>
            <GameList firstX={4} gameList={myOwnedGames} key='my-owned-games'/>
          </div>
        )} />
        <Route exact path='/my_games/sought' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='my-sought-header'>My Games Sought</h2>
            <GameList firstX={20} gameList={mySoughtGames} key='my-sought-games' />
          </div>
        )} />
        <Route exact path='/my_games/owned' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='my-owned-header'>My Games Owned</h2>
            <GameList firstX={20} gameList={myOwnedGames} key='my-owned-games' />
          </div>
        )} />
        <Route exact path='/all_games/sought' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='sought-header'>All Games Sought</h2>
            <GameList firstX={20} gameList={soughtGames} key='sought-games' />
          </div>
        )} />
        <Route exact path='/all_games/owned' render={() => (
          <div className='main-body'>
            <h2 className='section-header' key='owned-header'>All Games Owned</h2>
            <GameList firstX={20} gameList={ownedGames} key='owned-games' />
          </div>
        )} />
        <Route exact path='/game/:id' render={ ({ match }) => {
          let matchingGame = this.props.gameList.filter( (game) => game._id === match.params.id)[0];
          return matchingGame?
            <OneGame game={matchingGame} />:
            <p className='no-games'>No Game with ID</p>
        }} />
        <Route exact path='/my_trades' render={ () => (
          <TradeList 
            currentUser={this.props.currentUser}
            tradeList={this.props.tradeList}
          />
        )} />   
        <Route exact path='/trade/:id' render={ ({ match }) => {
          if (!this.props.tradeList) return (
            <p className='error'>You must be logged in to see your trades</p>
          );
          let matchingTrade = this.props.tradeList.filter( (trade) => trade._id === match.parms.id)[0];
          return matchingTrade?
            <OneTrade 
              currentUser={this.props.currentUser}
              tradeList={this.props.tradeList}
            />:
            <p className='error'>No Trade with that ID</p> 
        }} />
        <Route render={ () => (
          <div className='no-game'>Invalid URL</div>
        )} />
      </Switch>
    );
  }
}

MainBody.propTypes = {
  gameList: React.PropTypes.array.isRequired,
  tradeList: React.PropTypes.array,
  filterAllSought: React.PropTypes.func.isRequired,
  filterAllOwned: React.PropTypes.func.isRequired,
  filterMySought: React.PropTypes.func.isRequired,
  filterMyOwned: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.string
}

export default MainBody;