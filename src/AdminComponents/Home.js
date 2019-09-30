import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Popper from '@material-ui/core/Popper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom';
import './Home.css'
import background from './OptimumBackground.png'


const useStyles = makeStyles(theme => ({
    fab: {
    top:'170px',
    padding: "100px",
    background: 'linear-gradient(#03f0fc , #03f0fc)',
    margin: theme.spacing(1),
    },
    button:{
      margin: theme.spacing(1),
        marginLeft: theme.spacing(6),
        background: 'linear-gradient(#03f0fc , #03f0fc)',
      },
    button1:{
      margin: theme.spacing(1),
      marginRight: theme.spacing(10),
      background: 'linear-gradient(#03f0fc , #03f0fc)',
    },
  button2:{
    margin: theme.spacing(1),
    background: 'linear-gradient(#03f0fc , #03f0fc)',
},
    root: {
      width: 900,
    },
    
  }));

const Home = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
    

    return(
      <React.Fragment>
      <div><img className='bg' src={background} /></div>
      <Container 
      align="center"
      className={classes.root}>
      <Fab onClick={handleClick('top')}
      className = {classes.fab}></Fab>

      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      <Fab
            type="submit"
            margin="normal"
            variant="contained"
            className={classes.button}>

        <LockOutlinedIcon /> <Link to={`./Input`}>Admin</Link> 
        </Fab>   

        <Fab
            type="submit"
            margin="normal"
            variant="contained"
            className={classes.button1}
            position="absolute"
          >
        <LockOutlinedIcon /> HR
        </Fab>   
        
        <Fab
            type="submit"
            margin="normal"
            variant="contained"
            className={classes.button2}
            >
        <LockOutlinedIcon /> Guest
        </Fab>   
        
        <Fab
            type="submit"
            margin="normal"
            variant="contained"
            className={classes.button2}>
        <LockOutlinedIcon /> <Link to={`./EmployeeLogin`}>Employee</Link> 
        </Fab> 
      </Popper>
      
      </Container>
      </React.Fragment>

        
    )

}

export default Home