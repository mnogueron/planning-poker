import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

const PollForm = (props) => {
  const { onSave, onClose, onCancel, ...restProps } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function onNameChange(event) {
    setName(event.target.value)
  }

  function onDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function _onSave(event) {
    onSave && onSave(event, name, description)
  }

  return (
    <Dialog {...restProps} onClose={onClose}>
      <DialogTitle>Create new poll</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new poll, fill in the required attributes below.
        </DialogContentText>
        <TextField
          id="poll-name"
          label="Name"
          value={name}
          onChange={onNameChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="poll-description"
          label="Description"
          value={description}
          onChange={onDescriptionChange}
          margin="normal"
          multiline
          rowsMax="4"
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">Cancel</Button>
        <Button onClick={_onSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PollForm
