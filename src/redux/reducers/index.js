/*
 * @Author: your name
 * @Date: 2021-08-10 21:18:16
 * @LastEditTime: 2021-08-11 01:21:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\reducers\index.js
 */
import {combineReducers} from 'redux'
import {levelsReducer} from './levelReducer'

const reducers = combineReducers({
  setLevel: levelsReducer
})

export default reducers