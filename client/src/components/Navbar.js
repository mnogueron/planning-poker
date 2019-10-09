import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PollForm from './PollForm'
import { useDispatch } from 'react-redux'
import { createPoll } from '../actions/appThunk'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  }
})

const Navbar = (props) => {
  const classes = useStyles(props)
  const [formOpen, setFormOpen] = useState(false)
  const dispatch = useDispatch()

  function openPollForm() {
    setFormOpen(true)
  }

  function closePollForm() {
    setFormOpen(false)
  }

  function onCreatePoll(e, name, description) {
    dispatch(createPoll(name, description))
    closePollForm()
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Planning poker
          </Typography>
          <Button color="inherit" onClick={openPollForm}>Create poll</Button>
        </Toolbar>
      </AppBar>

      <PollForm
        open={formOpen}
        onClose={closePollForm}
        onCancel={closePollForm}
        onSave={onCreatePoll}
      />
    </React.Fragment>
  )
}

export default Navbar
