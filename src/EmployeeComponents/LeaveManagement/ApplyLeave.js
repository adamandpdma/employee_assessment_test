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



export default class ApplyLeave extends Component {

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
      clientCompany: this.props.location.clientCompany,
      managerEmail: this.props.location.managerEmail,
      managerName: this.props.location.managerName,
      empID: this.props.location.empID,
      empName: this.props.location.empName
    }
  }
  

  handleChange = (date) => {
    this.setState({
      selectedDate: date,
    }, () => {
      console.log(this.state.selectedDate)
    },)  
  }; 
  handleChangeTwo = (date) => {
    this.setState({
      selectedDateTwo: date,
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
            dateFrom: this.state.selectedDate.toString().split(" ")[2]+ " " + this.state.selectedDate.toString().split(" ")[1]+ " " +
            this.state.selectedDate.toString().split(" ")[3],
            dateTill: this.state.selectedDateTwo.toString().split(" ")[2]+ " " +
            this.state.selectedDateTwo.toString().split(" ")[1]+" " +this.state.selectedDateTwo.toString().split(" ")[3],
            empName: this.state.empName,
            employeeId: parseInt(this.state.empID),
            hidden: true,
            leaveId: 0,
            managerEmail: this.state.managerEmail,
            managerName: this.state.managerName,
            noOfDays: parseInt(this.state.noOfDays),
            password: "string",
            reason: this.state.reason
       } 
       console.log(values)
       axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/leave/submit", values)
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
  <p>NO OF DAYS</p>
      <Grid container justify="space-around">
             <TextField
               input type = "number"
               variant="outlined"
               margin="normal"
               fullWidth
               onChange={this.noOfDaysHandler}
               />
               <div style={{"color": "red"}}>{this.state.noOfDaysErorr}</div>
      </Grid>
      <p>FROM DATE</p>
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
      <p>TO DATE</p>
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
      <p>REASON</p>
      <Grid container justify="space-around">
             <TextField
               input type = "text"
               variant="outlined"
               margin="normal"
               fullWidth
               multiline={true}
               onChange={this.reasonHandler}
               />
      </Grid>
      <div style={{"color": "red"}}>{this.state.reasonErorr}</div>
    </MuiPickersUtilsProvider>
    <Grid container justify="space-around">
    <Button 
    variant="contained" 
    style={{ "backgroundColor": "#648fcc", "color": "white"}}
    onClick={this.onSubmitHandler}>
        SUBMIT</Button>
    </Grid>
    <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Successfully submitted your Leave Application!!"}</DialogTitle>

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


