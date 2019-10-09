import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import VoteDialog from './VoteDialog'
import * as dateFns from 'date-fns'
import VoteChart from './VoteChart'

const today = new Date()

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  description: {
    whiteSpace: 'pre-wrap',
  },
  voteContainer: {
    paddingTop: theme.spacing(4)
  },
  actionsContainer: {
    justifyContent: 'flex-end',
  },
  voteSelect: {
    width: 200,
  },
  menu: {
    width: 200,
  },
}))

const Poll = (props) => {
  const { className, id, name, description, votes = [], timestamp, showSeeMore, showVote, onVote } = props
  const [voteDialogOpen, setVoteDialogOpen] = useState(false)
  const classes = useStyles(props)

  function openVoteDialog() {
    setVoteDialogOpen(true)
  }

  function closeVoteDialog() {
    setVoteDialogOpen(false)
  }

  function _onVote(event, value) {
    closeVoteDialog()
    onVote && onVote(event, value)
  }

  const formattedDate = dateFns.format(timestamp, dateFns.isSameDay(timestamp, today) ? 'HH:mm' :'HH:mm - dd/MM/yyyy')

  return (
    <Card className={className}>
      <CardContent>
        <div className={classes.titleContainer}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
            {name}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {formattedDate}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
          {description}
        </Typography>

        {
          votes && votes.length > 0 && (
            <div className={classes.voteContainer}>
              <Typography variant="body1" component="h3">
                Votes
              </Typography>

              <VoteChart
                votes={votes}
              />

              <List>
                {
                  votes.map(({ id, value, user }) => (
                    <Vote
                      key={id}
                      value={value}
                      user={user}
                    />
                  ))
                }
              </List>
            </div>
          )
        }
      </CardContent>
      {
        showSeeMore && (
          <CardActions classes={{ root: classes.actionsContainer }}>
            <Button component={Link} to={`/poll/${id}`} color="primary">See more</Button>
          </CardActions>
        )
      }
      {
        showVote && (
          <CardActions classes={{ root: classes.actionsContainer }}>
            <Button onClick={openVoteDialog} color="primary">Vote</Button>
          </CardActions>
        )
      }

      <VoteDialog
        open={voteDialogOpen}
        onClose={closeVoteDialog}
        onCancel={closeVoteDialog}
        onVote={_onVote}
      />
    </Card>
  )
}

export default Poll
