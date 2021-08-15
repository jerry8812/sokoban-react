import {ActionTypes} from '../constants/action-types'

const initState = {
  open: false
}
export const dialogReducer = (state=initState, {type, payload}) => {
  switch (type) {
    case ActionTypes.OPEN_DIALOG:
      return {...state, open: payload}
    default:
      return state;
  }
}

