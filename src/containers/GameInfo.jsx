import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setCurrentLevel,move } from '../redux/actions/levelActions'

class GameInfo extends Component {

  changeLevel = (levelName) => {
    if(levelName>0 && levelName< this.props.allLevels.length) {
      this.props.setCurrentLevel(levelName)
    }
  }
  stepBack = () => {
    const {moves, history} = this.props.currentLevel
    if (moves > 0) {
      const theStep = history[moves-1]
      history.pop()
      this.props.move({...theStep, history: history})
    }
  }
  render() {
    const allLevels = this.props.allLevels
    const {moves, levelName} = this.props.currentLevel
    return (
      <div className="app-game-gameInfo">
        <div className="app-game-gameInfo-info">
          <span>Level: <span className="red-span">{levelName}</span>/{allLevels.length}</span>
          <p>Moves: <span className="red-span">{moves}</span></p>
        </div>
        <div className="app-game-gameInfo-buttons">
          <div className="gameInfo-buttons-group1">
            <input type="button"
              value="Previous Level"
              onClick={()=>this.changeLevel(levelName*1 -1)}/>
            <input type="button" value="Next Level" onClick={()=>this.changeLevel(levelName*1 +1)}/>
          </div>
          <div>
            <input type="button" value="Reset" onClick={()=>this.changeLevel(levelName*1)}/>
            <input type="button" value="Step Back" onClick={()=> this.stepBack()}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    currentLevel: state.currentLevel,
    allLevels: state.allLevels
  }),
  {
    setCurrentLevel: setCurrentLevel,
    move: move
  }
)(GameInfo)