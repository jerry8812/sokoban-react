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
      <div>
        <Board currentLevel={currentLevel}/>
      </div>
    )
  }
}
