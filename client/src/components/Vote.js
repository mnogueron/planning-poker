import React from 'react'
import { makeStyles } from '@material-ui/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { ListItemText } from '@material-ui/core'

const useStyles = makeStyles({

})

const Vote = (props) => {
  const { value, user } = props
  const { name } = user
  const classes = useStyles(props)
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Voted: ${value}`}
      />
    </ListItem>
  )
}

export default Vote
