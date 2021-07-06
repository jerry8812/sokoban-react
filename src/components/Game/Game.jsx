import React, { Component } from 'react'
import Board from '../Board/Board'
import "./Game.css"

function getAllTargets(array) {
  const newArray = []
  array.forEach((element, x)=> {
    element.forEach((cell, y) => {
      if(cell === 3) {
        newArray.push([x, y])
      }
    })
  })
  return newArray
}

export default class Game extends Component {

  render() {
    const { currentLevel } = this.props
    currentLevel.targets = getAllTargets(currentLevel.gameMap)
    return (
      <div className="mainGame">
        <Board currentLevel={currentLevel}/>
        <div className="gameInfo">
          <h1 className="gameInfo-title">SOKOBAN</h1>
          <div className="gameInfo-levels">
            <p>Levels: 4/25</p>
            <div className="gameInfo-buttons">
              <div className="gameInfo-buttons-group1">
                <input type="button" value="Previous Level"/>
                <input type="button" value="Next Level"/>
              </div>
              <div>
                <input type="button" value="Reset"/>
                <input type="button" value="Step Back"/>
              </div>
            </div>
            <div className="gameInfo-count">
              <p>Step: 3</p>
              <p>Time: 3</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
