import {ActionTypes} from '../constants/action-types'
import data from '../../assets/levels.json'
import { deepCopy, getAllTargets } from '../../utils/utils'

const initCurrentLevel = (levelName)=> {
  const currentLevel = deepCopy(data.levels[levelName-1])
  return {
    levelName: currentLevel.name,
    gameMap: currentLevel.gameMap,
    player: currentLevel.player,
    width: currentLevel.width,
    height: currentLevel.height,
    targets: getAllTargets(currentLevel.gameMap),
    moves: 0,
    history: []
  }
}

export const gameReducer = (state=initCurrentLevel(1), {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_LEVEL:
      return {...state, ...initCurrentLevel(payload.levelName)};
    case ActionTypes.MOVE:
      return {...state, ...payload}
    default:
      return state;
  }
}

