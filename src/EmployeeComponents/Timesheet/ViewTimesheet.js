import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import {  MuiThemeProvider } from '@material-ui/core/styles';
import { getMuiTheme } from "./MuiDatatablesTheme"


class ViewTimesheet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        timesheets: [],
        count: 1,
        approved: ''
        }
    }

    componentDidMount() {
        axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets")
        .then(response => {
             this.setState({ 
                 timesheets: response.data 
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
       Buttons = (timesheetId) => {
         axios.get("http://192.168.200.200:8080/backendapitest/employee/"+localStorage.getItem('employeeid')+"/timesheets/"+timesheetId+"")
         .then(res => 
             this.setState(
                 {
                   approved: res.data.approved
                 }
             )
         )
         if(this.state.approved === false)
         {
           return(             
              <div>
                  <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>VIEW</Button>      
                  <NavLink to={{pathname: '/employee/editTimesheet',
                   timesheetId: timesheetId}} style={{"textDecoration": "none"}}><Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>EDIT</Button></NavLink>
                  <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>DELETE</Button> 
              </div>
           )
         }
         if(this.state.approved === true){
             return(
                <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>VIEW</Button>     
             )
         }
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
            {this.Buttons(currentemp.timesheetId)}
           </TableCell>
        ]})}

    columns={columns}
    options={options}
    />
    </MuiThemeProvider> 
    )

}
}
export default ViewTimesheet;



// <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>VIEW</Button>      
// <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>EDIT</Button> 
// <Button variant="contained" style={{"width":"120px", "padding": "10px", "margin": "15px"}}>DELETE</Button> 