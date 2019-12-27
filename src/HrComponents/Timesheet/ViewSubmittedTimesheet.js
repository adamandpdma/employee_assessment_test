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

class ViewSubmittedTimesheet extends Component{
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
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+this.props.location.employeeId+"/timesheets/"+this.props.location.timesheetId+"")
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
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+this.props.location.employeeId+"/timesheets/"+this.state.month+"/"+this.state.year+"")
        .then(response => {
            this.setState(
                {
                    DayAndDate: response.data
                }
            )
        })
        })
    }

    render()
    {
    
        return(
            <div>
                          <NavLink to={{pathname:'/hr/timesheetsList',
                       employeeId: this.props.location.employeeId
                    }}
                       style={{"textDecoration": "none"}}
                   >
                         <Button variant="contained"
                          style={{"backgroundColor": "#648fcc", "color": "white", "margin": "10px"}}>BACK</Button>
                         </NavLink>   
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
            pathname: '/hr/MCAttachment',
            timesheetId: this.state.timesheetId,
            name: "viewTimesheet",
            mcId: this.state.mcId.split(','),
            employeeId: this.props.location.employeeId
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
                   value={this.state.mobile}
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
                     />
                </div>
                <div style={{"width":"300px"}}> 
                <b><p>Office No</p></b>
                  <TextField
                   input type = "number"
                   variant="outlined"
                   margin="normal"
                   value={this.state.officeNo}
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
                     />
                  </TableCell>
                  </TableBody>
                  </Table>
                </div>
         
            )
        })} 
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
export default ViewSubmittedTimesheet;


