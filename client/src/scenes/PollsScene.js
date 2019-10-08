import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Poll from '../components/Poll'

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
  const polls = [
    {
      id: 'poll1',
      name: 'Poll 1',
      description: 'Description 1',
      votes: [],
    },
    {
      id: 'poll2',
      name: 'Poll 2',
      description: 'Description 2',
      votes: [{
        id: '12345',
        value: 2,
        user: {
          name: 'Jean-Charles',
        }
      }],
    }
  ]

  useEffect(() => {
    // TODO Load all polls
  }, [])

  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item xs={12} sm={8} md={4}>
        {
          polls.map(({ id, name, description, votes }) => (
            <Poll
              key={id}
              id={id}
              name={name}
              description={description}
              votes={votes}
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
