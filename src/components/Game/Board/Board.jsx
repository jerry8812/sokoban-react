import React, { Component } from 'react'
import Cell from '../Cell/Cell'
import './Board.css'

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

export default class Board extends Component {

  handleKeyDown = (event) => {
    if (directionMap[event.keyCode]) {
      this.checkBeforeMove(directionMap[event.keyCode])
    }
  }
  checkBeforeMove = (Direction) => {
    const { gameMap, player } = this.props
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
    let { gameMap, player } = this.props
    let newGameMap = JSON.parse(JSON.stringify(gameMap))
    const targets = this.props.targets
    const isPlayerOnTargte = JSON.stringify(targets).indexOf(JSON.stringify([player.x, player.y])) !== -1
    newGameMap[movePlayerTo.x][movePlayerTo.y] = 2
    newGameMap[player.x][player.y] = isPlayerOnTargte ? 3 : 0
    if(moveCrateTo) {
      newGameMap[moveCrateTo.x][moveCrateTo.y] = newGameMap[moveCrateTo.x][moveCrateTo.y] === 0 ? 4 : 5
    }
    player = { "x": movePlayerTo.x, "y": movePlayerTo.y }
    this.props.move(newGameMap, player)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  render() {
    const { gameMap, width, height} = this.props
    const style = {
      gridTemplateColumns: 'repeat(' + width + ', 40px)',
      gridTemplateRows: 'repeat(' + height + ', 40px)'
    } 
    return (
      <div className="gameBoard" style={style}>
        {
          gameMap.map((row) => {
            return row.map((cell, index) => {
              return <Cell key={index} cell={cell} />
            })
          })
        }
      </div>
    )
  }
}
