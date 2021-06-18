import React, { Component } from 'react'
import wall from "../../assets/images/wall.png"
import box from "../../assets/images/box.png"
import boxOnTarget from "../../assets/images/boxontarget.png"
import empty from "../../assets/images/empty.jpg"
import player from "../../assets/images/player.png"
import flag from "../../assets/images/flag.png"


export default class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cellSymbol: this.props.cell,
      images: [empty, wall, player, flag, box, boxOnTarget]
    }
  }
  

  render() {
    const {images, cellSymbol} = this.state
    return (
      <img src={images[cellSymbol]} alt="entity"/>
    )
  }
}
