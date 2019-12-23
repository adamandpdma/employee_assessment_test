import React, {Component} from 'react';
import axios from 'axios';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import { TextField,Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class FillTimesheet extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            Calendar : [],
            alignment: '',
            mobile: 0,
            mobileErorr: '',
            homeNo: 0,
            officeNo:0,
            remarks: '',
            mcIds: this.props.location.mcIds,
            i: 0,
            open: false,
            showErorr: "",
            calValue: 0,
            openTwo: false,
            boolean: false
        }
    }
    componentDidMount = () => {
    
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/"+this.props.location.month+"/"+this.props.location.year+"")
        .then(res => 
            this.setState(
            {
              Calendar: res.data
            }
        ))
     
    }

 
    
   handleChange = (index, newAlignment) => {
    const updatedAlignment= [...this.state.alignment];
    updatedAlignment[index] = newAlignment

    this.setState({
      alignment: updatedAlignment,
      disable: false,
    }, () => {
      console.log(this.state.alignment)
      console.log(this.state.Calendar)
    },)
   
  }; 
  mobileChangeHandler = (event) => 
  {
      this.setState(
          {
           mobile: event.target.value
          }
      )
  }
  homeChangeHandler = (event) => 
  {
      this.setState(
          {
           homeNo: event.target.value
          }
      )
  }
  officeChangeHandler = (event) => 
  {
      this.setState(
          {
           officeNo: event.target.value
          }
      )
  }
  remarksChangeHandler = (event) => 
  {
      this.setState(
          {
           remarks: event.target.value
          }
      )
  }
  validate = () => {
      console.log(this.state.alignment)
    let isError = false;
    const errors ={};
    if(this.state.mobile === 0){
        isError = true;
        errors.mobileErorr= "Enter Mobile No";
    }
    this.state.Calendar.map( cal => {
         if(this.state.alignment[cal[0]] === undefined )
         {
            isError = true;
            errors.showErorr= "Please fill in the fields";
         }
    })
  
    if(isError){
        this.setState(
            {
                ...this.state,
                ...errors,
                openTwo: true
            });
    }

    return isError;
  }
 submitTimesheethandler = (event) => {

    event.preventDefault();

   const err = this.validate();
   if(!err)
   {
    
       for(let i=0; i< this.state.Calendar.length; i++)
       {
       this.state.Calendar[i].push(this.state.alignment[i + 1])
       }
       console.log(this.state.Calendar)

 if(this.props.location.mcIds === undefined)
 {
   
    const values = {
        approved: true,
        companyName: this.props.location.clientCompany,
        empName: this.props.location.empName,
        employeeId: parseInt(this.props.location.empID),
        hidden: true,
        homeNo: this.state.homeNo,
        managerEmail: this.props.location.managerEmail,
        managerName: this.props.location.managerName,
        mcId: " ",
        mobileNo: this.state.mobile,
        month: this.props.location.month,
        officeNo: this.state.officeNo,
        password: "string",
        remarks: this.state.remarks,
        timesheet: btoa(this.state.alignment),
        timesheetId: 0,
        year: this.props.location.year
 }
 console.log(values)
 console.log(this.state.Calendar)
 axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/submit", values)
 .then(res => this.booleanCheck(res.data) )
 }
 else{

    const values = {
        approved: true,
        companyName: this.props.location.clientCompany,
        empName: this.props.location.empName,
        employeeId: parseInt(this.props.location.empID),
        hidden: true,
        homeNo: this.state.homeNo,
        managerEmail: this.props.location.managerEmail,
        managerName: this.props.location.managerName,
        mcId: this.props.location.mcIds.toString(),
        mobileNo: this.state.mobile,
        month: this.props.location.month,
        officeNo: this.state.officeNo,
        password: "string",
        remarks: this.state.remarks,
        timesheet: btoa(this.state.alignment),
        timesheetId: 0,
        year: this.props.location.year
 }
 console.log(values)
 axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/submit", values)
 .then(res => this.booleanCheck(res.data)
 )

 }
}
 }
handleClose = () => {
    this.setState(
        {
            openTwo: false
        }
    )
}
booleanCheck = (boolean) => {
   if(boolean){
        this.setState(
            {
                open: true
            }
        )
    }
else if(!boolean)
{
         alert("The timesheet for this month already exists. Either delete the timesheet and create a new one or Edit the timesheet of this month")
}

}
    render()
    {
        console.log(this.state.Calendar)
        return(
            <div>   
                <Container   component="main" 
                 maxWidth="sm"
                 style={{borderRadius: '5px', border: "1px solid #BDBDBD"}}>

                <h3>TIMESHEET</h3>    
                <div style={{"width": "200px", "float": "left"}}>
                    <ul>
                        <li>
                            SA: Saturday
                        </li>
                        <li>
                            SU: Sunday
                        </li>
                        <li>
                            PH: Public Holiday
                        </li>
                    </ul>
                </div>
                <div style={{"float": "left", "width": "200px"}}>
                    <ul >
                        <li >
                            ML: Medical Leave
                        </li>
                        <li>
                            AL: Annual Leave
                        </li>
                    </ul>
                </div>
                <div style={{"width":"200px", "float": "left" }}> 
         
            <NavLink to={{
            pathname: '/employee/viewMCAttachment',
            mcIds:this.state.mcIds,
            month: this.props.location.month,
            year: this.props.location.year,
            mcId: this.props.location.mcIds,
            empID: this.props.location.empID,
            empName: this.props.location.empName,
            managerEmail: this.props.location.managerEmail,
            managerName: this.props.location.managerName,
            clientCompany: this.props.location.clientCompany,
            name: "fillTimesheet"
             }}
            style={{"textDecoration": "none"}}><Button variant="contained" 
            style={{"marginTop": "20px"}}
            >View Attachments</Button></NavLink>
                </div>

                <div style={{"width": "300px"}}>
                  <b><p>Mobile No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   onChange={this.mobileChangeHandler}
                     />
                <div style={{"color": "red"}}>{this.state.mobileErorr}</div>   
                </div>
                <div style={{ "width": "300px"}} >
                <b><p>Home No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   onChange={this.homeChangeHandler}
                     />
                </div>
                <div style={{"width":"300px"}}> 
                <b><p>Office No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   onChange={this.officeChangeHandler}
                   fullWidth
                     />
                </div>
                <div style={{"width":"500px"}}>
                    <b><p>Remarks</p></b>
                <TextField
                   input type = "text"
                   variant="outlined"
                   margin="normal"
                   multiline={true}
                   onChange={this.remarksChangeHandler}
                   fullWidth
                     />
                </div>
                  
      
                    {this.state.Calendar.map(cal => {
            return(
                <div>
                <Table>
                <TableBody>
                <TableCell>
                {cal[1]} <br/>
                {cal[0]}<br/>
                <TextField
                   input type = "text"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.alignment[cal[0]]} 
                   key={cal[0]}
                   exclusive 
                   onChange={(e) => this.handleChange(cal[0],e.target.value)} 
                     />
                     {this.state.alignment[cal[0]] === undefined && (
                        <div style={{"color": "red"}}>{this.state.showErorr}</div>   
                     )}    
           
                  </TableCell>
                  </TableBody>
                  </Table>
                </div>
         
            )
        })}
             <Button variant="contained" onClick={this.submitTimesheethandler}>SUBMIT</Button>
             <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Successfully submitted your Timesheet!!"}</DialogTitle>

              <DialogActions>
              <NavLink to={{ 
               pathname:'/employee/viewTimesheet'
             }}
               style={{color: 'white', textDecoration: 'none'}}> 
              <Button variant="contained">OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>
              
              <Dialog
             open={this.state.openTwo}
             close={this.handleClose}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Enter all the details!!"}</DialogTitle>

              <DialogActions>
              <Button variant="contained"
              onClick={this.handleClose}>OKAY</Button>
              </DialogActions>
              </Dialog>
                 </Container>    
            </div>
           
        )
    }
}
export default FillTimesheet;


