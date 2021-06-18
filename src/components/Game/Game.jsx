import React, { Component } from 'react'
import data from "../../assets/levels.json"
import Cell from "../Cell/Cell"
import "./Game.css"

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levelName: data.levels[0].name,
      mapWidth: data.levels[0].width,
      mapHeight: data.levels[0].height,
      gameMap: data.levels[0].gameMap
    }
  }
  render() {
    const { mapWidth, mapHeight, gameMap} = this.state
    return (
      <div className="gameBoard" 
           style={{gridTemplateColumns: 'repeat('+ mapWidth +', 50px)', gridTemplateRows: 'repeat('+ mapHeight +', 50px)'}}>
        {
          gameMap.map((row) => {
            return row.map((cell, index) => {
              return <Cell key={index} cell={cell}/>
            })
          })
        }
      </div>
    )
  }
}
