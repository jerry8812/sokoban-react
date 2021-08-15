import React from 'react';
import { useSelector,useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import star from '../assets/images/star.png'

import { setOpen, setCurrentLevel} from '../redux/actions/levelActions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WinDialog = ()=> {
  const {open} = useSelector(state => state.dialog)
  const {levelName, moves} = useSelector(state => state.currentLevel)
  const { grade } = useSelector(state => state.allLevels[levelName-1])
  const width = grade * 35 + 10 * (grade -1)
  const starStyle = {
    width: width + 'px'
  }
  const dispatch = useDispatch()

  const replay = (levelName)=>{
    dispatch(setCurrentLevel(levelName))
    handleClose()
  }

  const handleClose = () => {
    dispatch(setOpen(false))
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="app-dialog">
          <p>Victory</p>
          <p>Win the game!</p>
          <p>Moves: {moves}</p>
          <div className="app-dialog-stars" style={starStyle}>
            {[...Array(grade)].map((e, index) => {
            return (
              <div key={index}>
                <img src={star} alt="images"/>
              </div>
              )
            })}
          </div>
        </div>
        
        <DialogActions>
          <Button onClick={()=>replay(levelName*1)} variant="contained" color="primary">
            Replay
          </Button>
          <Button onClick={()=>replay(levelName*1 +1)} variant="contained" color="primary">
            Next Level
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default WinDialog