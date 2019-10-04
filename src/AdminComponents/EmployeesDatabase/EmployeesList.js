import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default class EmployeesList1 extends Component {
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
    axios.get('http://192.168.200.200:8080/backendapi/admin/employees')
      .then(response => {
        this.setState({ employees: response.data })
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
          name: "User ID",
          options: {
            filter: false,
          
          }
        },
        {
          name: "Username",   
          options: {
            filter: false,
           
          }
        },
        {
          name: "Email",
          options: {
            filter: false,
           
          }
        },
      {
        name: "Department",
        options: {
          filter: true,
    
        }
      },
      {
        name: "Account Status",
        options: {
          filter: true,
         
         customFilterListRender: v => {
          if (v === true) {
            return `Active`;
          } else {
            return `Inactive`;
          } 
        },

          customBodyRender: (value) => {
            if (value === true)
              return (
                <label style={{color: "green", "font-weight": "bold"}}>Active</label>
              );
            else
              return (
                <label style={{color: "red", "font-weight": "bold"}}>Inactive</label>
              );
          }
        }
      },
     
        {
            name: "",
            options: {
              filter: false,

            }
        },

  ]
    

    return (
     <MuiThemeProvider theme={this.getMuiTheme()}>
    <MUIDataTable 
  
        title={"Employee Database"}
        data={this.state.employees.map(currentemp => {
            return [
              <img style={{width: 85, height: 85, borderRadius: 85/ 2}} src={`data:image/jpeg;base64,${currentemp.profileImg}`} />,
             
              currentemp.employeeId,
              currentemp.name,
              currentemp.email,
              currentemp.department,
              currentemp.isActive,
              
              <Link to={"/admin/employees/"+ currentemp.employeeId} style={{"textDecoration": "none"}}>
              <Fab variant="contained" style={{width: "120px", height:"60px", "text-transform": "none", padding: "5px"}}>
                Manage Account
              </Fab>
              </Link>,
              
            ]})}

        columns={columns}
        options={options}
        
        /> 
      </MuiThemeProvider>

    )
  }
}