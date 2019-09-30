import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './Home.css'
import background from './OptimumBackground.png'


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // background: 'linear-gradient(45deg, #03a9f4 30%, #00bcd4 90%)',

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


const RegisterationComplete = () =>{

const classes = useStyles();


return(
<React.Fragment>
<div><img className='bg' src={background} /></div>

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
<Link to={`./EmployeeLogin`}>Back to Login</Link> 
</Button>  
</Grid>    
</Container>
</React.Fragment>
)
}

export default RegisterationComplete