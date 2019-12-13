//orginal
import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField, Button} from '@material-ui/core';
import MCUpload from './MCUpload'
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from 'react-router-dom';
import DatePicker from './DatePicker'


const ObjectRow = (props) => {


    return(
        <div>
        <TableCell>
            {props.keyValue}
        </TableCell>
        <TableCell>
       <DatePicker keyValue={props.keyValue} ij={props.ij}/><br/>
         <div>
             <p>Reason</p>
             <TextField
               input type = "text"
               variant="outlined"
               margin="normal"
               fullWidth
               multiline={true}
               onChange={props.reasonHandler}
               />
         </div><br/>
         <MCUpload numberofquestions={props.numberofquestions} />
           {(props.keyValue === props.ij)&& (
            <Button variant="contained" 
            onClick={(event) => props.reasonArray(event)}
            style={{"backgroundColor": "#648fcc", "color": "white"}}
            disabled={props.disable}
            >DONE</Button>
         )}
         </TableCell>
  
       
   
    </div>)
}

let reason = [];
class TestRows extends React.Component {

constructor(props)
{
  super(props);
  this.state = {
    MC : this.props.location.MCcount,
    Days : this.props.location.DaysCount,
    empID : this.props.location.empID,
    empName : this.props.location.empName,
    managerEmail : this.props.location.managerEmail,
    managerName : this.props.location.managerName,
    clientCompany : this.props.location.clientCompany,
    month: this.props.location.month,
    year: this.props.location.year,
    reason: '',
    reasonErorr: '',
    disable: false,
    ij : 1,
    open: false,
    mcIds: '',
  }
}

reasonHandler = (event) => {
  this.setState(
    {
        reason: event.target.value,
        fromDate: this.props.location.selectedDate,
        toDate: this.props.location.selectedDateTwo
    }
  )
}
rows = () => 
{
    let rows = [];
for (let i = 0; i < this.state.MC; i++) {
    rows.push(<ObjectRow 
        key={i} 
        keyValue={i+1} 
        keyData={i}
        numberofquestions={this.state.MC}
        reasonHandler={this.reasonHandler}
        reasonArray = {(event) => this.reasonArray(event)}
        disable = {this.state.disable}
        ij = {this.state.ij}
         />);
}
return <TableBody>{rows}</TableBody>;
}
reasonArray = () => 
{
  // if(this.props.location.testTwo === undefined)
  // {
  //   alert("Upload an Image !")
  // }
  // if(this.state.reason === '')
  // {
  //   alert("enter the Reason!")
  // }
  // if(this.state.dateFrom === undefined && this.state.toDate === undefined || this.state.dateFrom === undefined || this.state.toDate === undefined   )
  // {
  //   alert("choose the date")
  // }

  // if(this.state.dateFrom === "" && this.state.toDate === "" && this.state.reason === '' && this.props.location.testTwo === undefined   )
  // {
  //   alert("Please, Fill in all the details")
  // }
  // if(this.state.reason.match("^[A-z 0-9]+$") && this.props.location.testTwo !== undefined &&
  //   this.state.dateFrom !== undefined && this.state.toDate !== undefined)
  // {
    const values = {
      approved: true,
      company: this.state.clientCompany,
      dateFrom: this.state.fromDate,
      dateTill: this.state.toDate,
      empName: this.state.empName,
      employeeId: parseInt(this.state.empID),
      hidden: true,
      managerEmail: this.state.managerEmail,
      managerName: this.state.managerName,
      mcId: 0,
      mcImg: this.props.location.testTwo.split(',')[1],
      noOfDays: parseInt(this.state.Days),
      reason: this.state.reason
    }
      
    reason.push(values)
    console.log(reason)
  
    this.setState(
      {
        disable: false,
        ij : this.state.ij + 1
      }
    )
  // }
}

validate = () => 
{
  let isError = false;
  const errors ={};

  if(isError){
      this.setState(
          {
              ...this.state,
              ...errors
          });
  }

  return isError;
}

onSubmitHandler = (event) => 
{
  event.preventDefault();

  const err = this.validate();
  if(!err)
  {
    axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/MC/submit", reason)
    .then(res => this.setState(
      {
        mcIds: res.data
      }
    ))
    .then(this.handleClickOpen)
  }
}

handleClickOpen = () => 
{
  this.setState(
    {
      open: true
    }
  )
}

  render() {  
     return(
        <div>
            <div>
                <Container maxWidth="400" >
         <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                >
                <Grid item xs={12}>
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
    fullWidth
    value={this.state.MC}
  />
    </Grid>
         </div>
         <div>
          <p>Number of Days</p>
          <Grid item xs={6}>
    <TextField
    input type = "number"
    variant="outlined"
    margin="normal"
    fullWidth
    value={this.state.Days}
  /></Grid></div>
        </Container>
        </div>
            <Table>
              <TableBody>
               {this.rows()}<br/>
              </TableBody>
              </Table>
                  <Button 
               variant="contained" 
               style={{"backgroundColor": "#648fcc", "color": "white"}}
               onClick={this.onSubmitHandler}
               >
                   Proceed
               </Button>
              </Grid>
                </Grid>
                </Container>
                </div>
                <Dialog
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You've successfully submitted your MC !"}</DialogTitle> 
        <DialogActions>
           <NavLink to={{pathname: '/employee/fillTimesheet',
           month: this.state.month,
           year: this.state.year,
           mcIds: this.state.mcIds.split(','),
           empID: this.state.empID,
           empName: this.state.empName,
           managerEmail: this.state.managerEmail,
           managerName: this.state.managerName,
           clientCompany: this.state.clientCompany
           }} style={{"textDecoration": "none"}}><Button color="primary" autoFocus>
         OKAY
        </Button></NavLink> 
        </DialogActions>
      </Dialog>
                </div>
            
    )
  }
}
export default TestRows;




  



















