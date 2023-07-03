import React from 'react';
import './style/App.css';
import { Game } from './pages/game';
import { Route, Switch } from 'react-router-dom';
import { TicTacToePage } from './pages/ticTacToePage';

export const App = () => {
  return (
    <div className='paper App'>
      <Switch>
        <Route path="/"  exact>
          <Game />
        </Route>
        <Route path="/ticTacToe"  exact>
          <TicTacToePage />
        </Route>
      </Switch>
    </div>
  );
}