import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  }
})

const Navbar = (props) => {
  const classes = useStyles(props)
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Planning poker
        </Typography>
        <Button color="inherit">Create poll</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
