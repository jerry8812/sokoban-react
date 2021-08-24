import React, { Component } from 'react'

import copyRight from '../assets/images/copyright.png' 

import Cell from './Cell'

export default class Board extends Component {
  
  render() {
    const { gameMap, width, height } = this.props.currentLevel
    const boardWidth = 2.4 * width
    const style = {
      gridTemplateColumns: 'repeat(' + width + ', 2.4rem)',
      gridTemplateRows: 'repeat(' + height + ', 2.4rem)',
      width: boardWidth+'rem'
      // width: `${boardWidth}rem`
    } 
    return (
      <div className="app-board">
        <div className="gameBoard" style={style}>
          {
            gameMap.map((row) => {
              return row.map((cell, index) => {
                return <Cell key={index} cell={cell} />
              })
            })
          }
        </div>
        <div className="app-board-copyright">
          
          <span><img src={copyRight} alt="copyright" />Jerry Wang</span>
        </div>
      </div>
    )
  }
}