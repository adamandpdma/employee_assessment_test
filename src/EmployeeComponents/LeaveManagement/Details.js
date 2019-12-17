import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }
  const anchor = {
    color: "grey"
  }

class Details extends Component{

constructor(props) {
  super(props);
  this.state = {
    empID : localStorage.getItem('employeeid'),
    empName : localStorage.getItem('name'),
    managerEmail : '',
    managerEmailErorr: '',
    managerName : '',
    managerNameErorr: '',
    clientCompany : '',
    clientCompanyErorr: '',
    open: false
  }
}

handleDateChange = date => {
  this.setState(
    {
      selectedDate: date,
    }
  )
};
  employeeIDHandler = (event) => {
      this.setState({
        empID : event.target.value
      })
  }
  employeeNameHandler = (event) => {
    this.setState(
      {
        empName : event.target.value
      }
    )
  }
  managerEmailHandler = (event) => {
    this.setState(
      {
        managerEmail : event.target.value
      }
    )
  }
  managerNameHandler = (event) => {
    this.setState(
      {
        managerName : event.target.value
      }
    )
  }
  clientCompanyHandler = (event) => 
  {
    this.setState(
      {
        clientCompany : event.target.value
      }
    )
 
  }
  
  validate = () => {
console.log(this.state.selectedDate)
    let isError = false;
    const errors ={};
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  
    if(this.state.clientCompany === '')
    {
      isError = true;
      errors.clientCompanyErorr = "Enter Client company!"
    }
    if(this.state.clientCompany.match("^[A-z 0-9]+$" ))
    {
      errors.clientCompanyErorr = ""
    }
    if(this.state.managerName === '')
    {
      isError = true;
      errors.managerNameErorr = "Enter Manager Name!"
    }
    if(this.state.managerName.match("^[A-z 0-9]+$" ))
    {
      errors.managerNameErorr = ""
    }
    if(this.state.managerEmail === '')
    {
      isError = true;
      errors.managerEmailErorr = "Enter Manager Email!"
    }
    if(this.state.managerEmail.match("^[A-z 0-9]+$" ))
    {
      isError = true;
      errors.managerEmailErorr = "Enter a Valid email address!"
    }
    if(this.state.managerEmail.match(re))
    {
      errors.managerEmailErorr = ""
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
submitValidation = (event) =>
{
   event.preventDefault();

   const err = this.validate();
   if(!err)
   {
     this.setState(
       {
         open: true
       }
     )
   }
}
  
    render()
    {
        return(
            <div>
                 <Grid item xs={12}>
              <Paper style={paper}>Self-Assessment / <a style={anchor}>Leave Application</a></Paper>   
            </Grid>

            <Container     
            component="main" 
            maxWidth="sm"
            style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>
             <div>
              <p>Employee ID</p>
              <Grid item xs={6}>
        <TextField
        input type = "number"
        variant="outlined"
        margin="normal"
        value= {localStorage.getItem('employeeid')}
        // onChange={this.employeeIDHandler}
        fullWidth
      />
        </Grid>
             </div>
             <div>
              <p>Employee Name</p>
              <Grid item xs={6}>
        <TextField
        input type = "text"
        variant="outlined"
        margin="normal"
        value ={localStorage.getItem('name')}
        // onChange={this.employeeNameHandler}
        fullWidth
      />
        </Grid>
             </div>
             <div>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{"color": "red"}}>{this.state.selectedDateErorr}</div>
    </MuiPickersUtilsProvider>
             </div>
             <div>
              <p>Manager Email</p>
              <Grid item xs={6}>
        <TextField
        input type = "text"
        variant="outlined"
        margin="normal"
        onChange={this.managerEmailHandler}
        fullWidth
      />
        </Grid>
        <div style={{"color": "red"}}>{this.state.managerEmailErorr}</div>
             </div>
             <div>
              <p>Manager Name</p>
              <Grid item xs={6}>
        <TextField
        input type = "text"
        variant="outlined"
        margin="normal"
        onChange={this.managerNameHandler}
        fullWidth
      />
        </Grid>
        <div style={{"color": "red"}}>{this.state.managerNameErorr}</div>
             </div>
             <div>
              <p>Client Company</p>
              <Grid item xs={6}>
        <TextField
        input type = "text"
        variant="outlined"
        margin="normal"
        onChange={this.clientCompanyHandler}
        fullWidth
      />
        </Grid>
        <div style={{"color": "red"}}>{this.state.clientCompanyErorr}</div>
             </div>
             <div>
         
               <Button
                variant="contained"
                style={{"backgroundColor": "#3868b5", "color": "white",
                "marginLeft": "auto", "marginRight": "auto", "display": "block", "marginTop": "15px", 
                "marginBottom": "15px"}}
                onClick={this.submitValidation}>
                PROCEED
                </Button>
             </div>
             <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Successfully submitted the details. proceed further!!"}</DialogTitle>

              <DialogActions>
              <NavLink to={{ 
               pathname:'/employee/applyLeave',
               empID : this.state.empID,
               empName : this.state.empName,
               managerEmail : this.state.managerEmail,
               managerName : this.state.managerName,
               clientCompany : this.state.clientCompany,
             }}
               style={{color: 'white', textDecoration: 'none'}}
               activeStyle={{color: 'white', textDecoration: 'none'}}> 
              <Button variant="contained">PROCEED</Button></NavLink>
              </DialogActions>
              </Dialog>
             </Container>
             </div>
        )
    }
}
export default Details;