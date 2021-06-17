import React, { Component } from 'react'
import data from "../../assets/levels.json"
import wall from "../../assets/images/wall.png"
import "./Game.css"

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levels: data.levels[0]
    }
  }
  render() {
    const { levels } = this.state
    return (
      <div className="gameBoard">
        {
          levels.gameMap.map((row, index) => {
            return <div key={index}>
              {row.map((cell, index) => {
                return <div key={index}>
                  <img src={wall} alt="wall" />
                </div>
              })}
            </div>
          })
        }
      </div>
    )
  }
}
