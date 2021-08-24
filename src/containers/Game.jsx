import React, { Component } from 'react'
import { connect } from 'react-redux'

import { move,unlockLevel,setOpen,setGrade,setCurrentLevel } from '../redux/actions/levelActions'
import { getNumbersOfObject, grade } from '../utils/utils'

import Board from './Board'
import leftArrow from '../assets/images/btn_left_arrow_normal.png'
import leftArrowPressed from '../assets/images/btn_left_arrow_pressed.png'
import rightArrow from '../assets/images/btn_right_arrow_normal.png'
import rightArrowPressed from '../assets/images/btn_right_arrow_pressed.png'
import upArrow from '../assets/images/btn_up_arrow_normal.png'
import upArrowPressed from '../assets/images/btn_up_arrow_pressed.png'
import downArrow from '../assets/images/btn_down_arrow_normal.png'
import downArrowPressed from '../assets/images/btn_down_arrow_pressed.png'

class Game extends Component {

  state = {
    allArrows: {
      37: { x: 0, y: -1, isPressed: true },//Left
      38: { x: -1, y: 0, isPressed: true },//up
      39: { x: 0, y: 1, isPressed: true}, //Right
      40: { x: 1, y: 0, isPressed: true }  //down
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }
  stepBack = () => {
    const {moves, history} = this.props.currentLevel
    if (moves > 0) {
      const theStep = history[moves-1]
      history.pop()
      this.props.move({...theStep, history: history})
    }
  }
  switchImage = (theKey)=>{
    const {allArrows} = this.state
    const theArrow = allArrows[theKey]
    this.setState({
      allArrows: {
        ...this.state.allArrows, [theKey]: {...theArrow,isPressed: false}
      }
    })
    setTimeout(()=> {
      this.setState({
        allArrows: {
          ...this.state.allArrows, [theKey]: {...theArrow,isPressed: true}
        }
      })
    }, 100)
  }

  handleKeyDown = (event) => {
    const theKey = event.keyCode
    const { allArrows } = this.state
    if (allArrows[theKey]) {
      this.checkBeforeMove(allArrows[theKey], theKey)
    }
  }

  checkBeforeMove = (Direction, theKey) => {
    this.switchImage(theKey)
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
    setTimeout(()=> {
      if(this.checkIsWin()) {
        this.props.unlockLevel(levelName*1 +1)
        this.props.setGrade(levelName, grade(targets.length, moves, levelName))
        this.props.setOpen(true)
      }
    }, 0)
  }
  
  checkIsWin = () => {
    const { gameMap, targets } = this.props.currentLevel
    if(targets.length === getNumbersOfObject(gameMap, 5)) {
      return true
    }else {
      return false
    }
  }

  render() {
    const { allArrows } = this.state 
    const allLevels = this.props.allLevels
    const {moves, levelName} = this.props.currentLevel
    return (
      <div className="app-game">
        <Board currentLevel={this.props.currentLevel}/>
        <div className="app-game-gameInfo">
        <div className="app-game-gameInfo-info">
          <span>Level: <span className="red-span">{levelName}</span>/{allLevels.length}</span>
          <p>Moves: <span className="red-span">{moves}</span></p>
        </div>
        <div className="app-game-gameInfo-buttons">
          <div className="gameInfo-buttons-group1">
            <input type="button" value="Reset" onClick={()=>this.props.setCurrentLevel(levelName*1)}/>
            <input type="button" value="Step Back" onClick={()=> this.stepBack()}/>
            {/* <input type="button"
              value="Previous Level"
              onClick={()=>this.changeLevel(levelName*1 -1)}/>
            <input type="button" value="Next Level" onClick={()=>this.changeLevel(levelName*1 +1)}/> */}
          </div>
          <div className="gameInfo-buttons-group2">
            <div className="all-arrows-up" onClick={()=> this.checkBeforeMove(allArrows[38], 38)}>
              <img src={ allArrows[38].isPressed ? upArrow: upArrowPressed} alt="up Arrow" />
            </div>
            <div className="all-arrows-left" onClick={()=> this.checkBeforeMove(allArrows[37], 37)}>
              <img src={ allArrows[37].isPressed ? leftArrow: leftArrowPressed} alt="left Arrow" />
            </div>
            <div onClick={()=> this.checkBeforeMove(allArrows[40], 40)}>
              <img src={ allArrows[40].isPressed ? downArrow: downArrowPressed} alt="up Arrow" />
            </div>
            <div onClick={()=> this.checkBeforeMove(allArrows[39], 39)}>
              <img src={ allArrows[39].isPressed ? rightArrow: rightArrowPressed} alt="up Arrow" />
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(
  state => ({currentLevel: state.currentLevel, allLevels: state.allLevels}),
  {
    move: move,
    unlockLevel: unlockLevel,
    setOpen: setOpen,
    setGrade: setGrade,
    setCurrentLevel: setCurrentLevel,
  }
)(Game)