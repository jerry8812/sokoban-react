import React, { Component } from 'react';
import Walls from './Walls'

export default class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <Walls/>
        <h1>SOKOBAN</h1>
      </div>
    );
  }
}
