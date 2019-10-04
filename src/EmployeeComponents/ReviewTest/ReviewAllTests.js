import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { getMuiTheme } from "./MuiDatatablesTheme"


class ReviewAllTests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        tests: [],
        }
    }

    componentDidMount() {
        axios.get("http://192.168.200.200:8080/backendapi/employee/101/tests/review/all/test-result")   
        .then(response => {
             this.setState({ 
                 tests: response.data 
                })
                this.setState({ 
                    tests: this.state.tests.filter(el => el.testType !== "" && el.testSubtype !== "") 
                   })

             
           }, () => {
             console.log(this.state.testDetailID)
           })
          
           .catch((error) => {
             console.log(error);
           })
           
         
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
          name: "Test Type",
          options: {
            filter: false,
          
          }
        },
        {
          name: "Test Name",   
          options: {
            filter: false,
           
          }
        },
        
        {
          name: "Review",
          options: {
            filter: false,
           
          }
        },
     
    
  ]

  return(
    <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable 
    title={"Review Tests"}
    data={this.state.tests.map((currentemp, i) => {
        return [

           currentemp.testType,
           currentemp.testSubtype, 
        <NavLink to={{pathname: '/review', 
        testDetailID: currentemp.resultId, testName: currentemp.testSubtype}} style={{"textDecoration": "none"}} >
          <Button style={{"text-transform": "none"}} variant= "contained">
         Review
       </Button>
       </NavLink>

        ]})}

    columns={columns}
    options={options}
    />
    </MuiThemeProvider> 
    )

}
}

export default ReviewAllTests;