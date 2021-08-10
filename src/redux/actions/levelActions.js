/*
 * @Author: Jerry
 * @Date: 2021-08-10 21:11:57
 * @LastEditTime: 2021-08-10 21:27:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\actions\levelActions.js
 */
import {ActionTypes} from '../constants/action-types'

export const setCurrentLevel = (levelName) => {
  return {
    type: ActionTypes.SET_CURRENT_LEVEL,
    payload: levelName
  }
}
