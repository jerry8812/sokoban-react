/*
 * @Author: your name
 * @Date: 2021-07-10 23:04:36
 * @LastEditTime: 2021-08-10 21:43:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\redux\store.js
 */
import { createStore } from 'redux'

import reducers from './reducers/index'

const store = createStore(
  reducers, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store