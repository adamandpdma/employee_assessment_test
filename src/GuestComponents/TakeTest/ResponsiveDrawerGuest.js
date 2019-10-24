import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import {Route} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import DashBoardGuest from './DashBoardGuest';
import ViewTestDetails from './ViewTestDetails'
import Countdown from './Countdown';
import GuestRegister from '../Register/GuestRegister'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { Button } from '@material-ui/core';
import auth from "../../auth"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {ProtectedRoute} from "../../Protected.Route";
import { useEffect, useState } from 'react';


const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  stickToBottom: {
    width: '74%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: "#E1E1E1",
    padding: "20px"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,

    },
  },
  appBar:{
    marginLeft: drawerWidth,
    backgroundColor: 'black',
      opacity: 0.75,
      color: "#BDBDBD",
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: 'black',
      opacity: 0.75,
      color: "#BDBDBD",
    
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar:theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'black',
    opacity: 0.75,
    color: "#BDBDBD",
    textAlign: "center",
    fontFamily: 'aerial',
    paddingTop: '10px'
    
  
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
     
  },
}));
const listStyle={
  textDecoration: "none",
  listStyle: 'none',
  color: 'none'
}

const style = {
  //paddingLeft: "730px"
  right:'2%',
  position:'fixed'
}
const ResponsiveDrawerGuest = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [testDetailsOpen, settestDetailsOpen] = React.useState("false");

  useEffect(() => {
    if(props.location.openBoolean)
    {
      openTestCheck()
    }
  
});
const openTestCheck = () => 
{
  localStorage.setItem("fav", "true");
  window.location='./guest/ViewTestDetails'
  // settestDetailsOpen(true)
}

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(localStorage.getItem("guestid") !== null)
    {
      // localStorage.setItem("isAuth", true)
      console.log(localStorage.getItem("guestid"))
      console.log('True')
    } else {
      // localStorage.setItem("isAuth", false)
      console.log(localStorage.getItem("guestid"))
      console.log('False')
      window.location='./'
      localStorage.clear()
    //  window.location.reload(true)
    }
  });

  const handleClick = () => {
    setOpen(!open);
  }

  const navigation = () => 
  {
    return(
        <NavLink to='/createTest'></NavLink>
       )
  }
 

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <h2>OPTIMUM SOLUTIONS</h2>
      
     
      <List>
        {['DASHBOARD'].map((text, index) => (
          <ListItem button key={text}>
            
            <ListItemIcon>{<svg xmlns="http://www.w3.org/2000/svg" width="30.5" height="21.5" viewBox="0 0 30.5 21.5">
  <path id="Icon_awesome-home" data-name="Icon awesome-home" d="M14.845,7.831,5.083,15.119v7.866a.81.81,0,0,0,.847.768l5.933-.014a.81.81,0,0,0,.843-.768V18.378a.81.81,0,0,1,.847-.768h3.389a.81.81,0,0,1,.847.768v4.59a.733.733,0,0,0,.247.545.893.893,0,0,0,.6.226l5.931.015a.81.81,0,0,0,.847-.768V15.114l-9.76-7.283A.7.7,0,0,0,14.845,7.831Zm15.42,4.954L25.838,9.477V2.829a.608.608,0,0,0-.635-.576H22.238a.608.608,0,0,0-.635.576V6.314l-4.74-3.535a2.747,2.747,0,0,0-3.23,0L.23,12.785a.54.54,0,0,0-.085.811l1.35,1.488a.657.657,0,0,0,.43.207.681.681,0,0,0,.466-.129l12.454-9.3a.7.7,0,0,1,.81,0l12.455,9.3A.681.681,0,0,0,29,15.085l1.35-1.488a.54.54,0,0,0,.141-.423.563.563,0,0,0-.231-.389Z" transform="translate(0.001 -2.254)" fill="#bdbdbd"/>
</svg>
  }
</ListItemIcon>
    {<NavLink to='/guest/DashBoardGuest'
       style={{color: 'white', textDecoration: 'none'}}
       activeStyle={{color: 'white', textDecoration: 'none'}}
    className="NavLink"><ListItemText primary="DASHBOARD"/></NavLink> 
  }
          </ListItem>
        ))}
        <ListItem button onClick={handleClick}>
        <ListItemIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="28" viewBox="0 0 22.5 28">
  <path id="Icon_awesome-book" data-name="Icon awesome-book" d="M22.5,19.688V1.313A1.259,1.259,0,0,0,21.295,0H4.821A5.051,5.051,0,0,0,0,5.25v17.5A5.051,5.051,0,0,0,4.821,28H21.295A1.259,1.259,0,0,0,22.5,26.688v-.875a1.37,1.37,0,0,0-.447-1.023,13.265,13.265,0,0,1,0-4.085A1.35,1.35,0,0,0,22.5,19.688ZM6.429,7.328A.317.317,0,0,1,6.73,7H17.377a.317.317,0,0,1,.3.328V8.422a.317.317,0,0,1-.3.328H6.73a.317.317,0,0,1-.3-.328Zm0,3.5a.317.317,0,0,1,.3-.328H17.377a.317.317,0,0,1,.3.328v1.094a.317.317,0,0,1-.3.328H6.73a.317.317,0,0,1-.3-.328ZM19.155,24.5H4.821a1.756,1.756,0,0,1,0-3.5H19.155A21.431,21.431,0,0,0,19.155,24.5Z" fill="#bdbdbd"/>
</svg>


        </ListItemIcon>
        <ListItemText primary="TAKE-TEST" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
    <ListItem button className={classes.nested} onClick={navigation}>
      {localStorage.getItem("fav")  === "true"  ?
         <NavLink to='/guest/ViewTestDetails' style={listStyle} 
         style={{color: 'white', textDecoration: 'none'}}
         activeStyle={{color: 'white', textDecoration: 'none'}}
      >
           <ListItemText primary="VIEW TEST DETAILS" />
           </NavLink> :  <NavLink to='/guest/Register' style={listStyle} 
         style={{color: 'white', textDecoration: 'none'}}
         activeStyle={{color: 'white', textDecoration: 'none'}}>
           <ListItemText primary="REGISTER" />
           </NavLink>
      }
          </ListItem> 
        </List>
      </Collapse>
      </List>
    </div>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Button
        color="inherit"
        type="submit"
        onClick={() => {
          auth.logout(() => {
            window.location = "./"
          })
          localStorage.clear()
          sessionStorage.clear()
        }}
        style={style}
        >
        <ExitToAppIcon />Log Out
        </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid>
          <ProtectedRoute path='/guest/DashBoardGuest' component={DashBoardGuest}/>
          <ProtectedRoute path='/guest/ViewTestDetails' component={ViewTestDetails}/>
          <ProtectedRoute path='/guest/takeTest' component={Countdown}/>
          <ProtectedRoute path='/guest/register' component={GuestRegister}/>
        </Grid>
      </main>
    </div>
  );
}

ResponsiveDrawerGuest.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawerGuest;



