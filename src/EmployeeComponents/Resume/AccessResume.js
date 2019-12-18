import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

class AccessResume extends Component
{
    render()
    {
        return(
            <main>
            <div  />
            <Grid item xs={12}>
              <Paper style={paper}>Dashboard / <a style={anchor}>Resume</a></Paper>   
            </Grid>
    
          
          </main>
        )
    }
}
export default AccessResume;