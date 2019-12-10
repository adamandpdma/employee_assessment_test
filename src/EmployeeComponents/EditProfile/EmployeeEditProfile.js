import { Component } from "react";
import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ChangePasswordInput from './EmployeeChangePassword'
import ChangeNameInput from './EmployeeChangeName'

class EmployeeEditProfile extends Component{

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

export default EmployeeEditProfile;
