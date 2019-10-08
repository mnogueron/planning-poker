import React, { useEffect } from 'react'
import Poll from '../components/Poll'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  container: {
    paddingTop: 64,
  }
})

const PollScene = (props) => {
  const { match } = props
  const { pollId } = match.params
  const classes = useStyles(props)

  useEffect(() => {
    // TODO load poll based on pollId
  }, [pollId])

  // render poll
  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        <Poll
          name={'New poll'}
          description={'New poll description'}
          votes={[
            {
              value: '1',
              user: {
                name: 'Claude',
              }
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default PollScene
