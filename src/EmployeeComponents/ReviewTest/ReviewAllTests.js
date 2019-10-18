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
        count: 1,
        testSubttypeData: []
        }
    }

    componentDidMount() {
        axios.get('http://192.168.200.200:8080/backendapi/employee/'+localStorage.getItem('employeeid')+'/tests/review/all/test-result')   
        .then(response => {
             this.setState({ 
                 tests: response.data 
                })
                this.setState({ 
                    tests: this.state.tests.filter(el => el.testType !== "" && el.testSubtype !== ""),
                    testSubttypeData: this.state.tests.map(el => el.testSubtype)
                   })

             
           }, () => {
             console.log(this.state.testSubttypeData)
           })
          
           .catch((error) => {
             console.log(error);
           })
           
         
       }

       attemptsCount = () => 
       {
        // console.log(this.state.tests+"hello sub")
        //  return(
        //    <p>
        //      {this.state.testSubttypeData}
        //    </p>
        //  )
       
        // for (let i = 0; i < this.state.testSubttypeData.length; i++) 
        // { for (let j = i + 1 ; j < this.state.testSubttypeData.length; j++) 
        //   { if (this.state.testSubttypeData[i].equals(this.state.testSubttypeData[j])) 
        //     { 
        //      return(
        //        <p>true</p>
        //      )
        //     } } }

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
        // {
        //   name: "Attempts",
        //   options: {
        //     filter: false,
           
        //   }
        // },
     
    
  ]

  return(
    <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable 
    title={"Review Tests"}
    data={this.state.tests.concat().reverse().map((currentemp, i) => {
        return [

           currentemp.testType,
           currentemp.testSubtype, 
        <NavLink to={{pathname: '/employee/review', 
        testDetailID: currentemp.resultId, testName: currentemp.testSubtype}} style={{"textDecoration": "none"}} >
          <Button style={{"text-transform": "none"}} variant= "contained">
         Review
       </Button>
       </NavLink>,
        // this.attemptsCount()

        ]})}

    columns={columns}
    options={options}
    />
    </MuiThemeProvider> 
    )

}
}

export default ReviewAllTests;