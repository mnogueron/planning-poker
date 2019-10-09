import React, { useState, useEffect } from 'react'
import Poll from '../components/Poll'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { castVote, fetchPoll } from '../actions/dataThunk'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()

  const poll = useSelector(state => state.data.polls[pollId])
  const votes = useSelector(state => {
    if (!poll) {
      return []
    }

    return Object.values(state.data.votes)
      .filter(vote => vote.pollId === pollId)
      .sort((a, b) => b.timestamp - a.timestamp)
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
        history.replace('/notfound')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch, pollId, history])

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
              timestamp={poll.timestamp}
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
