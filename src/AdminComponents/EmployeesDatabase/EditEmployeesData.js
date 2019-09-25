import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
//dialog imports
import {FormActivateDialog, FormDeactivateDialog} from "./ConfirmationDialogs";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class EditEmployees extends Component {
  constructor(props) {
    super(props);

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeActivate=this.onChangeActivate.bind(this);
    this.onChangeDeactivate=this.onChangeDeactivate.bind(this);

     this.state = {
      userID: '',
      username: '',
      email: '',
      date: new Date(),
      active: '',
      open: false,
      adminPassword: '',
      error: '',
      isActive: ''
    }
  }

  componentDidMount() {
    axios.get('http://192.168.200.200:8080/backendapi/admin/employees/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          employeeId: response.data.employeeId,
          email: response.data.email,
          name: response.data.name,
          department: response.data.department,
          isActive: response.data.isActive,
          image: response.data.profileImg,
          password: response.data.password

        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  onChangeUserID(e) {
    this.setState({
      userID: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
      e.preventDefault();

      if (this.state.adminPassword !== localStorage.getItem('password')) {
        return this.setState({ error: 'Incorret password. Please try again.' });
      }

      this.handleOnSubmit();
  
      this.handleClose();
    }

 
  onChangeActivate() {
    this.setState({
      status: "Active"
      
    })

  }

  onChangeDeactivate() {
    this.setState ({
      status: "Inactive"
      
    })
  } 

  onClickBackBtn() {
    window.location="/admin/employees";
  }

   handleClickOpen = () => {
    this.setState({
      open: true
    })

  }

   handleClose = () => {
    this.setState({
      open: false
    })
  } 

  handleOnSubmit = () => {

    const employee = {
      employeeId: this.state.employeeId,
      email: this.state.email,
      name: this.state.name,
      department: this.state.department,
      isActive: this.state.isActive,
      image: this.state.image,
      password: this.state.password

    }  

    if(this.state.isActive === true){
      this.setState({
        isActive: false
      }, () => {
        axios.put('http://192.168.200.200:8080/backendapi/admin/employees/' + this.props.match.params.id + '/deactivate', employee)
        .then(res => console.log(res.data));
      })

     
    }

    if(this.state.isActive === false){
      this.setState({
        isActive: true
      }, () => {
        axios.put('http://192.168.200.200:8080/backendapi/admin/employees/' + this.props.match.params.id + '/activate', employee)
        .then(res => console.log(res.data));
      })

      
    }
  }

  statusIsActive(value) {
    if (value === true) 
    return (
      <label style={{color: "green", "font-weight": "bold"}}>Active</label>
    );
    else
      return (
        <label style={{color: "red", "font-weight": "bold"}}>Inactive</label>
      );
    }

  handlePassChange = (evt) => {
    this.setState({
      adminPassword: evt.target.value,
    });
  }
  
  render() {

    const status = this.state.status;
    let activatebtn, deactivatebtn;
    const imageData = this.state.image

  if(this.state.isActive === true) {
      activatebtn = <Button id="activate" onClick={this.handleClickOpen} disabled={true}  style={{"text-transform": "none", "color": 'grey'}}variant="contained">Activate Account</Button>
      deactivatebtn = <Button id="deactivate" onClick={this.handleClickOpen} disabled={false}  style={{"text-transform": "none", "color": '#8b0000'}}variant="contained">Deactivate Account</Button>
   } 
   else {
    activatebtn = <Button id="activate" onClick={this.handleClickOpen} disabled={false}  style={{"text-transform": "none", "color": 'green'}}variant="contained">Activate Account</Button>
    deactivatebtn = <Button id="deactivate" onClick={this.handleClickOpen} disabled={true}  style={{"text-transform": "none", "color": 'grey'}}variant="contained">Deactivate Account</Button>
  }

    return (
    <div>
      <h4>Manage Employee Account</h4>
      <Box display="flex" p={1} >
      <Table rowHeight={10} style={{ width: "auto"}}>
        <TableBody>
         
          <TableRow >
          <TableCell rowSpan={4} style={{"borderBottom":"none"}}>
          <img style={{width: 150, height: 150, borderRadius: 150/ 2}} src={`data:image/jpeg;base64,${imageData}`} />
            </TableCell>
          <TableCell style={{"borderBottom":"none"}} >
            Employee ID:
          </TableCell>
          <TableCell >
            {this.state.employeeId}
          </TableCell>
          <TableCell style={{"borderBottom": "none"}}>

          </TableCell>
          </TableRow>
          
          <TableRow >
          <TableCell style={{"borderBottom":"none"}}>
            Employee Name:
          </TableCell>
          <TableCell >
            {this.state.name}
          </TableCell>
          </TableRow>
          
          <TableRow >
          <TableCell style={{"borderBottom":"none"}}>
            Email:
          </TableCell>
          <TableCell >
            {this.state.email}
          </TableCell>
          </TableRow>
          
          <TableRow >
          <TableCell style={{"borderBottom":"none"}}>
            Department:
          </TableCell>
          <TableCell >
            {this.state.department}
          </TableCell>
          </TableRow>

          <TableRow >
          <TableCell style={{"borderBottom":"none"}}>
          <Button variant="contained" style={{"text-transform": "none"}} onClick={this.onClickBackBtn}>Back</Button>
          </TableCell>
          <TableCell style={{"borderBottom":"none"}}>
            Status:
          </TableCell>
          <TableCell style={{"borderBottom":"none"}}>
         {this.statusIsActive(this.state.isActive)}
          </TableCell>
          </TableRow>

        </TableBody>
      </Table>
     
      <Box p={1} order={3} bgcolor="">
      {activatebtn}

      </Box>
      <Box p={1} order={3} bgcolor="">
      {deactivatebtn}
      </Box>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <form className="mui-form" onSubmit={this.onSubmit}>
          <DialogTitle id="form-dialog-title">Activate/Deactivate Employee Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Please provide administrator password to confirm changes
            </DialogContentText>
            <TextField helperText={this.state.error} value={this.state.adminPassword} onChange={this.handlePassChange} autoFocus margin="dense" id="name" label="Password" type="password"/>
          </DialogContent>
          <DialogActions> 
            <Button onClick={this.handleClose} variant="contained">
              Cancel
            </Button>
            <Button type="submit" >Confirm</Button>
          </DialogActions> 
          </form>
        </Dialog>
      </Box>

    </div>
    )
  }
}