import React, { Component } from 'react'

import copyRight from '../assets/images/copyright.png' 
import { connect } from 'react-redux'
import { move,unlockLevel,setOpen,setGrade } from '../redux/actions/levelActions'
import { getNumbersOfObject, grade } from '../utils/utils'

import Cell from './Cell'

const directionMap = {
  //Left(keyCode)
  37: { x: 0, y: -1 },
  //Up(keyCode)
  38: { x: -1, y: 0 },
  //Right(keyCode)
  39: { x: 0, y: 1 },
  //Down(keyCode)
  40: { x: 1, y: 0 }
}

class Board extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }
  handleKeyDown = (event) => {
    if (directionMap[event.keyCode]) {
      this.checkBeforeMove(directionMap[event.keyCode])
    }
  }
  checkBeforeMove = (Direction) => {
    const { gameMap, player } = this.props.currentLevel
    const destinationX = player.x + Direction.x
    const destinationY = player.y + Direction.y
    const theCellNextToCrateX = destinationX + Direction.x
    const theCellNextToCrateY = destinationY + Direction.y
    const nextCell = gameMap[destinationX][destinationY]
    if (nextCell === 0 || nextCell === 3) {//player moves onto empty or target
      this.doMove({"x": destinationX, "y": destinationY}, false)
    } else if ((nextCell === 4 || nextCell ===5)) { //player moves onto crate
      const theCellNextToCrate = gameMap[theCellNextToCrateX][theCellNextToCrateY]
      if (theCellNextToCrate === 0 || theCellNextToCrate === 3) {
        this.doMove({"x": destinationX, "y": destinationY}, {"x": theCellNextToCrateX, "y": theCellNextToCrateY})
      }
    }
  }
  doMove = (movePlayerTo, moveCrateTo) => {
    if(this.checkIsWin()) return
    let { gameMap, player, targets, moves, history, levelName } = this.props.currentLevel
    let newGameMap = JSON.parse(JSON.stringify(gameMap))
    const isPlayerOnTargte = JSON.stringify(targets).indexOf(JSON.stringify([player.x, player.y])) !== -1
    newGameMap[movePlayerTo.x][movePlayerTo.y] = 2
    newGameMap[player.x][player.y] = isPlayerOnTargte ? 3 : 0
    if(moveCrateTo) {
      newGameMap[moveCrateTo.x][moveCrateTo.y] = newGameMap[moveCrateTo.x][moveCrateTo.y] === 0 ? 4 : 5
    }
    const newPlayer = { "x": movePlayerTo.x, "y": movePlayerTo.y }
    const addedHistory = {gameMap: gameMap,  player: player, moves: moves}
    this.props.move({
      gameMap: newGameMap,
      player: newPlayer,
      moves: ++moves,
      history: [...history, addedHistory]
    })
    if(this.checkIsWin()) {
      this.props.unlockLevel(levelName*1 +1)
      this.props.setGrade(levelName, grade(targets.length, moves, levelName))
      setTimeout(() => {
        this.props.setOpen(true)
      }, 10)
    }
  }

  checkIsWin = () => {
    let { gameMap, targets } = this.props.currentLevel
    if(targets.length === getNumbersOfObject(gameMap, 5)) {
      return true
    }else {
      return false
    }
  }
  
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

export default connect(
  state => ({currentLevel: state.currentLevel}),
  {
    move: move,
    unlockLevel: unlockLevel,
    setOpen: setOpen,
    setGrade: setGrade
  }
)(Board)