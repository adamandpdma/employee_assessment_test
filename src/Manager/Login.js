import React, {Component} from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';

class Login extends Component {
    
    state={
        timesheetId: 0,
        password: '',
        open: false,
        success: false
    }
    viewTimesheet = (boolean) => {
           if(boolean === true)
           {
               this.setState(
                   {
                       success: true
                   }
               )
           }
           else{
               this.setState(
                   {
                       open: true
                   }
               )
           }
    }
    onCloseHandler = () => {
        this.setState(
            {
                open: false
            }
        )
    }
    loginHandler = () => {
        if(this.state.timesheetId === 0 && this.state.password === "")
        {
            alert("Please, Enter the credentials!")
        }
        Axios.post("http://192.168.200.200:8080/backendapitest/manager/timesheets/"+this.state.timesheetId+"/login", this.state.password)
        .then(res => {
            this.viewTimesheet(res.data)
        })
    }
    timesheetIdHandler = (event) => 
    {      
         this.setState(
             {
                 timesheetId : event.target.value
             }
         )
    }
    passwordHandler = (event) => 
    {      
         this.setState(
             {
                 password : event.target.value
             }
         )
    }
    render()
    {
        return(
            <div>
             <Container     
            component="main" 
            maxWidth="sm"
            style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>

                <b><p>TIMESHEET ID</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   onChange={this.timesheetIdHandler}
                  />

                <b><p>PASSWORD</p></b>
                  <TextField
                  input type = "text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={this.passwordHandler}
                  />

                  <Button 
                   onClick={this.loginHandler}
                   variant="contained"
                   style={{"backgroundColor": "#3868b5", "color": "white",
                   "marginLeft": "auto", "marginRight": "auto", "display": "block", "marginTop": "15px", 
                   "marginBottom": "15px"}}>LOGIN</Button>

                        <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Invalid Credentials!!"}</DialogTitle>

              <DialogActions>
              <Button variant="contained"
              onClick={this.onCloseHandler}>OKAY</Button>
              </DialogActions>
              </Dialog>

              <Dialog
             open={this.state.success}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Successfully logged in!!"}</DialogTitle>

              <DialogActions>
              <NavLink to={{pathname: '/managerLogin/viewTimesheet',
              timesheetId: this.state.timesheetId}}
              style={{"textDecoration": "none"}}>
              <Button variant="contained"
              >OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>
            </Container>
            </div>

        )
    }
}
export default Login;