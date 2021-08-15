import React, {Component} from 'react'

import Header from './components/Header'
import Game from './containers/Game'
import Levels from './containers/Levels'
import Footer from './components/Footer'
import WinDialog from './containers/WinDialog'


import './assets/css/app.css'

export default class App extends Component {
  render() {
    return (
      <div className="mainBody">
        <div className="app">
          <Header/>
          <Levels/>
          <Game/>
          <Footer/>
          <WinDialog/>
        </div>
      </div>
    )
  }
}