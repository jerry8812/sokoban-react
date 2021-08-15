/*
 * @Author: Jerry
 * @Date: 2021-08-10 21:11:57
 * @LastEditTime: 2021-08-13 00:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\actions\levelActions.js
 */
import {ActionTypes} from '../constants/action-types'

export const setCurrentLevel = (levelName) => {
  return {
    type: ActionTypes.SET_CURRENT_LEVEL,
    payload: {levelName: levelName}
  }
}

export const unlockAllLevels = (isLocked) => {
  return {
    type: ActionTypes.UNLOCK_ALL_LEVELS,
    payload: {isLocked: isLocked}
  }
}

export const move = (currentLevel) => {
  return {
    type: ActionTypes.MOVE,
    payload: currentLevel
  }
}

export const unlockLevel = (levelName) => {
  return {
    type: ActionTypes.UNLOCK_LEVEL,
    payload: levelName
  }
}

export const setOpen = (isOpen) => {
  return {
    type: ActionTypes.OPEN_DIALOG,
    payload: isOpen
  }
}

export const setGrade = (levelName, grade) => {
  return {
    type: ActionTypes.SET_GRADE,
    payload: {
      levelName: levelName,
      grade: grade
    }
  }
}