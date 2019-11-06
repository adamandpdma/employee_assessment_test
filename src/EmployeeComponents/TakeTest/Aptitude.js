import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {NavLink} from 'react-router-dom';
import { Button } from '@material-ui/core';


const anchor = {
    color: "grey"
  }
  const buttonStyle={
  
    marginTop: "30px",
    width: "300px",
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

class Aptitude extends Component
{
    render()
    {
        return(
            <main>
            <div  />
            <Grid item xs={12}>
              <Paper style={paper}>Manage Test / <a style={anchor}>Aptitude</a></Paper>   
            </Grid>
    
                    <Grid item xs={12} style={style}>
           <NavLink to={{pathname: '/employee/Test', 
           category: 'Aptitude'}} style={buttonStyle}>
               <Button variant="contained" style={buttonStyle}>Aptitude</Button>
           </NavLink> 
          </Grid>
          </main>
        )
    }
}
export default Aptitude;