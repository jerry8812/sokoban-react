import { useSelector,useDispatch } from 'react-redux';
import { unlockAllLevels, setCurrentLevel } from '../redux/actions/levelActions'

import Button from '@material-ui/core/Button';
import lock from '../assets/images/lock.png';
import star from '../assets/images/star.png';
import star_empty from '../assets/images/star_empty.png';
import box from "../assets/images/box.png"
import player from "../assets/images/player.png"
import flag from "../assets/images/flag.png"

import LockOpenIcon from '@material-ui/icons/LockOpen';

const Levels = () => {
  const allLevels = useSelector(state => state.allLevels)
  const dispatch = useDispatch()

  const levelListing = allLevels.map(level => {
    const { levelName, isLocked, grade, isWon } = level
    const lockedStyle = {
      backgroundColor: 'rgb(20, 89, 146, 0.4)'
    }
    return (
      <div className="app-levels-level"
        key={levelName}
        onClick={()=>changeLevel(level)}
        style={isLocked ? lockedStyle : {}}>
        <p>{level.levelName}</p>
        <div className="app-levels-content-img"
          style={{ display: isLocked ? 'block' : 'none' }}>
          <img src={lock} alt="lock" />
        </div>
        <div className="app-levels-stars" style={{display: (isLocked===false && isWon===false) ? 'none': ''}}>
            {[...Array(grade)].map((e, index) => {
            return (
              <div key={index}>
                <img src={isWon?star:star_empty} alt="images"/>
              </div>
              )
            })}
          </div>
      </div>
    )
  })
  const changeLevel = (level)=> {
    const { levelName, isLocked } = level
    if (!isLocked) {
      dispatch(setCurrentLevel(levelName))
    }
  }
  const unlockLevels = () => {
    dispatch(unlockAllLevels(false))
  }
  return (
    <div className="app-levels">
      <p className="app-levels-selectLevels">Select level</p>
      <div className="app-levels-allLevels">
        {levelListing}
      </div>
      <Button
        variant="contained"
        color="secondary"
        className="app-levels-unlockButton"
        startIcon={<LockOpenIcon />}
        onClick={unlockLevels}>
        Unlock All Levels
      </Button>
      <div className="app-levels-howtoplay">
        <p className="app-levels-selectLevels">How to play</p>
        <div className="app-levels-descriptions">
          <span>Use the arrow keys on keyboard to move </span>
          <img src={player} alt="player"/>
        </div>
        <div className="app-levels-descriptions">
          <span>Push the <img src={box} alt="player"/> into the <img src={flag} alt="player"/> to win</span>
        </div>
      </div>
    </div>
  )
}
export default Levels