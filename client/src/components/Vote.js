import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { ListItemText } from '@material-ui/core'

const Vote = (props) => {
  const { value, user } = props
  const { name } = user
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={`Voted: ${value}`}
      />
    </ListItem>
  )
}

export default Vote
