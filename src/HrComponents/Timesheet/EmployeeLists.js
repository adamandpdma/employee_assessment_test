import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {employees: []};
  }


  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFF",
          width: "150px",
          "font-size": 15,
          height: "100px",
          
        }, 
      },
      MUIDataTableToolbar:{
        filterPaper:{
        width : '320px',
        left: '1000px !important'
        }
        },
        MUIDataTableHeadCell: {
          root: {
            "font-size": 15,
            "font-weight": "bold"
          },
          },
    }
  })

  componentDidMount() {
    axios.get('http://192.168.200.200:8080/backendapitest/admin/employees')
      .then(response => {
        this.setState
        ({ 
            employees: response.data 
        })
        this.setState(
            {
           employees: this.state.employees.filter(el => el.isActive === true),
            }
        )
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
 

  render() {
    const options = {
        selectableRows: false,
        filterType: "dropdown",
        selectableRowsOnClick: false,
        download: false,
        print: false,
        viewColumns: false,
        rowsPerPage: 5
     
         }; 
  
        
      const columns = [
        {
          name: "",
          options: {
            filter: false,

          }
      },
        {
          name: "EMPLOYEE ID",
          options: {
            filter: false,
          
          }
        },
        {
          name: "USERNAME",   
          options: {
            filter: false,
           
          }
        },
        {
          name: "EMAIL",
          options: {
            filter: false,
           
          }
        },
      {
        name: "DEPARTMENT",
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
    

    return (
     <MuiThemeProvider theme={this.getMuiTheme()}>
    <MUIDataTable 
  
        title={"Employee Database"}
        data={this.state.employees.concat().reverse().map(currentemp => {
            return [
              <img style={{width: 85, height: 85, borderRadius: 85/ 2}} src={`data:image/jpeg;base64,${currentemp.profileImg}`} />,
             
              currentemp.employeeId,
              currentemp.name,
              currentemp.email,
              currentemp.department,
              <div>
              <Link to={{pathname:'/hr/timesheetsList',
               employeeId: currentemp.employeeId,
               name: currentemp.name}}
                style={{"textDecoration": "none"}}>
              <Fab variant="contained" 
              style={{width: "120px", height:"60px", "text-transform": "none", padding: "5px", textDecoration: "none"}}>
               View Timesheets
              </Fab>          
              </Link>
              <Link 
              to={{pathname:'/hr/LeaveApplicationsList',
              employeeId: currentemp.employeeId,
              name: currentemp.name}}
              style={{"textDecoration": "none"}}>
                <Fab variant="contained" 
                style={{width: "120px", height:"60px", "text-transform": "none", padding: "5px", textDecoration: "none",
                "margin": "30px"}}>
                 View leave Applications
                </Fab>
                </Link>
                </div>
              
            ]})}

        columns={columns}
        options={options}
        
        /> 
      </MuiThemeProvider>

    )
  }
}