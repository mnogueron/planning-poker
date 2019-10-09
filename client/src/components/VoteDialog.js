import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

export const pokerCardValue = [ '0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100' ]

const useStyles = makeStyles({
  voteSelect: {
    width: 200,
  },
  menu: {
    width: 200,
  },
})

const VoteDialog = (props) => {
  const { onVote, onClose, onCancel, ...restProps } = props
  const classes = useStyles(props)
  const [value, setValue] = useState('')

  function onVoteValueChange(event) {
    setValue(event.target.value)
  }

  function _onVote(event) {
    onVote && onVote(event, value)
  }

  return (
    <Dialog {...restProps} onClose={onClose}>
      <DialogTitle>Cast new vote</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To cast a new vote, please select the value for your vote.
        </DialogContentText>
        <TextField
          id="select-vote"
          select
          label="Select"
          className={classes.voteSelect}
          value={value}
          onChange={onVoteValueChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {pokerCardValue.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">Cancel</Button>
        <Button onClick={_onVote} color="primary">Cast vote</Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoteDialog
