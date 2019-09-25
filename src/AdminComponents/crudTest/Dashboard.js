import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const paper={
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
    padding: "17px",
  }
  const anchor = {
    color: "grey"
  }
class Dashboard extends Component{
    render()
    {
        return(
            <div>
                 <Grid item xs={12}>
              <Paper style={paper}>Manage Test / <a style={anchor}>Dashboard</a></Paper>   
            </Grid>
            </div>
        )
    }
}
export default Dashboard;