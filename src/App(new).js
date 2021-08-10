/*
 * @Author: your name
 * @Date: 2021-08-10 22:32:10
 * @LastEditTime: 2021-08-10 22:38:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\App.js
 */

import React, {Component} from 'react'

import Header from './containers/Header'
import Game from './containers/Game'
import Levels from './containers/Levels'

import './assets/css/app.css'

export default class App extends Component {
  render() {
    return (
      <div className="mainBody">
        <div className="app">
          <Header/>
          <Levels/>
          <Game/>
        </div>
      </div>
    )
  }
}