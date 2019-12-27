import React, {Component} from 'react';
import axios from 'axios';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import { TextField, Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// CODE WRITTEN BY - FAHEMA

class EditTimesheet extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            Calendar : [],
            alignment: [],
            mobile: 0,
            homeNo: 0,
            officeNo:0,
            remarks: '',
            i: 0,
            timesheet: '',
            month: 0,
            year: 0,
            DayAndDate: [],
            clientCompany: '',
            empID: 0,
            empName: '',
            managerEmail: '',
            managerName: '',
            mcId: "",
            timesheetId: 0,
            open: false
        }
    }
    componentDidMount = () => { 
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/"+this.props.location.timesheetId+"")
        .then(res => {
            this.setState(
                {
                  timesheet: res.data,
                  mobile: res.data.mobileNo,
                  homeNo: res.data.homeNo,
                  officeNo: res.data.officeNo,
                  remarks:res.data.remarks,
                  alignment:  atob(res.data.timesheet).split(','),
                  month: res.data.month,
                  year: res.data.year,
                  clientCompany: res.data.companyName,
                  empID: res.data.employeeId,
                  empName: res.data.empName,
                  managerEmail: res.data.managerEmail,
                  managerName: res.data.managerName,
                  mobile: res.data.mobileNo,
                  homeNo: res.data.homeNo,
                  officeNo: res.data.officeNo,
                  remarks: res.data.remarks,
                  mcId: res.data.mcId,
                  timesheetId: res.data.timesheetId
                })     
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/"+this.state.month+"/"+this.state.year+"")
        .then(response => {
            this.setState(
                {
                    DayAndDate: response.data
                }
            )
        })
        })
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
  
 submitTimesheethandler = () => {
      

       for(let i=0; i< this.state.Calendar.length; i++)
       {
       this.state.Calendar[i].push(this.state.alignment[i + 1])
       }
       console.log(this.state.Calendar)
    const values = {
        approved: true,
        companyName: this.state.clientCompany,
        empName: this.state.empName,
        employeeId: this.state.empID,
        hidden: true,
        homeNo: this.state.homeNo,
        managerEmail: this.state.managerEmail,
        managerName: this.state.managerName,
        mcId: this.state.mcId,
        mobileNo: this.state.mobile,
        month: this.state.month,
        officeNo: this.state.officeNo,
        password: "string",
        remarks: this.state.remarks,
        timesheet: btoa(this.state.alignment),
        timesheetId: this.state.timesheetId,
        year: this.state.year
 }
 console.log(values)
 axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/submit", values)
 .then(res => console.log(res.data))
 .then(this.setState(
    {
        open: true
    }
))

 }

    render()
    {
        console.log(this.state.timesheet.mobileNo)
        console.log("hello")
        console.log(this.state.timesheet)
        console.log(this.state.alignment)
    
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
            timesheetId: this.props.location.timesheetId,
            name: "editTimesheet",
            mcId: this.state.mcId.split(',')
             }}
            style={{"textDecoration": "none"}}><Button variant="contained" 
            style={{"marginTop": "20px"}}
            >Edit Attachments</Button></NavLink>
                </div>

                <div style={{"width": "300px"}}>
                  <b><p>Mobile No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.mobile}
                   onChange={this.mobileChangeHandler}
                     />
                </div>
                <div style={{ "width": "300px"}} >
                <b><p>Home No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.homeNo}
                   onChange={this.homeChangeHandler}
                     />
                </div>
                <div style={{"width":"300px"}}> 
                <b><p>Office No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   value={this.state.officeNo}
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
                   value={this.state.remarks}
                   onChange={this.remarksChangeHandler}
                   fullWidth
                     />
                </div>


                    {this.state.DayAndDate.map((cal, i) => {
            return(
                <div>
                <Table>
                <TableBody>
                <TableCell>
                 {cal[1]}<br/>
                 {cal[0]}
                <TextField
                   input type = "text"
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   value={this.state.alignment[i + 1]} 
                   key={cal[0]}
                   exclusive 
                   onChange={(e) => this.handleChange(i + 1,e.target.value)} 
                     />
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
              <DialogTitle id="alert-dialog-title">{"Successfully edited and submitted the Timesheet!!"}</DialogTitle>

              <DialogActions>
              <NavLink to={{ 
               pathname:'/employee/viewTimesheet'
             }}
               style={{color: 'white', textDecoration: 'none'}}> 
              <Button variant="contained">OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>
                 </Container>    
            </div>
           
        )
    }
}
export default EditTimesheet;


