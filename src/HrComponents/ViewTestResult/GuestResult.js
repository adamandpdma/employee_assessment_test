import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default class GuestResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
        guestId: this.props.location.guestId,
        guests: []
    };
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
    axios.get('http://192.168.200.200:8080/backendapi/human-resources/{hrId}/test-result/guest/'+this.state.guestId)
      .then(response => {
        this.setState({ 
            guests: response.data 
        })
        this.setState(
            {
            guests: this.state.guests.filter(el => el.testType !== "" && el.testSubtype !== ""),
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
          name: "Test Type",
          options: {
            filter: true,
           
          }
        },
      {
        name: "Test Subtype",
        options: {
          filter: true,
    
        }
      },
      {
        name: "Score",
        options: {
          filter: false,
        }
      },
  ]
    

    return (
     <MuiThemeProvider theme={this.getMuiTheme()}>
    <MUIDataTable 
  
        title={"Guest Test Result"}
        data={this.state.guests.map(currentemp => {
            return [
              currentemp.testType,
              currentemp.testSubtype,
              currentemp.score+' / '+((currentemp.userQnsIds.split(',').length) - 1),        
            ]})}

        columns={columns}
        options={options}
        
        /> 
      </MuiThemeProvider>

    )
  }
}



