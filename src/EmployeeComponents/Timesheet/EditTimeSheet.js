import React, {Component} from 'react';
import axios from 'axios';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import { TextField, RadioGroup, Container } from '@material-ui/core';
import ViewMCAttachment from './ViewMCAttachment';


class FillTimesheet extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            Calendar : [],
            alignment: '',
            mobile: 0,
            homeNo: 0,
            officeNo:0,
            remarks: '',
            mcIds: this.props.location.mcIds,
            i: 0,
            timesheetId: this.props.location.timesheetId,
            timesheet: []
        }
    }
    componentDidMount = () => {
    
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/"+this.props.location.timesheetId+"")
        .then(res => 
            this.setState(
            {
              timesheet: res.data,
              mobile: res.data.mobileNo,
              homeNo: res.data.homeNo,
              officeNo: res.data.officeNo,
              remarks:res.data.remarks,
              timesheet: atob(res.data.timesheet)
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
 submitTimesheethandler = () => {
      

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
        timesheet: btoa(this.state.Calendar.toString()),
        timesheetId: 0,
        year: this.props.location.year
 }
 console.log(values)
 axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/submit", values)
 .then(res => console.log(res.data))
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
        timesheet: btoa(this.state.Calendar.toString()),
        timesheetId: 0,
        year: this.props.location.year
 }
 console.log(values)
 axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/submit", values)
 .then(res => console.log(res.data))
 }

 }

    render()
    {
        console.log(this.state.timesheet.mobileNo)
        console.log("hello")
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
            mcIds: this.props.location.mcIds,
            empID: this.props.location.empID,
            empName: this.props.location.empName,
            managerEmail: this.props.location.managerEmail,
            managerName: this.props.location.managerName,
            clientCompany: this.props.location.clientCompany,
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
                  </TableCell>
                  </TableBody>
                  </Table>
                </div>
         
            )
        })}
             <Button variant="contained" onClick={this.submitTimesheethandler}>SUBMIT</Button>
                 
                 </Container>    
            </div>
           
        )
    }
}
export default FillTimesheet;


