import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, TextField } from '@material-ui/core';
import DatePicker from './MYPicker';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }
  const anchor = {
    color: "grey"
  }

class CreateTimesheet extends Component{

constructor(props) {
  super(props);
  this.state = {
    empID : 0,
    empName : '',
    managerEmail : '',
    managerName : '',
    clientCompany : '',
  }
}
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
    render()
    {
        return(
            <div>
                 <Grid item xs={12}>
              <Paper style={paper}>Self-Assessment / <a style={anchor}>Timesheet</a></Paper>   
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
        onChange={this.employeeIDHandler}
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
        onChange={this.employeeNameHandler}
        fullWidth
      />
        </Grid>
             </div>
             <div>
                 <DatePicker/>
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
             </div>
             <div>
             <NavLink to={{ 
               pathname:'/employee/CreateMC',
               empID : this.state.empID,
               empName : this.state.empName,
               managerEmail : this.state.managerEmail,
               managerName : this.state.managerName,
               clientCompany : this.state.clientCompany
             }}
         style={{color: 'white', textDecoration: 'none'}}
         activeStyle={{color: 'white', textDecoration: 'none'}}> <Button
                 variant="contained"
                 style={{"backgroundColor": "#3868b5", "color": "white",
                 "marginLeft": "auto", "marginRight": "auto", "display": "block", "marginTop": "15px", 
                 "marginBottom": "15px"}}>PROCEED</Button></NavLink>
             </div>
            </Container>
            </div>
        )
    }
}
export default CreateTimesheet;