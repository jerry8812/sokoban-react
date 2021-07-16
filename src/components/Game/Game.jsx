import React, { Component } from 'react'
import Board from './Board/Board'
import "./Game.css"
import {formatTime} from '../../utils/utils'

export default class Game extends Component {

  render() {
    const { currentLevel, size, targets, moves, time} = this.props
    const currentLevelName = Number.parseInt(currentLevel.name)
    
    return (
      <div className="homePage_game">
        <Board {...currentLevel} 
               move={this.props.move}
               targets = {targets}/>
        <div className="gameInfo">
          <div className="gameInfo-levels">
            <p>Levels {currentLevelName}/{size}</p>
            <div className="gameInfo-buttons">
              <div className="gameInfo-buttons-group1">
                <input type="button" 
                       value="Previous Level" 
                       onClick={()=>this.props.reset(currentLevelName-1)}
                       className={currentLevelName <= 1 ? "btn_disabled" : ""}/>

                <input type="button" value="Next Level" 
                       onClick={()=>this.props.reset(currentLevelName+1)}
                       className={currentLevelName >= size ? "btn_disabled" : ""}/>
              </div>
              <div>
                <input type="button" value="Reset" onClick={() => this.props.reset(currentLevelName)}/>
                <input type="button" value="Step Back" onClick={() =>this.props.playBack()}/>
              </div>
            </div>
            <div className="gameInfo-count">
              <p>Moves: {moves}</p>
              <p>Time: <label className="gameInfo-time">{formatTime(time)}</label></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
