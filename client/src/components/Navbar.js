import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import PollForm from './PollForm'
import { useDispatch, useSelector } from 'react-redux'
import { createPoll } from '../actions/dataThunk'
import { useHistory } from 'react-router-dom'
import { logout } from '../actions/appActions'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  }
})

const Navbar = (props) => {
  const classes = useStyles(props)
  const [formOpen, setFormOpen] = useState(false)
  const dispatch = useDispatch()
  const isLogged = useSelector(state => Boolean(state.app.user))
  const history = useHistory()

  function openPollForm() {
    setFormOpen(true)
  }

  function closePollForm() {
    setFormOpen(false)
  }

  function goToHome() {
    history.push(`/poll`)
  }

  function _logout() {
    dispatch(logout())
  }

  async function onCreatePoll(e, name, description) {
    const poll = await dispatch(createPoll(name, description))
    closePollForm()
    history.push(`/poll/${poll.id}`)
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={goToHome}>
            Planning poker
          </Typography>
          {
            isLogged && (
              <React.Fragment>
                <Button color="inherit" onClick={openPollForm}>Create poll</Button>
                <Button color="inherit" onClick={_logout}>Logout</Button>
              </React.Fragment>
            )
          }
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
