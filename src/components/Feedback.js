import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import FeedbackApi from '../api/FeedbackApi';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: ''
    }

    this.handleFeedbackChanged = this.handleFeedbackChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    
    this.FeedbackApi = new FeedbackApi();
  }

  async handleFeedbackChanged(event) {
    this.setState({ feedback: event.target.value });
  }

  async handleSubmit() {
    await this.FeedbackApi.SubmitFeedback(this.state.feedback);
    this.props.close();
  }

  async handleCancel() {
    this.props.close();
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.handleCancel} maxWidth="sm" fullWidth={true}>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogContent>
            <TextField value={this.state.feedback} onChange={this.handleFeedbackChanged} 
              autoFocus multiline fullWidth={true} rows={10} variant="outlined" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

export default Feedback;