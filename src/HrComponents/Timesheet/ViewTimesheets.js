import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import {  MuiThemeProvider } from '@material-ui/core/styles';
import { getMuiTheme } from "../../EmployeeComponents/Timesheet/MuiDatatablesTheme";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


class ViewTimesheets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        timesheets: [],
        count: 1,
        approved: '',
        open: false,
        timesheetId: 0,
        openConfirmation: false
        }
    }

    componentDidMount() {
        console.log("hello HR")
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+this.props.location.employeeId+"/timesheets")
        .then(response => {
             this.setState({ 
                 timesheets: response.data.filter(el => el.hidden === false && el.approved === true)
                })       
           })
 
        .catch((error) => {
             console.log(error);
           })
           
         
       }

       Month = (month) => {
            if(month === "12")
            {
                return(
                    <p>DEC</p>
                )
            }
            if(month === "11")
            {
                return(
                    <p>NOV</p>
                )
            }
            if(month === "10")
            {
                return(
                    <p>OCT</p>
                )
            }
            if(month === "09")
            {
                return(
                    <p>SEP</p>
                )
            }
            if(month === "08")
            {
                return(
                    <p>AUG</p>
                )
            }
            if(month === "07")
            {
                return(
                    <p>JUL</p>
                )
            }
            if(month === "06")
            {
                return(
                    <p>JUN</p>
                )
            }
            if(month === "05")
            {
                return(
                    <p>MAY</p>
                )
            }
            if(month === "04")
            {
                return(
                    <p>APR</p>
                )
            }
            if(month === "03")
            {
                return(
                    <p>MAR</p>
                )
            }
            if(month === "02")
            {
                return(
                    <p>FEB</p>
                )
            }
            if(month === "01")
            {
                return(
                    <p>JAN</p>
                )
            }
       }
       Buttons = (approved, timesheetId) => {
         if(approved === false)
         {
           return(             
              <div>
                  <NavLink to={{pathname:"/employee/viewSubmittedTimesheet",
                   timesheetId: timesheetId}}
                  style={{"textDecoration": "none"}}><Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>VIEW
                  </Button></NavLink>
                  <NavLink to={{pathname: '/employee/editTimesheet',
                   timesheetId: timesheetId}} style={{"textDecoration": "none"}}>
                       <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>EDIT</Button></NavLink>
                  <Button variant="contained" 
                  style={{"width":"120px", "padding": "10px", "margin": "15px"}}
                  href="#" onClick = {() => this.deleteTimesheetConfirmation(timesheetId)} >DELETE</Button> 
              </div>
           )
         }
         if(approved === true){
             return(
                <NavLink to={{pathname: "/hr/Timesheet",
                timesheetId: timesheetId,
                employeeId: this.props.location.employeeId}}
                style={{"textDecoration": "none"}}><Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>
                    VIEW</Button></NavLink>   
             )
         }
       }
       deleteTimesheetConfirmation = (timesheetId) => 
       {
       this.setState(
         {
           open: true,
           timesheetId: timesheetId
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
      deleteTimesheet = () => {
        this.setState(
          {
            open: false
          }
        )
       axios.post("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/"+this.state.timesheetId+"/hide")
       .then((res) => console.log(res.data)) 
       .then(this.handleclickopen)
    
       this.setState(
           {
               timesheets: this.state.timesheets.filter(el => el.timesheetId !== this.state.timesheetId) ,
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
        console.log("hello HR")
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
          name: "MONTH",   
          options: {
            filter: true,
           
          }
        },
        
        {
          name: "YEAR",
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
    title={"TIMESHEETS"}
    data={this.state.timesheets.concat().reverse().map((currentemp, i) => {
        return [
           i + 1,
           this.Month(currentemp.month),
           currentemp.year, 
           <TableCell>
            {this.Buttons(currentemp.approved, currentemp.timesheetId)}
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
<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete ?"}</DialogTitle>

<DialogActions>
<Button onClick ={this.handleClose}>
CANCEL
</Button>
<Button onClick ={this.deleteTimesheet}>
CONFIRM
</Button>
</DialogActions>
</Dialog>
<Dialog
open={this.state.openConfirmation}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{"Successfully Deleted your Timesheet !"}</DialogTitle>

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
export default ViewTimesheets;


