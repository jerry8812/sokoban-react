import React, { Component } from 'react'
import './App.css'
import Game from './components/Game/Game'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Game/>
      </div>
    )
  }
}
