/*
 * @Author: your name
 * @Date: 2021-07-07 10:26:43
 * @LastEditTime: 2021-08-12 22:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-project\sokoban_react\src\utils\utils.js
 */
export const deepCopy = newData => JSON.parse(JSON.stringify(newData))

export function getAllTargets(array) {
  const newArray = []
  array.forEach((element, x)=> {
    element.forEach((cell, y) => {
      if(cell === 3) {
        newArray.push([x, y])
      }
    })
  })
  return newArray
}

export function grade(targets,count,levelName) {
  const baseCount = levelName + targets
  if(count < baseCount * 20) return 3
  else if(count >= baseCount * 20 && count < baseCount * 30) return 2
  else if(count >= baseCount * 30) return 1
  else return 3
}

/* export function getPlayerPosition(array) {
  array.forEach((element, positionX)=> {
    element.forEach((cell, positionY) => {
      if(cell === 2) {
        return {"x": positionX, "y": positionY}
      }
    })
  })
} */

export function getNumbersOfObject(array, object) {
  return array.flat().reduce((preValue, currValue) => currValue === object ? ++preValue: preValue, 0)
}

export function formatTime(t=0) {
  const second = appendZero(t%60)
  const min = appendZero(Number.parseInt(t/60))
  return `${min}:${second}`
}

const appendZero = ((n) => {
  return n.toLocaleString({}, {minimumIntegerDigits: 2})
})

