/*
 * @Author: your name
 * @Date: 2021-06-17 21:15:03
 * @LastEditTime: 2021-07-16 09:42:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\App.js
 */
import React, { Component } from 'react'

import Game from './components/Game/Game'
import Levels from './components/Levels/Levels'
import Header from './components/Header/Header'

import {getAllTargets, getAllLevels, getNumbersOfObject} from './utils/utils'

import './App.css'

const allLevels = getAllLevels()
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLevel: allLevels[0],
      targets: getAllTargets(allLevels[0].gameMap),
      history: [],
      moves: 0,
      spentTime: 0,
      isWon: false
    }
  }

  createTimer() {
    let {spentTime} = this.state
    this.timer = setInterval(() => {
      this.setState({
        spentTime: ++spentTime
      })
    }, 1000)
  }
  componentDidMount() {
    this.createTimer()
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  // here use async to make sure the spentTime indeed changed
  reset = async (levelName) => {
    const originalLevels = getAllLevels()
    const currentLevel = originalLevels[levelName-1]
    clearInterval(this.timer)
    await this.setState({
      currentLevel,
      targets: getAllTargets(currentLevel.gameMap),
      moves: 0,
      history: [],
      spentTime: 0,
      isWon: false
    })
    this.createTimer()
  }

  playBack = () => {
    let {currentLevel, history, moves} = this.state
    if(moves > 0) {
      currentLevel.gameMap = history[moves-1].gameMap
      currentLevel.player = history[moves-1].player
      this.setState({
        currentLevel: currentLevel,
        moves: moves - 1
      })
    }
  }

  move = (gameMap, player) => {
    let {currentLevel, moves, history, targets, isWon} = this.state
    if (!isWon){
      const addHistory = {"gameMap":currentLevel.gameMap, "player":currentLevel.player, "moves": moves}
      currentLevel.gameMap = gameMap
      currentLevel.player = player
      this.setState({
       currentLevel: currentLevel,
        moves: ++moves,
        history: [...history, addHistory]
      })
      if(targets.length === getNumbersOfObject(currentLevel.gameMap, 5)) {
        this.setState({
          isWon: true
        })
      }
    }
    
  }
  componentDidUpdate() {
    if(this.state.isWon){
      clearInterval(this.timer)
      //to make sure alert comes after component updated
      setTimeout(() => {
        alert(this.state.isWon)
      }, 10)
    }
  }
  render() {
    const {currentLevel, targets, moves, spentTime} = this.state
    return (
      <div className="app">
        <Header></Header>
        <Levels levels={allLevels} reset={this.reset}></Levels>
        <Game currentLevel={currentLevel} 
              size={allLevels.length}
              move = {this.move}
              targets = {targets}
              reset = {this.reset}
              moves = {moves}
              time = {spentTime}
              playBack = {this.playBack}/>
      </div>
    )
  }
}
