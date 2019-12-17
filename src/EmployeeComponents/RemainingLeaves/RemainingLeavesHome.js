import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container} from '@material-ui/core';
import {NavLink} from 'react-router-dom'

const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }
  const anchor = {
    color: "grey"
  }

class RemainingLeavesHome extends Component
{
    render()
    {
        return(
            <div>
                       <Grid item xs={12}>
              <Paper style={paper}>Self-Assessment / <a style={anchor}>View remaining leave & MC entitlement</a></Paper>   
            </Grid>

            <Container     
            component="main" 
            maxWidth="sm"
            style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>
                <div style={{"marginTop": "30px", "marginBottom": "30px", 
                     "marginLeft": "15px"}}>
                 <NavLink to='/employee/remainingAnnualLeaves'
                 style={{"textDecoration": "none"}}><Button variant="contained"
                style={{"margin": "10px"}}>
                  Remaining Annual Leaves
               </Button></NavLink>
               <NavLink to='/employee/remainingMedicalLeaves'
                 style={{"textDecoration": "none"}}><Button variant="contained">
                  Remaining Medical Leaves
               </Button></NavLink>
                </div>
            </Container>
               
            </div>
        )
    }
}
export default RemainingLeavesHome;