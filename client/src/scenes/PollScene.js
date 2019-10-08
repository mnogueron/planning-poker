import React, { useEffect } from 'react'
import Poll from '../components/Poll'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPoll } from '../actions/pollThunk'

const useStyles = makeStyles({
  container: {
    paddingTop: 64,
  }
})

const PollScene = (props) => {
  const { match } = props
  const { pollId } = match.params
  const dispatch = useDispatch()
  const classes = useStyles(props)

  function onVote(event, value) {
    // todo handle vote save
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchPoll(pollId))
      } catch(e) {
        // TODO HANDLE 404 error
      }
    }

    fetchData()
  }, [dispatch, pollId])

  // render poll
  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        <Poll
          id={'id'}
          name={'New poll'}
          description={'New poll description'}
          votes={[
            {
              id: '12345',
              value: '1',
              user: {
                name: 'Claude',
              }
            }
          ]}
          onVote={onVote}
          showVote
        />
      </Grid>
    </Grid>
  )
}

export default PollScene
