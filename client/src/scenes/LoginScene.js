import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { loginUser } from '../actions/appThunk'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    paddingTop: 64,
  },
})

const LoginScene = (props) => {
  const [name, setName] = useState('')
  const classes = useStyles(props)
  const dispatch = useDispatch()

  function onNameChange(event) {
    setName(event.target.value)
  }

  function onLogin() {
    dispatch(loginUser(name))
    // TODO redirect to the poll page
  }

  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        <TextField
          id="login-name"
          label="Name"
          value={name}
          onChange={onNameChange}
          margin="normal"
          fullWidth
        />
        <Button onClick={onLogin}>Login</Button>
      </Grid>
    </Grid>
  )
}

export default LoginScene
