import React, { Component } from 'react'
import wall from "../../assets/images/wall.png"
import box from "../../assets/images/box.png"
import boxOnTarget from "../../assets/images/boxontarget.png"
import empty from "../../assets/images/empty.png"
import player from "../../assets/images/player1.png"
import flag from "../../assets/images/flag11.png"

const entityImageMap = {
  "0": empty,
  "1": wall,
  "2": player,
  "3": flag,
  "4": box,
  "5": boxOnTarget
}

export default class Cell extends Component {
  
  render() {
    const cellSymbol = this.props.cell.toString()
    return (
      <img src={entityImageMap[cellSymbol]} alt="entity" style={{width: '55px', height: '55px', opacity: (cellSymbol === "0")?"0.2":"1"}}/>
    )
  }
}
