import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import {  MuiThemeProvider } from '@material-ui/core/styles';
import { getMuiTheme } from "./MuiDatatablesTheme";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// CODE WRITTEN BY - FAHEMA
class ViewLeaveApplication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        leave: [],
        count: 1,
        approved: '',
        open: false,
        leaveId: 0,
        openConfirmation: false
        }
    }

    componentDidMount() {
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/leave")
        .then(response => {
             this.setState({ 
                 leave: response.data.filter(el => el.hidden === false)
                })       
           })
 
        .catch((error) => {
             console.log(error);
           })
           
         
       }

       Buttons = (approved, leaveId) => {
         if(approved === false)
         {
           return(             
              <div>
                   <NavLink to={{pathname:'/employee/viewSubmittedLA',
                  leaveId: leaveId}}
                  style={{"textDecoration": "none"}}><Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>VIEW</Button></NavLink>      
                  <NavLink to={{pathname:'/employee/editLeaveApplication',
                  leaveId: leaveId}}
                  style={{"textDecoration": "none"}}><Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>EDIT</Button></NavLink>
                  <Button 
                  variant="contained" 
                  style={{"width":"120px", "padding": "10px", "margin": "15px"}}
                  href="#" onClick = {() => this.deleteLeaveApplication(leaveId)} >DELETE</Button> 
              </div>
           )
         }
         if(approved === true){
             return(
                <NavLink to={{pathname:'/employee/viewSubmittedLA',
                leaveId: leaveId}}
                style={{"textDecoration": "none"}}><Button 
                variant="contained" 
                style={{"width":"120px", "padding": "10px", "margin": "15px"}}
                href="#" onClick = {() => this.deleteLeaveApplication(leaveId)}  >VIEW</Button> </NavLink>  
             )
         }
       }
    deleteLeaveApplication = (leaveId) => 
    {
    this.setState(
      {
        open: true,
        leaveId: leaveId
      }
    )
    }
    handleClose = () => {
        this.setState(
            {
                open: false
            }
        )
    }
      deleteData = () => {
        this.setState(
          {
            open: false
          }
        )
    
       axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/leave/"+this.state.leaveId+"/hide")
       .then((res) => console.log(res.data)) 
       .then(this.handleclickopen)
    
       this.setState(
           {
               leave: this.state.leave.filter(el => el.leaveId !== this.state.leaveId) ,
           }
       )
      }
    handleclickopen = () => {
        this.setState(
            {
                openConfirmation: true
            }
        )
    }
    handleCloseConfirmation = () => {
      this.setState(
          {
              openConfirmation: false
          }
      )
    }
       render(){
       const options = {
        selectableRows: false,
        filterType: "dropdown",
        selectableRowsOnClick: false,
        download: false, 
        print: false,
        viewColumns: false   
         }; 
  
        
      const columns = [
         
        {
          name: "S.NO",
          options: {
            filter: false,
          
          }
        },
        {
          name: "FROM DATE",   
          options: {
            filter: true,
           
          }
        },
        
        {
          name: "TO DATE",
          options: {
            filter: true,
           
          }
        },
        {
            name: "ACTION",
            options: {
              filter: false,
             
            }
          },   
  ]

  return(
    <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable 
    title={"Leave Application"}
    data={this.state.leave.concat().reverse().map((currentemp, i) => {
        return [
           i + 1,
           currentemp.dateFrom, 
           currentemp.dateTill,
           <TableCell>
            {this.Buttons(currentemp.approved, currentemp.leaveId)}
           </TableCell>
        ]})}

    columns={columns}
    options={options}
    />
    <Dialog
open={this.state.open}
onClose={this.handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete ? "}</DialogTitle>

<DialogActions>
<Button onClick ={this.handleClose}>
CANCEL
</Button>
<Button onClick ={this.deleteData}>
CONFIRM
</Button>
</DialogActions>
</Dialog>

<Dialog
open={this.state.openConfirmation}
onClose={this.handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{"Successfully Deleted your Leave Application !"}</DialogTitle>

<DialogActions>
<Button onClick ={this.handleCloseConfirmation}>
OKAY
</Button>
</DialogActions>
</Dialog>

    </MuiThemeProvider> 
    )

}
}
export default ViewLeaveApplication;

