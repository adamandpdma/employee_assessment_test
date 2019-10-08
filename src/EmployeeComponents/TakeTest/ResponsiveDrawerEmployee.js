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
import DashBoardEmployee from './DashBoardEmployee';
import TestDetails from './TestDetails';
// import TakeTest from '../TakeTest';
import Agile from './Agile';
import ProgrammingAndFramework from './ProgrammingAndFramework';
import DevOps from './DevOps';
import Countdown from './Countdown';
import EmployeeReviewTest from '../ReviewTest/EmployeeReviewTest'
import ReviewAllTests from '../ReviewTest/ReviewAllTests'
import Profile from '../EditProfile/EmployeeProfile'
import { Button } from '@material-ui/core';
import auth from "../../auth"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmployeeEditProfile from '../EditProfile/EmployeeEditProfile';
import {ProtectedRoute} from "../../Protected.Route";


const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  // // menuButton: {
  // //   marginRight: theme.spacing(2),
  // //   [theme.breakpoints.up('sm')]: {
  // //     display: 'none',
  // //   },
  // },
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
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
     
  },
  stickToBottom: {
    width: '74%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: "#E1E1E1",
    padding: "20px"
  },
  // Grid: {
  //   padding: theme.spacing(0)
  // }
}));
const style = {
  left:850,
  position:'absolute'
}
const listStyle={
  textDecoration: "none",
  listStyle: 'none',
  color: 'none'
}
const ResponsiveDrawerEmployee = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const [open, setOpen] = React.useState(false);

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
    {<NavLink to='/employee/DashBoardEmployee' 
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
        <ListItemText primary="SELF-ASSESSMENT" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
    <ListItem button className={classes.nested} onClick={navigation}>
     <NavLink to='/employee/ProgrammingAndFramework'
         style={{color: 'white', textDecoration: 'none'}}
         activeStyle={{color: 'white', textDecoration: 'none'}}><ListItemText primary="Programming and Framework" /></NavLink>
          </ListItem>  
          <ListItem button className={classes.nested}>
           <NavLink to='/employee/Agile' 
              style={{color: 'white', textDecoration: 'none'}}
              activeStyle={{color: 'white', textDecoration: 'none'}}><ListItemText primary="Agile Development"/></NavLink>
          </ListItem>
          <ListItem button className={classes.nested}>
            <NavLink to='/employee/DevOps'
               style={{color: 'white', textDecoration: 'none'}}
               activeStyle={{color: 'white', textDecoration: 'none'}}><ListItemText primary="DevOps"/></NavLink>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="23.733" height="23.667" viewBox="0 0 23.733 23.667">
  <path id="Icon_awesome-pencil-alt" data-name="Icon awesome-pencil-alt" d="M23.081,6.571,20.944,8.7a.558.558,0,0,1-.788,0L15.011,3.57a.554.554,0,0,1,0-.786L17.148.654a2.234,2.234,0,0,1,3.148,0l2.786,2.778A2.211,2.211,0,0,1,23.081,6.571ZM13.175,4.615,1,16.754.019,22.371a1.112,1.112,0,0,0,1.289,1.285l5.632-.985L19.113,10.532a.554.554,0,0,0,0-.786L13.968,4.615a.563.563,0,0,0-.793,0Zm-7.422,11.1a.643.643,0,0,1,0-.915L12.892,7.68a.648.648,0,1,1,.918.915L6.671,15.714A.648.648,0,0,1,5.753,15.714ZM4.08,19.6H6.305V21.28l-2.99.522L1.873,20.365,2.4,17.383H4.08Z" transform="translate(-0.002 -0.005)" fill="#bdbdbd"/>
</svg>
        </ListItemIcon>
        <NavLink to='/employee/reviewAll' 
          style={{color: 'white', textDecoration: 'none'}}
          activeStyle={{color: 'white', textDecoration: 'none'}}><ListItemText primary="REVIEW TEST" /></NavLink>
      </ListItem>
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
            className={classes.menuButton}
          >
          <Profile/>  
          </IconButton>

        <Button
        color="inherit"
        type="submit"
        onClick={() => {
          auth.logout(() => {
            window.location = "/"
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          <ProtectedRoute path='/employee/DashBoardEmployee' component={DashBoardEmployee}/>
          <ProtectedRoute path='/employee/Agile' component={Agile}/>
          <ProtectedRoute path='/employee/ProgrammingAndFramework' component={ProgrammingAndFramework}/>
          <ProtectedRoute path='/employee/DevOps' component={DevOps}/>
          <ProtectedRoute path='/employee/takeTest' component={Countdown}/>
          <ProtectedRoute path='/employee/Test' component={TestDetails}/>
          <ProtectedRoute path='/employee/review' component={EmployeeReviewTest}/>
          <ProtectedRoute path='/employee/reviewAll' component={ReviewAllTests}/>
          <ProtectedRoute path='/employee/editProfile' component={EmployeeEditProfile}/>
   
        </Grid>
      </main>
    </div>
  );
}

ResponsiveDrawerEmployee.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawerEmployee;



