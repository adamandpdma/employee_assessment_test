import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {NavLink} from 'react-router-dom';
import { Button } from '@material-ui/core';

// CODE WRITTEN BY - FAHEMA

const anchor = {
    color: "grey"
  }
  const buttonStyle={
  
    marginTop: "30px",
    width: "200px",
    textDecoration: "none",
    marginBottom: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"

  }
  const style = {
    margin: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }
  const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }

class Agile extends Component
{
    render()
    {
        return(
            <main>
            <div  />
            <Grid item xs={12}>
              <Paper style={paper}>Manage Test / <a style={anchor}>Agile</a></Paper>   
            </Grid>
    
                    <Grid item xs={12} style={style}>
           <NavLink to={{pathname: '/employee/Test', 
           category: 'Agile'}} style={buttonStyle}>
               <Button variant="contained" style={buttonStyle}>AGILE</Button>
           </NavLink> 
          </Grid>
          </main>
        )
    }
}
export default Agile;