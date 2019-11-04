import { Component } from "react";
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
import auth from "../../auth"

class AdminEditProfile extends Component{

  render(){
    return(

      <React.Fragment>
        <Grid container spacing={3}>
        <Grid item xs={9}> 
        <ChangePasswordInput/> 
        {/* <UploadTest/> */}
        </Grid>
        {/* <Grid item xs={6}>
        <ChangeNameInput/>
        </Grid> */}
        </Grid>
        <Grid style={{paddingTop: 20}}>
        <Grid item xs={9}> 
        <ChangeNameInput/>
        </Grid> 
        </Grid>
        </React.Fragment>
    )
}}

export default AdminEditProfile;

