import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Poll from '../components/Poll'
import { fetchPolls } from '../actions/appThunk'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 64,
  },
  pollContainer: {
    marginBottom: theme.spacing(4),
  }
}))

const PollsScene = (props) => {
  const classes = useStyles(props)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const polls = useSelector(state => Object.values(state.app.polls))

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        await dispatch(fetchPolls())
      } catch (e) {
        // TODO handle error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        {
          polls.map(({ id, name, description }) => (
            <Poll
              key={id}
              id={id}
              name={name}
              description={description}
              className={classes.pollContainer}
              showSeeMore
            />
          ))
        }
      </Grid>
    </Grid>
  )
}

export default PollsScene
