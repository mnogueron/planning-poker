import React, { useState, useEffect } from 'react'
import Poll from '../components/Poll'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { castVote, fetchPoll } from '../actions/appThunk'

const useStyles = makeStyles({
  container: {
    paddingTop: 64,
  }
})

const PollScene = (props) => {
  const { match } = props
  const { pollId } = match.params
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles(props)

  const poll = useSelector(state => state.app.polls[pollId])
  const votes = useSelector(state => {
    if (!poll) {
      return []
    }

    return Object.values(state.app.votes).filter(vote => vote.pollId === pollId)
  })

  function onVote(event, value) {
    dispatch(castVote(pollId, value))
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        await dispatch(fetchPoll(pollId))
      } catch(e) {
        // TODO HANDLE 404 error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch, pollId])

  // render poll
  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        {
          !loading && poll && (
            <Poll
              id={poll.id}
              name={poll.name}
              description={poll.description}
              votes={votes}
              onVote={onVote}
              showVote
            />
          )
        }
      </Grid>
    </Grid>
  )
}

export default PollScene
