import React, { Component } from 'react';
import "./Levels.css"

import star from '../../assets/images/star.png'

export default class Levels extends Component {
  render() {
    const {levels} = this.props
    return (
      <div className="homePage_levels"> 
        {
          levels.map(level => {
            return <div className="homePage_levels_level" 
                        key={level.name}
                        onClick={()=>{this.props.changeLevel(level.name)}}>
              <p>{level.name}</p>
              <div>
                <img src={star} alt="star" />
                <img src={star} alt="star" />
                <img src={star} alt="star" />
              </div>
            </div>
          })
        }
      </div>
    );
  }
}
