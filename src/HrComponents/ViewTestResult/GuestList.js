import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default class GuestList extends Component {
  constructor(props) {
    super(props);

    this.state = {guests: []};
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
    axios.get('http://192.168.200.200:8080/backendapi/human-resources/{hrId}/guests')
      .then(response => {
        this.setState
        ({ 
            guests: response.data 
        })
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
          name: "Guest ID",
          options: {
            filter: false,
          
          }
        },
        {
          name: "Name",   
          options: {
            filter: false,
           
          }
        },
        {
          name: "NRIC",
          options: {
            filter: false,
           
          }
        },
      {
        name: "Graduation Level",
        options: {
          filter: true,
    
        }
      },
        {
            name: "GPA",
            options: {
              filter: true,

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
  
        title={"Guest Database"}
        data={this.state.guests.map(currentemp => {
            return [
              currentemp.guestId,
              currentemp.name,
              currentemp.nric,
              currentemp.educationLevel,
              currentemp.gpa,

              <Link to={{pathname:'/hr/GuestResult',
               guestId: currentemp.guestId,
               name:currentemp.name,
               mobileNo: currentemp.mobileNo,
               email: currentemp.email,
               nric: currentemp.nric}}
                style={{"textDecoration": "none"}}>
              <Fab variant="contained" 
              style={{width: "120px", height:"60px", "text-transform": "none", padding: "5px", textDecoration: "none"}}>
               View Test Details
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





