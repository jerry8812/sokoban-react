import React, { Component } from 'react'
import './App.css'
import data from "./assets/levels.json"
import Game from './components/Game/Game'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Game currentLevel={data.levels[0]}/>
      </div>
    )
  }
}
