import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Logo from './OptimumLogo.jpeg'
import Emplogin from './EmployeeLogin'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    background: '#FFFFFF',

  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    background: 'linear-gradient(#03f0fc,#03f0fc)',
  },
  link:{
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),

  },
  typhography: {
    background: '#03f0fc',
    borderRadius: 10,
    },
  text:{
    padding: theme.spacing(2),
  }  
}));

const bgStyle = {
   
  backgroundImage: "url('https://media.glassdoor.com/l/e6/d0/ec/63/reception.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: window.innerWidth,
  height: window.innerHeight,
  paddingTop:"100px"
}


const RegisterationComplete = () =>{

const classes = useStyles();


return(
<React.Fragment>
      <header style={{"backgroundColor": "black"}}>
  {/* <svg xmlns="http://www.w3.org/2000/svg" width="515.456" height="72" viewBox="0 0 515.456 72"> */}
  {/* <g id="CloudBoard_" data-name="CloudBoard " transform="translate(-651.984 -1005)">
  </g> */}
  <img src = {Logo}
  width="280" height="72"/>
  </header>
  <Container style={bgStyle}>
<Container
component="main" 
maxWidth="xs"
className={classes.modal}>
  <Grid>
  <div>
<Typography variant = "h4"
  className = {classes.typhography}
  margin="normal"
>            
  Employee Register Page
 </Typography>
 </div>

 <div>
<Typography
  variant = "h5"
  margin="normal"
  align={"center"}
  className = {classes.text}
  fullWidth>
Account successfully registered
</Typography>
</div>

<div>
<Typography 
margin="normal"
align={"center"}
className = {classes.text}
fullWidth>
  Note: Your Employee Id will be your user id
</Typography>
</div>

<Button
className = {classes.button}
margin="normal"
fullWidth
>
<Link to={"./EmployeeLogin"} >
  Back to Login</Link> 
</Button>  
</Grid>   
</Container>
</Container>
<footer style={{"backgroundColor": "black"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width= 'window.innerWidth' height="72" viewBox="0 0 515.456 72">
      <g id="CloudBoard_" data-name="CloudBoard " transform="translate(-651.984 -1005)">
        <text id="CloudBoard_-_Optimum_Solutions_2019" data-name="CloudBoard - Optimum Solutions 2019" transform="translate(702 1005)" fill="#fff" font-size="26" font-family="SegoeUI-Italic, Segoe UI" font-style="italic"><tspan x="0" y="28">CloudBoard - Optimum Solutions 2019</tspan></text>
        <path id="Icon_metro-copyright" data-name="Icon metro-copyright" d="M20.073,17v1.451a1.685,1.685,0,0,1-.486,1.184,3.227,3.227,0,0,1-1.251.805,9.147,9.147,0,0,1-1.57.432,8.735,8.735,0,0,1-1.564.146,6.152,6.152,0,0,1-4.558-1.85,6.285,6.285,0,0,1-1.83-4.6,6.184,6.184,0,0,1,6.321-6.321,9.391,9.391,0,0,1,1,.06,8.586,8.586,0,0,1,1.238.24,6.348,6.348,0,0,1,1.231.452,2.65,2.65,0,0,1,.918.752,1.71,1.71,0,0,1,.373,1.078v1.451a.188.188,0,0,1-.213.213h-1.57a.188.188,0,0,1-.213-.213V11.34q0-.572-.872-.9a5.18,5.18,0,0,0-1.83-.326,4.043,4.043,0,0,0-3.041,1.218,4.355,4.355,0,0,0-1.178,3.16,4.687,4.687,0,0,0,1.218,3.32,4.054,4.054,0,0,0,3.107,1.311,5.638,5.638,0,0,0,1.836-.319q.932-.319.932-.878V17a.207.207,0,0,1,.06-.153.192.192,0,0,1,.14-.06H19.86a.214.214,0,0,1,.146.06.2.2,0,0,1,.067.153ZM14.99,6.11a8.279,8.279,0,0,0-3.307.679A8.4,8.4,0,0,0,7.152,11.32a8.4,8.4,0,0,0,0,6.614,8.4,8.4,0,0,0,4.531,4.531,8.4,8.4,0,0,0,6.614,0,8.4,8.4,0,0,0,4.531-4.531,8.4,8.4,0,0,0,0-6.614A8.4,8.4,0,0,0,18.3,6.789,8.278,8.278,0,0,0,14.99,6.11Zm10.22,8.517a10,10,0,0,1-1.371,5.13,10.174,10.174,0,0,1-3.719,3.719,10,10,0,0,1-5.13,1.371,10,10,0,0,1-5.13-1.371,10.174,10.174,0,0,1-3.719-3.719,10,10,0,0,1-1.371-5.13A10,10,0,0,1,6.141,9.5,10.174,10.174,0,0,1,9.86,5.778a10,10,0,0,1,5.13-1.371,10,10,0,0,1,5.13,1.371A10.174,10.174,0,0,1,23.839,9.5,10,10,0,0,1,25.21,14.627Z" transform="translate(1142.23 1010.593)" fill="#fff"/>
        <path id="Icon_awesome-cloud" data-name="Icon awesome-cloud" d="M31.038,14.4a6.472,6.472,0,0,0,.369-2.16,5.783,5.783,0,0,0-5.542-5.994,5.226,5.226,0,0,0-3.077,1.011A9.133,9.133,0,0,0,14.78,2.25c-5.1,0-9.237,4.47-9.237,9.989,0,.169.006.337.012.506A8.978,8.978,0,0,0,0,21.23c0,4.963,3.724,8.99,8.314,8.99H29.56c4.082,0,7.39-3.577,7.39-7.991A7.863,7.863,0,0,0,31.038,14.4Z" transform="translate(651.984 1004.75)" fill="#fff"/>
      </g>
    </svg>
    </footer>

</React.Fragment>
)
}

export default RegisterationComplete