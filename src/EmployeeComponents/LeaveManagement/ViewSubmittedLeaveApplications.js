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
      leaveId: 0
    }
  }
  
  componentDidMount = () => {
      axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/leave/"+this.props.location.leaveId+"")
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
    <NavLink to='/employee/viewLeaveApplication' style={{"textDecoration": "none"}}><Button 
    variant="contained" 
    style={{ "backgroundColor": "#648fcc", "color": "white", "margin": "30px"}}
   >
        BACK</Button></NavLink>
    </Grid>
    </Container>
    </div>
  
  );
}
}


