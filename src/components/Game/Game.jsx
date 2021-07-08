import React, { Component } from 'react'
import Board from './Board/Board'
import "./Game.css"
import {formatTime} from '../../utils/utils'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      time: 0
    }
  }

  move = (gameMap, player) => {
    this.props.move(gameMap, player)
  }

  componentDidMount() {
    /* let {time} = this.state
    this.timer = setInterval(() => {
      this.setState({
        time: ++time
      })
    }, 1000) */
  }
  componentWillUnmount() {
    // clearInterval(this.timer)
  }

  render() {
    const { currentLevel, size, targets} = this.props
    const {step, time} = this.state
    const currentLevelName = Number.parseInt(currentLevel.name)
    
    return (
      <div className="homePage_game">
        <Board {...currentLevel} 
               move={this.move}
               targets = {targets}/>
        <div className="gameInfo">
          <div className="gameInfo-levels">
            <p>Levels {currentLevelName}/{size}</p>
            <div className="gameInfo-buttons">
              <div className="gameInfo-buttons-group1">
                <input type="button" 
                       value="Previous Level" 
                       onClick={()=>this.props.changeLevel(currentLevelName-1)}
                       className={currentLevelName <= 1 ? "btn_disabled" : ""}/>

                <input type="button" value="Next Level" 
                       onClick={()=>this.props.changeLevel(currentLevelName+1)}
                       className={currentLevelName >= size ? "btn_disabled" : ""}/>
              </div>
              <div>
                <input type="button" value="Reset"/>
                <input type="button" value="Step Back"/>
              </div>
            </div>
            <div className="gameInfo-count">
              <p>Step: {step}</p>
              <p>Time: {formatTime(time)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
