import React, { Component } from 'react'
import './App.css'
import data from "./assets/levels.json"

import Game from './components/Game/Game'
import Levels from './components/Levels/Levels'
import Header from './components/Header/Header'

import {getAllTargets} from './utils/utils'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLevel: data.levels[0],
      targets: getAllTargets(data.levels[0].gameMap)
    }
  }

  changeLevel = (levelName) => {
    const newLevel = data.levels[levelName-1]
    this.setState({
      currentLevel: newLevel,
      targets: getAllTargets(newLevel.gameMap)
    })
  }
  move = (gameMap, player) => {
    const {currentLevel} = this.state
    currentLevel.gameMap = gameMap
    currentLevel.player = player
    this.setState({
      currentLevel: currentLevel
    })
  }
  render() {
    const {currentLevel, targets} = this.state
    return (
      <div className="app">
        <Header></Header>
        <Levels levels={data.levels} changeLevel={this.changeLevel}></Levels>
        <Game currentLevel={currentLevel} 
              size={data.levels.length}
              changeLevel={this.changeLevel}
              move = {this.move}
              targets = {targets}/>
      </div>
    )
  }
}
