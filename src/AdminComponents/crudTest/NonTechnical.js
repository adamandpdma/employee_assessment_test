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
    marginLeft: "30px",
    width: "170px",
    textDecoration: "none",
    marginBottom: "40px",
    borderRadius: "25px"
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

class Technical extends Component
{
    render()
    {
        return(
            <main>
            <div  />
            <Grid item xs={12}>
              <Paper style={paper}>Manage Test / <a style={anchor}>Non-Technical Test</a></Paper>   
            </Grid>
    
                    <Grid item xs={12} style={style}>
           <NavLink to={{pathname: '/uploadTestBank', 
           domain: 'Non-Technical'}}  style={buttonStyle}><Button variant="contained" style={buttonStyle}>Upload Test Bank</Button></NavLink> 
           <NavLink to={{pathname: '/viewTestBank', 
           domain: 'Non-Technical'}}  style={buttonStyle}><Button variant="contained" style={buttonStyle}>View Test Bank</Button></NavLink>
             <NavLink to={{pathname: '/createTest', 
           domain: 'Non-Technical'}}  style={buttonStyle}>
             <Button variant="contained" style={buttonStyle}>
               Create Test
               </Button>
             </NavLink>
           <NavLink to={{pathname: '/viewTest', 
           domain: 'Non-Technical'}}  style={buttonStyle}><Button variant="contained" style={buttonStyle}>View Test</Button></NavLink>
          </Grid>
          </main>
        )
    }
}
export default Technical;