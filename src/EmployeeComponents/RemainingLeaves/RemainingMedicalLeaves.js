import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container, TextField} from '@material-ui/core';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import RemainingLeavesHome from './RemainingLeavesHome';

// CODE WRITTEN BY - FAHEMA

const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }
  const anchor = {
    color: "grey"
  }

class RemainingMedicalLeaves extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            remainingML : 0,
            totalML : 14,
            TotalMCTaken: 0
        }
    }
    componentDidMount = () => 
    {
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/entitlement")
        .then(res =>
             {
                 console.log(res.data)
            this.setState(
                {
                  remainingML : res.data["Remaining MC Entitlement"],
                  TotalMCTaken: this.state.totalML - res.data["Remaining MC Entitlement"]
                }
            )
        }
        )
    }
    render()
    {
        console.log(this.state.remainingML)
        return(
            <div>
                       <Grid item xs={12}>
              <Paper style={paper}>Self-Assessment / <a style={anchor}>Remaining Medical Leaves</a></Paper>   
            </Grid>

            <Container     
            component="main" 
            maxWidth="sm"
            style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>
                <div style={{"marginTop": "30px", "marginBottom": "30px", 
                     "marginLeft": "15px"}}>
                  <h4 style={{"textAlign": "center"}}>REMAINING MEDICAL LEAVES</h4>
                  <b><p>Total Medical Leaves</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.totalML}
                     />
                      <b><p>Total Medical Leaves taken</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.TotalMCTaken}
                     />
                      <b><p>Medical Leaves remaining</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.remainingML}
                     />
                </div>
                <div style={{"padding": "10px"}}>
                <NavLink to='/employee/remainingLeaves' style={{"textDecoration": "none"}}>
                    <Button variant="contained">BACK</Button></NavLink>
                </div>
            </Container>
               
            </div>
        )
    }
}
export default RemainingMedicalLeaves;