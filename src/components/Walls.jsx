import React, { Component } from 'react'
import wall from "../assets/images/wall.png"

export default class Walls extends Component {

  state = {
    width: document.body.clientWidth
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      width: document.body.clientWidth
    })
  }

  render() {
    const { width } = this.state
    const counts = parseInt(width/35) + 1
    return (
      <div className="app-header-top">
        {[...Array(counts)].map((e, index) => {
          return <div key={index}>
            <img src={wall} alt="images" style={{width: '35px'}}/>
          </div>
        })}
      </div>
    );
  }
}
