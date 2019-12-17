import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';


class CreateTimesheet extends Component{
 
    constructor(props)
    {
        super(props)
        this.state={
            MC : 0,
            days: 0,
            empID : this.props.location.empID,
            empName : this.props.location.empName,
            managerEmail : this.props.location.managerEmail,
            managerName : this.props.location.managerName,
            clientCompany : this.props.location.clientCompany,
            month:  this.props.location.month,
            year:  this.props.location.year,
        }
    }
    componentDidMount = () => {
  
        if(this.props.location.month === "Jan")
        {
         this.setState(
             {
                 month: "01",
             }
         )
        }
        if(this.props.location.month === "Feb")
        {
         this.setState(
             {
                 month: "02",
             }
         )
        }
        if(this.props.location.month === "Mar")
        {
         this.setState(
             {
                 month: "03",
             }
         )
        }
        if(this.props.location.month === "Apr")
        {
         this.setState(
             {
                 month: "04",
             }
         )
        }
        if(this.props.location.month === "May")
        {
         this.setState(
             {
                 month: "05",
             }
         )
        }
        if(this.props.location.month === "Jun")
        {
         this.setState(
             {
                 month: "06",
             }
         )
        }
        if(this.props.location.month === "Jul")
        {
         this.setState(
             {
                 month: "07",
             }
         )
        }
        if(this.props.location.month === "Aug")
        {
         this.setState(
             {
                 month: "08",
             }
         )
        }
        if(this.props.location.month === "Sep")
        {
         this.setState(
             {
                 month: "09",
             }
         )
        }
        if(this.props.location.month === "Oct")
        {
         this.setState(
             {
                 month: "10",
             }
         )
        }
        if(this.props.location.month === "Nov")
        {
         this.setState(
             {
                 month: "11",
             }
         )
        }
        if(this.props.location.month === "Dec")
        {
         this.setState(
             {
                 month: "12",
             }
         )
        }
    }
    onChangeMCnumber = (event) => {
      this.setState(
          {
              MC : event.target.value
          }
      )
    }
    onChangeDaysnumber = (event) => {
        this.setState(
            {
                days : event.target.value
            }
        )
      }
    render()
    {
        console.log(this.state.MC)
        return(
            <div>      
                <h2>MEDICAL CERTIFICATES (IF ANY)</h2>
                <p style={{"fontSize": "22px"}}>NOTE : Please press skip if no medical certificates are attached</p>
                <Container     
            component="main" 
            maxWidth="sm"
            style={{borderRadius: '5px', border: "1px solid #BDBDBD", marginTop: "60px"}}>
                     <div>
              <p>Number of MCs</p>
              <Grid item xs={6}>
        <TextField
        input type = "number"
        variant="outlined"
        margin="normal"
        required
        onChange={this.onChangeMCnumber}
        fullWidth
      />
        </Grid>
             </div>
             <div>
             <NavLink to = {{
                 pathname: '/employee/GenerateRows',
                 MCcount: this.state.MC,
                 DaysCount: this.state.days,
                 empID: this.state.empID,
                 empName: this.state.empName,
                 managerEmail: this.state.managerEmail,
                 managerName: this.state.managerName,
                 clientCompany: this.state.clientCompany,
                 month: this.state.month,
                 year: this.state.year}}
                 style={{color: 'white', textDecoration: 'none'}}
                 activeStyle={{color: 'white', textDecoration: 'none'}}> 
                 <Button
                 variant="contained"
                 style={{"backgroundColor": "#648fcc", "color": "white",
                 "marginLeft": "auto", "marginRight": "auto", "display": "block", "marginTop": "15px", 
                 "marginBottom": "15px"}}>CONFIRM</Button></NavLink>  
             </div>
            </Container>
            <Container component="main" 
            maxWidth="sm">
                    <NavLink to = {{
                 pathname: '/employee/fillTimesheet',
                 MCcount: this.state.MC,
                 DaysCount: this.state.days,
                 empID: this.state.empID,
                 empName: this.state.empName,
                 managerEmail: this.state.managerEmail,
                 managerName: this.state.managerName,
                 clientCompany: this.state.clientCompany,
                 month: this.state.month,
                 year: this.state.year}}
                 style={{color: 'white', textDecoration: 'none'}}
                 activeStyle={{color: 'white', textDecoration: 'none'}}> 
            <Button 
               variant="contained"
               style={{"backgroundColor": "#3868b5", "color": "white", "margin":"20px"}}>SKIP</Button></NavLink>  
            </Container>
            </div>
        )
    }
}
export default CreateTimesheet;