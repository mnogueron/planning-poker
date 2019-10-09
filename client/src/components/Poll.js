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
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
  expandedPanel: {
    margin: '0!important',
  },
  voteContainer: {
    paddingTop: theme.spacing(4)
  },
  voteList: {
    width: '100%',
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
  const [votePanelExpanded, setVotePanelExpanded] = useState(false)
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

  function handleVotePanelChange(event, isExpanded) {
    setVotePanelExpanded(isExpanded)
  }

  const formattedDate = dateFns.format(timestamp, dateFns.isToday(timestamp) ? 'HH:mm' :'HH:mm - dd/MM/yyyy')

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

              <ExpansionPanel classes={{ expanded: classes.expandedPanel }} expanded={votePanelExpanded} onChange={handleVotePanelChange}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="vote-panel-header"
                >
                  <Typography>See all votes</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List className={classes.voteList}>
                    {
                      votes.map(({ id, value, timestamp, user }) => (
                        <Vote
                          key={id}
                          value={value}
                          user={user}
                          timestamp={timestamp}
                        />
                      ))
                    }
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
