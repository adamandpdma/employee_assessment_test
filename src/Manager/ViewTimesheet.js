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


class ViewTimesheet extends Component{
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
            open: false,
            approveStatus: false,
            comment: '',
            openApproved: false,
            openRejected: false,
        }
    }
     
    componentDidMount = () => { 
        axios.get("http://192.168.200.200:8080/backendapitest/manager/timesheets/"+this.props.location.timesheetId+"")
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
                  timesheetId: res.data.timesheetId,
                })     
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+this.state.empID+"/timesheets/"+this.state.month+"/"+this.state.year+"")
        .then(response => {
            this.setState(
                {
                    DayAndDate: response.data
                }
            )
        })
        })
    }
    approveHandler = () => {
            this.setState(
                {
                    approveStatus: true
                }, () => {
                    const values = [
                        this.state.approveStatus,
                        this.state.comment
                    ]
        
                    axios.post("http://192.168.200.200:8080/backendapitest/manager/timesheets/"+this.props.location.timesheetId+"/approve", values)
                    .then(res=> console.log(res.data))
                    .then(this.openApprovedHandler())
                }
            )   
    }
    openApprovedHandler = () => {
   
            this.setState(
                {
                    openApproved: true
                }
            )
     
    }
    openRejectedHandler = () => {
     
            this.setState(
                {
                    openRejected: true
                }
            )
    
    }
    rejectReason = () => 
    {
        this.setState(
            {
                open: true
            }
        )
    }
    commentHandler = (event) => 
    {
        this.setState(
            {
                comment: event.target.value
            }
        )
    }
    rejectHandler = () => {
        console.log(this.state.comment)
        this.setState(
            {
                open: false,
                approveStatus: false
            }, () => {
                const values = [
                    this.state.approveStatus,
                    this.state.comment
                ]
        
                axios.post("http://192.168.200.200:8080/backendapitest/manager/timesheets/"+this.props.location.timesheetId+"/approve", values)
                .then(res=> console.log(res.data))
                .then(this.openRejectedHandler())
            }
        )
    
    }
    render()
    {
    
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
            pathname: '/managerLogin/viewMCAttachment',
            timesheetId: this.state.timesheetId,
            name: "viewTimesheet",
            mcId: this.state.mcId.split(','),
            employeeId: this.state.empID
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
                   <Button variant="contained"
                   style={{"width":"200px", "margin": "30px",
                   "backgroundColor": "#118f41", "color": "white"}}
                   onClick={this.approveHandler}>APPROVE</Button>

                  <Button variant="contained"
                  style={{"width":"200px", "margin": "30px",
                  "backgroundColor": "#de0220",
                  "color": "white"}}
                  onClick={this.rejectReason}>REJECT</Button>

             <Dialog
             open={this.state.open}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"State the reason to reject the timesheet"}</DialogTitle>

              <DialogActions>
              <TextField
                   input type = "text"
                   variant="outlined"
                   margin="normal"
                   multiline={true}
                   value={this.state.comment}
                   onChange={this.commentHandler}
                   fullWidth
                     /><br/>
              <Button variant="contained"
              onClick={this.rejectHandler}>OKAY</Button>
              </DialogActions>
              </Dialog>

              <Dialog
             open={this.state.openApproved}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Approved Successfully!"}</DialogTitle>

              <DialogActions>
               
               <NavLink to='/'
               style={{"textDecoration": "none"}}>
              <Button variant="contained"
              >OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>

              <Dialog
             open={this.state.openRejected}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Rejected Successfully!"}</DialogTitle>

              <DialogActions>
               
               <NavLink to='/'
               style={{"textDecoration": "none"}}>
              <Button variant="contained"
              >OKAY</Button></NavLink>
              </DialogActions>
              </Dialog>
                 </Container>    
            </div>
           
        )
    }
}
export default ViewTimesheet;


