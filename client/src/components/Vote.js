import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { ListItemText } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import * as dateFns from 'date-fns'

const useStyles = makeStyles({
  container: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    }
  },
  primaryTextContainer: {
    display: 'flex',
  },
  name: {
    flex: 1,
  },
})

const Vote = (props) => {
  const { value, timestamp, user } = props
  const classes = useStyles(props)
  const { name } = user

  const formattedDate = dateFns.format(timestamp, dateFns.isToday(timestamp) ? 'HH:mm' :'HH:mm - dd/MM/yyyy')

  return (
    <ListItem className={classes.container}>
      <ListItemAvatar>
        <Avatar>{name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={(
          <div className={classes.primaryTextContainer}>
            <div className={classes.name}>{name}</div>
            <Typography variant="body2" color="textSecondary" component="p">
              {formattedDate}
            </Typography>
          </div>
        )}
        secondary={`Voted: ${value}`}
      />
    </ListItem>
  )
}

export default Vote
