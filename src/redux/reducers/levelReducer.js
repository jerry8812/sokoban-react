/*
 * @Author: your name
 * @Date: 2021-08-10 21:27:45
 * @LastEditTime: 2021-08-13 00:07:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\reducers\levelReducer.js
 */
import {ActionTypes} from '../constants/action-types'
import data from '../../assets/levels.json'
import { deepCopy } from '../../utils/utils'

const initialState = deepCopy(data.levels).map((level, index) => {
  return {
    levelName: level.name, 
    isLocked: index === 0 ? false : true,
    grade: 3,
    isWon: false
  }
})

export const levelsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.UNLOCK_ALL_LEVELS:
      return state.map(level=>({...level, isLocked: payload.isLocked}))
    case ActionTypes.UNLOCK_LEVEL:
      const levelState = state.map(level => {
        if(level.levelName === payload) return {...level, isLocked: false}
        else return level
      })
      return levelState
    case ActionTypes.SET_GRADE:
      const gradeState = state.map(level => {
        if(level.levelName === payload.levelName) return {...level, grade: payload.grade, isWon: true}
        else return level
      })
      return gradeState
    default: 
      return state
  }
}