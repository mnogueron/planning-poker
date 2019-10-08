import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Vote from './Vote'

const Poll = (props) => {
  const { name, description, votes = [] } = props
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>

        <List>
          {
            votes.map(({ value, user }) => (
              <Vote
                value={value}
                user={user}
              />
            ))
          }
        </List>
      </CardContent>
    </Card>
  )
}

export default Poll
