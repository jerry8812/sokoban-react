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
  constructor(props) {
    super(props)
    this.state = {
      levelName: this.props.currentLevel.name,
      mapWidth: this.props.currentLevel.width,
      mapHeight: this.props.currentLevel.height,
      gameMap: this.props.currentLevel.gameMap,
      player: this.props.currentLevel.player,
      targets: this.props.currentLevel.targets
    }
  }


  handleKeyDown = (event) => {
    if (directionMap[event.keyCode]) {
      this.doMove(directionMap[event.keyCode])
    }
  }

  doMove = (Direction) => {
    const { gameMap, player, targets } = this.state
    const destinationX = player.x + Direction.x
    const destinationY = player.y + Direction.y
    const nextCell = gameMap[destinationX][destinationY]
    if (nextCell === 0 || nextCell === 3) {//player moves onto empty or target
      gameMap[destinationX][destinationY] = 2
      if (JSON.stringify(targets).indexOf(JSON.stringify([player.x, player.y])) !== -1) {
        gameMap[player.x][player.y] = 3
      } else {
        gameMap[player.x][player.y] = 0
      }
      this.setState({
        gameMap: gameMap,
        player: { "x": destinationX, "y": destinationY }
      })
    } else if (nextCell === 4 || nextCell ===5) { //player moves onto crate
      const theCellNextToCrateX = destinationX + Direction.x
      const theCellNextToCrateY = destinationY + Direction.y
      const theCellNextToCrate = gameMap[theCellNextToCrateX][theCellNextToCrateY]
      if (theCellNextToCrate === 0 || theCellNextToCrate === 3) {
        gameMap[theCellNextToCrateX][theCellNextToCrateY] = theCellNextToCrate === 0 ? 4 : 5
        gameMap[destinationX][destinationY] = 2
        if (JSON.stringify(targets).indexOf(JSON.stringify([player.x, player.y])) !== -1) {
          gameMap[player.x][player.y] = 3
        } else {
          gameMap[player.x][player.y] = 0
        }
        this.setState({
          gameMap: gameMap,
          player: { "x": destinationX, "y": destinationY }
        })
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  render() {
    const { mapWidth, mapHeight, gameMap } = this.state
    return (
      <div className="gameBoard"
        style={{ gridTemplateColumns: 'repeat(' + mapWidth + ', 55px)', gridTemplateRows: 'repeat(' + mapHeight + ', 55px)' }}>
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
