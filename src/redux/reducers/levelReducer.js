/*
 * @Author: your name
 * @Date: 2021-08-10 21:27:45
 * @LastEditTime: 2021-08-11 01:22:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\reducers\levelReducer.js
 */
import {ActionTypes} from '../constants/action-types'

const data = require('../../assets/levels.json')

const initialState = {
  allLevels: data.levels,
  currentLevel: data.levels[0]
}

export const levelsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_LEVEL:
      return data.levels[payload]
    default: 
      return state
  }
}

/* export const currentLevelReducer = (state={}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_LEVEL:
      return data.levels[payload]
  }
} */