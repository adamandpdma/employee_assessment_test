import React, {useEffect} from 'react';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import ChangePasswordInput from './AdminChangePassword'
import Profile from './AdminProfile.js'
import ChangeNameInput from './AdminChangeName'
import { Button } from '@material-ui/core';


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
  // menuButton: {
  //   marginRight: theme.spacing(2),
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
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
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    color: "#7399F0",
    backgroundColor: "#EDEBEB",
     
  },
}));
const style = {
  //paddingLeft: "730px"
  left:640
}

const ResponsiveDrawer = (props) => {
  const { container,history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')          
  }

//   window.addEventListener('beforeunload', (event) => {
//     localStorage.clear()
// });


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <h2>OPTIMUM SOLUTIONS</h2>
      
     
      <List>
        {['DASHBOARD', 'EMPLOYEES DATABASE'].map((text, index) => (
          <ListItem button key={text}>
            
            <ListItemIcon>{index % 2 === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="30.5" height="21.5" viewBox="0 0 30.5 21.5">
  <path id="Icon_awesome-home" data-name="Icon awesome-home" d="M14.845,7.831,5.083,15.119v7.866a.81.81,0,0,0,.847.768l5.933-.014a.81.81,0,0,0,.843-.768V18.378a.81.81,0,0,1,.847-.768h3.389a.81.81,0,0,1,.847.768v4.59a.733.733,0,0,0,.247.545.893.893,0,0,0,.6.226l5.931.015a.81.81,0,0,0,.847-.768V15.114l-9.76-7.283A.7.7,0,0,0,14.845,7.831Zm15.42,4.954L25.838,9.477V2.829a.608.608,0,0,0-.635-.576H22.238a.608.608,0,0,0-.635.576V6.314l-4.74-3.535a2.747,2.747,0,0,0-3.23,0L.23,12.785a.54.54,0,0,0-.085.811l1.35,1.488a.657.657,0,0,0,.43.207.681.681,0,0,0,.466-.129l12.454-9.3a.7.7,0,0,1,.81,0l12.455,9.3A.681.681,0,0,0,29,15.085l1.35-1.488a.54.54,0,0,0,.141-.423.563.563,0,0,0-.231-.389Z" transform="translate(0.001 -2.254)" fill="#bdbdbd"/>
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" width="31.57" height="20.517" viewBox="0 0 31.57 20.517">
 <g id="Icon_ionic-ios-people" data-name="Icon ionic-ios-people" transform="translate(-2.215 -7.748)">
   <path id="Path_14" data-name="Path 14" d="M24.546,23.534c-.788-.281-2.074-.3-2.644-.513a3.735,3.735,0,0,1-1.223-.57,7.56,7.56,0,0,1-.2-2,3.237,3.237,0,0,0,.7-.984,10.94,10.94,0,0,0,.337-1.934s.464.2.647-.731c.155-.8.45-1.223.373-1.814s-.408-.45-.408-.45a5.265,5.265,0,0,0,.408-2.63,4.208,4.208,0,0,0-4.542-4.155A4.222,4.222,0,0,0,13.437,11.9a5.343,5.343,0,0,0,.4,2.63s-.33-.141-.408.45S13.641,16,13.8,16.8c.183.935.647.731.647.731a11.046,11.046,0,0,0,.337,1.934,3.237,3.237,0,0,0,.7.984,7.56,7.56,0,0,1-.2,2,3.6,3.6,0,0,1-1.223.563c-.562.218-1.849.246-2.644.527a4.962,4.962,0,0,0-3.22,4.725H27.759A4.952,4.952,0,0,0,24.546,23.534Z" fill="#bdbdbd"/>
   <path id="Path_15" data-name="Path 15" d="M9.844,20.109a4.773,4.773,0,0,0,2.348-.654c-1.09-1.652-.5-3.579-.724-5.379a2.966,2.966,0,0,0-3.284-2.869H8.156A2.976,2.976,0,0,0,4.9,14.077c-.225,1.793.4,3.938-.717,5.379a4.417,4.417,0,0,0,2.355.584h0a3.561,3.561,0,0,1-.07,1.181,1.775,1.775,0,0,1-.844.387,16.314,16.314,0,0,0-1.821.506,2.96,2.96,0,0,0-1.589,2.616H7.861a5.051,5.051,0,0,1,2.25-2.1,4.722,4.722,0,0,1,1.737-.366s.267-.422-.612-.584a5.994,5.994,0,0,1-1.35-.471C9.752,21.059,9.844,20.109,9.844,20.109Z" fill="#bdbdbd"/>
   <path id="Path_16" data-name="Path 16" d="M26.156,20.109a4.773,4.773,0,0,1-2.348-.654c1.09-1.652.5-3.579.724-5.379a2.966,2.966,0,0,1,3.284-2.869h.028A2.976,2.976,0,0,1,31.1,14.077c.225,1.793-.4,3.938.717,5.379a4.417,4.417,0,0,1-2.355.584h0a3.561,3.561,0,0,0,.07,1.181,1.775,1.775,0,0,0,.844.387,16.314,16.314,0,0,1,1.821.506,2.96,2.96,0,0,1,1.589,2.616H28.139a5.051,5.051,0,0,0-2.25-2.1,4.722,4.722,0,0,0-1.737-.366s-.267-.422.612-.584a5.994,5.994,0,0,0,1.35-.471C26.248,21.059,26.156,20.109,26.156,20.109Z" fill="#bdbdbd"/>
 </g>
</svg>
  }
</ListItemIcon>
          <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleClick}>
        <ListItemIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="23.733" height="23.667" viewBox="0 0 23.733 23.667">
  <path id="Icon_awesome-pencil-alt" data-name="Icon awesome-pencil-alt" d="M23.081,6.571,20.944,8.7a.558.558,0,0,1-.788,0L15.011,3.57a.554.554,0,0,1,0-.786L17.148.654a2.234,2.234,0,0,1,3.148,0l2.786,2.778A2.211,2.211,0,0,1,23.081,6.571ZM13.175,4.615,1,16.754.019,22.371a1.112,1.112,0,0,0,1.289,1.285l5.632-.985L19.113,10.532a.554.554,0,0,0,0-.786L13.968,4.615a.563.563,0,0,0-.793,0Zm-7.422,11.1a.643.643,0,0,1,0-.915L12.892,7.68a.648.648,0,1,1,.918.915L6.671,15.714A.648.648,0,0,1,5.753,15.714ZM4.08,19.6H6.305V21.28l-2.99.522L1.873,20.365,2.4,17.383H4.08Z" transform="translate(-0.002 -0.005)" fill="#bdbdbd"/>
</svg>

        </ListItemIcon>
        <ListItemText primary="MANAGE TEST" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Technical Test"/>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Non-Technical Test"/>
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
            className={classes.menuButton}
          >
           <Profile/>
           
          </IconButton>
        <Button
        color="inherit"
        type="submit"
        onClick={handleLogout}
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
      {/* <Typography>

   
       <div>
       <ProtectedRoute path = '/EmployeeLogin' component = {EmployeeLogin}/>
          <ProtectedRoute path = '/EditProfile' component = {EditProfile} />
          <ProtectedRoute path = '/Profile' component = {Profile}/>
          <ProtectedRoute path = '/EmployeeRegisterInput' component = {EmployeeRegisterInput}/>
          <ProtectedRoute path = '/RegistrationComplete' component = {RegistrationComplete}/>
          <ProtectedRoute path = '/EmployeeAssessment' component = {EmployeeAssessment}/>
       </div>

      </Typography> */}

      <Grid>
          <Paper className={classes.paper}>DashBoard / Edit Profile</Paper>   
        </Grid>
        <Grid container spacing={3}>
        <Grid item xs={6}> 
        <ChangePasswordInput/> 
        {/* <UploadTest/> */}
        </Grid>
        <Grid item xs={6}>
        <ChangeNameInput/>
        </Grid>
        </Grid>

      
      </main>   
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;
