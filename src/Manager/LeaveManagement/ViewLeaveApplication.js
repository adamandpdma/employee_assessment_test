import 'date-fns';
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Container from '@material-ui/core/Container';
import { TextField, Button} from '@material-ui/core';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom'


export default class ViewSubmittedLeaveApplications extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedDate: '',
      selectedDateTwo : '',
      reason: '',
      open: false,
      noOfDays: 0,
      clientCompany: '',
      managerEmail: '',
      managerName: '',
      empID: 0,
      empName: '',
      leave: [],
      leaveId: 0,
      approveStatus: false,
      comment: '',
      openApproved: false,
      openRejected: false,
    }
  }
  
  componentDidMount = () => {
      axios.get("http://192.168.200.200:8080/backendapitest/manager/leave/"+this.props.location.leaveId+"")
      .then(
          res => {
              this.setState(
                  {
                      leave: res.data,
                      noOfDays: res.data.noOfDays,
                      selectedDate: res.data.dateFrom,
                      selectedDateTwo: res.data.dateTill,
                      reason: res.data.reason,
                      clientCompany: res.data.company,
                      managerEmail: res.data.managerEmail,
                      managerName: res.data.managerName,
                      empID: res.data.employeeId,
                      empName: res.data.empName,
                      leaveId: res.data.leaveId

                  }
              )
          }
      )
  }

  approveHandler = () => {
    this.setState(
        {
            approveStatus: true
        }, () => {
            const values = [
                this.state.approveStatus,
                this.state.comment
            ]

            axios.post("http://192.168.200.200:8080/backendapitest/manager/leave/"+this.props.location.leaveId+"/approve", values)
            .then(res=> console.log(res.data))
            .then(this.openApprovedHandler())
        }
    )   
}
openApprovedHandler = () => {

    this.setState(
        {
            openApproved: true
        }
    )

}
openRejectedHandler = () => {

    this.setState(
        {
            openRejected: true
        }
    )

}
rejectReason = () => 
{
this.setState(
    {
        open: true
    }
)
}
commentHandler = (event) => 
{
this.setState(
    {
        comment: event.target.value
    }
)
}
rejectHandler = () => {
console.log(this.state.comment)
this.setState(
    {
        open: false,
        approveStatus: false
    }, () => {
        const values = [
            this.state.approveStatus,
            this.state.comment
        ]

        axios.post("http://192.168.200.200:8080/backendapitest/manager/leave/"+this.props.location.leaveId+"/approve", values)
        .then(res=> console.log(res.data))
        .then(this.openRejectedHandler())
    }
)

}
render()
{
  return (
    <div>
                    <Container     
            component="main" 
            maxWidth="sm"
            style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>

  <MuiPickersUtilsProvider utils={DateFnsUtils}> 
  <h4 style={{'textAlign': "center"}}>VIEW LEAVE APPLICATION</h4>
  <b><p>NO OF DAYS</p></b>
      <Grid container justify="space-around">
             <TextField
               input type = "number"
               variant="outlined"
               margin="normal"
               fullWidth
               value={this.state.noOfDays}
               />
      </Grid>
      <b><p>FROM DATE</p></b>
      <Grid container justify="space-around">   
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.selectedDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <b><p>TO DATE</p></b>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.selectedDateTwo}
          KeyboardButtonProps={{
            'aria-label': 'change date'      
          }}
        />
      </Grid>
      <b><p>REASON</p></b>
      <Grid container justify="space-around">
             <TextField
               input type = "text"
               variant="outlined"
               margin="normal"
               fullWidth
               multiline={true}
               value={this.state.reason}
               />
      </Grid>
    </MuiPickersUtilsProvider>
    <Grid container justify="space-around">
                   <Button variant="contained"
                   style={{"width":"200px", "margin": "30px",
                   "backgroundColor": "#118f41", "color": "white"}}
                   onClick={this.approveHandler}>APPROVE</Button>

                  <Button variant="contained"
                  style={{"width":"200px", "margin": "30px",
                  "backgroundColor": "#de0220",
                  "color": "white"}}
                  onClick={this.rejectReason}>REJECT</Button>
    </Grid>

    <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"State the reason to reject the timesheet"}</DialogTitle>

              <DialogActions>
              <TextField
                   input type = "text"
                   variant="outlined"
                   margin="normal"
                   multiline={true}
                   value={this.state.comment}
                   onChange={this.commentHandler}
                   fullWidth
                     /><br/>
              <Button variant="contained"
              onClick={this.rejectHandler}>OKAY</Button>
              </DialogActions>
              </Dialog>

              <Dialog
             open={this.state.openApproved}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Approved Successfully!"}</DialogTitle>

              <DialogActions>
               
               <NavLink to='/'
               style={{"textDecoration": "none"}}>
              <Button variant="contained"
              >OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>

              <Dialog
             open={this.state.openRejected}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Rejected Successfully!"}</DialogTitle>

              <DialogActions>
               
               <NavLink to='/'
               style={{"textDecoration": "none"}}>
              <Button variant="contained"
              >OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>
    </Container>
    </div>
  
  );
}
}


