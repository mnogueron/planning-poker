import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { loginUser } from '../actions/appThunk'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    paddingTop: 64,
  },
  buttonContainer: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'flex-end',
  }
})

const LoginScene = (props) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const classes = useStyles(props)
  const dispatch = useDispatch()
  const history = useHistory()

  function onNameChange(event) {
    setName(event.target.value)
  }

  async function onLogin() {
    if (!name) {
      setError(true)
      return
    }
    await dispatch(loginUser(name))
    history.push('/poll')
  }

  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        <Typography variant="h4" component="h1">Login</Typography>
        <TextField
          id="login-name"
          label="Name"
          value={name}
          onChange={onNameChange}
          margin="normal"
          error={error}
          required
          fullWidth
        />
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={onLogin}>Login</Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default LoginScene
