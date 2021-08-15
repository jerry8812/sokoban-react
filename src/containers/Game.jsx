import React, { Component } from 'react'
import Board from './Board'
import GameInfo from './GameInfo'

export default class Game extends Component {
  render() {
    return (
      <div className="app-game">
        <Board/>
        <GameInfo/>
      </div>
    )
  }
}
