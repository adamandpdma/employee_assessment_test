import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// CODE WRITTEN BY - FAHEMA

const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }
  const anchor = {
    color: "grey"
  }
class DashBoardHr extends Component{
    render()
    {
        return(
            <div>
                 <Grid item xs={12}>
              <Paper style={paper}>Dashboard / <a style={anchor}>My Dashboard</a></Paper>   
            </Grid>
            </div>
        )
    }
}
export default DashBoardHr;