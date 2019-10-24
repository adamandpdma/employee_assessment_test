import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Logo from '../../OptimumLogo.jpeg'

const useStyles = makeStyles(theme => ({
  button: {
    background: '#b3b3b3',   
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),

  },
  typhography: {
    background: '#b3b3b3',
    textAlign: "center",
    wdith: '100%',
    paddingTop:"24px",
    paddingBottom:"24px",
    marginBottom: theme.spacing(1),

    },

  container: {
      // marginTop: theme.spacing(4),
      position:'relative',
    top:'50px',
    background: '#FFFFFF',
    paddingLeft:"0px",
    paddingRight:"0px"
    },   
  text:{
    padding: theme.spacing(2),
  }  
}));


const ReviewError = () =>{

const classes = useStyles();


return(
<React.Fragment>

  <Container
    style={{borderRadius: '10px'}}
    className = {classes.container}
    component="main" 
    maxWidth="xs"
    borderRadius={16}>
<Typography
  className = {classes.typhography}
  margin="normal"
  
>            
Test is not complete </Typography>

<Button
className = {classes.button}
margin="normal"
fullWidth
>
<NavLink to ='./reviewAll' style={{color: 'black', textDecoration: 'none'}}>Okay</NavLink>
</Button>  
</Container>
</React.Fragment>
)
}

export default ReviewError