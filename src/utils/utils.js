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

export function getPlayerPosition(array) {
  array.forEach((element, positionX)=> {
    element.forEach((cell, positionY) => {
      if(cell === 2) {
        return {"x": positionX, "y": positionY}
      }
    })
  })
}

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