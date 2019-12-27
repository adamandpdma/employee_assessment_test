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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


// CODE WRITTEN BY - FAHEMA

export default class EditLeaveApplication extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedDate: '',
      selectedDateErorr: '',
      selectedDateTwo : '',
      selectedDateTwoErorr: '',
      reason: '',
      reasonErorr: '',
      open: false,
      noOfDays: 0,
      noOfDaysErorr: '',
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

  handleChange = (date) => {
    this.setState({
      selectedDate: date.toString().split(" ")[2]+ " " +  date.toString().split(" ")[1]+" " + date.toString().split(" ")[3] ,
    }, () => {
      console.log(this.state.selectedDate)
    },)  
  }; 
  handleChangeTwo = (date) => {
    this.setState({
      selectedDateTwo: date.toString().split(" ")[2]+ " " +  date.toString().split(" ")[1]+" " + date.toString().split(" ")[3] ,
    }, () => {
      console.log(this.state.selectedDateTwo)
    },)  
  }
  reasonHandler = (event) => {
      this.setState(
          {
              reason: event.target.value
          }
      )
  }
  noOfDaysHandler = (event) => {
      this.setState(
          {
              noOfDays: event.target.value
          }
      )
  }
  validate = () => {
    let isError = false;
    const errors ={};

    if(this.state.selectedDate === ''){
        isError = true;
        errors.selectedDateErorr= " ";
    }
    if(this.state.selectedDateTwo === ''){
        isError = true;
        errors.selectedDateTwoErorr= " ";
    }
    if(this.state.reason === '')
    {
        isError = true;
        errors.reasonErorr ="Enter the reason!"
    }
    if(this.state.reason.match("^[A-z 0-9]+$" ))
    {
        errors.reasonErorr =""
    }
    if(this.state.noOfDays === 0){
        isError = true;
        errors.noOfDaysErorr= " Enter the number of days";
    }

    if(isError){
        this.setState(
            {
                ...this.state,
                ...errors
            });
    }

    return isError;
  }
  onSubmitHandler = (event) => {
    event.preventDefault();

    const err = this.validate();
    if(!err)
    {
       const values = {
            approved: true,
            company: this.state.clientCompany,
            dateFrom: this.state.selectedDate,
            dateTill: this.state.selectedDateTwo,
            empName: this.state.empName,
            employeeId: parseInt(this.state.empID),
            hidden: true,
            leaveId: this.props.location.leaveId,
            managerEmail: this.state.managerEmail,
            managerName: this.state.managerName,
            noOfDays: parseInt(this.state.noOfDays),
            password: "string",
            reason: this.state.reason
       } 
       console.log(values)
       axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/leave/"+this.state.leaveId+"/edit", values)
       .then(res => console.log(res.data))
       .then(
        this.setState(
            {
              open: true
            }
          )
       )
    }
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
  <h4 style={{'textAlign': "center"}}>EDIT LEAVE APPLICATION</h4>
  <b><p>NO OF DAYS</p></b>
      <Grid container justify="space-around">
             <TextField
               input type = "number"
               variant="outlined"
               margin="normal"
               fullWidth
               onChange={this.noOfDaysHandler}
               value={this.state.noOfDays}
               />
               <div style={{"color": "red"}}>{this.state.noOfDaysErorr}</div>
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
          onChange={(date) => this.handleChange( date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <div style={{"color": "red"}}>{this.state.selectedDateErorr}</div>
      <b><p>TO DATE</p></b>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.selectedDateTwo}
          onChange={(date) => this.handleChangeTwo( date)}
          KeyboardButtonProps={{
            'aria-label': 'change date'      
          }}
        />
      </Grid>
      <div style={{"color": "red"}}>{this.state.selectedDateTwoErorr}</div>
      <b><p>REASON</p></b>
      <Grid container justify="space-around">
             <TextField
               input type = "text"
               variant="outlined"
               margin="normal"
               fullWidth
               multiline={true}
               value={this.state.reason}
               onChange={this.reasonHandler}
               />
      </Grid>
      <div style={{"color": "red"}}>{this.state.reasonErorr}</div>
    </MuiPickersUtilsProvider>
    <Grid container justify="space-around">
    <Button 
    variant="contained" 
    style={{ "backgroundColor": "#648fcc", "color": "white", "margin": "30px"}}
    onClick={this.onSubmitHandler}>
        SAVE CHANGES</Button>         
        <NavLink to='/employee/viewLeaveApplication' style={{"textDecoration": "none"}}><Button 
    variant="contained" 
    style={{ "backgroundColor": "#648fcc", "color": "white", "margin": "30px"}}
   >
        BACK</Button></NavLink>
    </Grid>
    <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Successfully saved changes and submitted your Leave Application!!"}</DialogTitle>

              <DialogActions>
                  <NavLink to='/employee/DashBoardEmployee'
                  style={{"textDecoration": "none"}}>
              <Button variant="contained">OKAY</Button></NavLink> 
    
              </DialogActions>
              </Dialog>
    </Container>
    </div>
  
  );
}
}


