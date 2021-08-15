/*
 * @Author: your name
 * @Date: 2021-08-10 21:18:16
 * @LastEditTime: 2021-08-12 23:27:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\reducers\index.js
 */
import { combineReducers } from 'redux'
import { levelsReducer } from './levelReducer'
import { gameReducer } from './gameReducer'
import { dialogReducer } from './dialogReducer'

const reducers = combineReducers({
  allLevels: levelsReducer,
  currentLevel: gameReducer,
  dialog: dialogReducer
})

export default reducers