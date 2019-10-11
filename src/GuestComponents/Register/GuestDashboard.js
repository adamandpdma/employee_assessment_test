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
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import GuestRegister from './GuestRegister'
import auth from "../../auth"

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
  left:830
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
        <ListItem button onClick={handleClick}>
        <ListItemIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="23.733" height="23.667" viewBox="0 0 23.733 23.667">
  <path id="Icon_awesome-pencil-alt" data-name="Icon awesome-pencil-alt" d="M23.081,6.571,20.944,8.7a.558.558,0,0,1-.788,0L15.011,3.57a.554.554,0,0,1,0-.786L17.148.654a2.234,2.234,0,0,1,3.148,0l2.786,2.778A2.211,2.211,0,0,1,23.081,6.571ZM13.175,4.615,1,16.754.019,22.371a1.112,1.112,0,0,0,1.289,1.285l5.632-.985L19.113,10.532a.554.554,0,0,0,0-.786L13.968,4.615a.563.563,0,0,0-.793,0Zm-7.422,11.1a.643.643,0,0,1,0-.915L12.892,7.68a.648.648,0,1,1,.918.915L6.671,15.714A.648.648,0,0,1,5.753,15.714ZM4.08,19.6H6.305V21.28l-2.99.522L1.873,20.365,2.4,17.383H4.08Z" transform="translate(-0.002 -0.005)" fill="#bdbdbd"/>
</svg>

        </ListItemIcon>
        <ListItemText primary="Take Test" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Register"/>
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
        <Button
        color="inherit"
        type="submit"
        onClick={() => {
          auth.logout(() => {
            history.push("./")
          })
          localStorage.clear()
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
      <GuestRegister/>      
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
