import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Navstyle={
    textDecoration: "none"
}
const style ={
    textDecoration: "none",
    width: "50px",
    margin: '10px',
    borderRadius: "30px",
    fontSize: "10px"
    }
const textStyle={
            padding: "25px"
        }
export default class ViewTest extends Component {
  constructor(props) {
    super(props);

    this.deleteTest = this.deleteTest.bind(this);

    this.state = {
        data: [],
        testCat: this.props.location.domain
      
  }
}


  componentDidMount() 
  {
    console.log(this.state.domain)
    if(this.state.testCat === "Technical")
    {
        axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/category/'+this.state.testCat)
        .then(res => {
            this.setState (
                {
                    data: res.data
                }
             )
             this.setState(
                {
                    data: this.state.data.filter(el => el.testCat === "Technical" && el.isHidden === false),
                }
            )
          
        })
    }
    else
    {
        axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/category/'+this.state.testCat)
        .then(res => {
            this.setState(
                {
                    data: res.data
                }
             )
             this.setState(
                {
                    data: this.state.data.filter(el => el.testCat === "Non-Technical" && el.isHidden === false),
                }
            )
          
        })
    }
  }
  
  deleteTest = (id) => 
  {
  console.log(id)
   axios.post('http://192.168.200.200:8080/backendapi/admin/test-detail/hide/'+id)
   .then((res) => console.log(res.data)) 

   this.setState(
       {
           data: this.state.data.filter(el => el.settingsId !== id) ,
           isHidden: true
       }
   )
  }
        navigateBack = () => 
      {
          if(this.state.testCat === "Technical")
          {
              return(
                <Grid>
                <NavLink to='/Technical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
                <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>VIEW TEST</h3>			
                </Grid>
              )
          }
          else{
              return(
                <Grid>
                <NavLink to='/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
                <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>VIEW TEST</h3>			
                </Grid>
              )
          }
      }

  render() {
     
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
          name: "Domain",
          options: {
              filter: false,
          }
        },
        {
          name: "Category",
          options: {
            filter: true,
          
          }
        },
        {
          name: "Type of Test",   
          options: {
            filter: true,
           
          }
        },
        {
          name: "Number of Questions",
          options: {
            filter: false,
           
          }
        },
      {
        name: "Time Limit",
        options: {
          filter: false,
    
        }
      },
     
        {
            name: "Action",
            options: {
              filter: false,

            }
        }
    
  ]

    return (
    <MUIDataTable 

        title={"Test Details"}
        data={this.state.data.map(currentemp => {
            return [
               currentemp.testCat,
               currentemp.testType,
               currentemp.testSubtype,
               currentemp.noOfQns,
               currentemp.timeLimit,
               <TableCell><NavLink to={{pathname: '/editTest/'+currentemp.settingsId, 
               aboutprops: currentemp.testCat, 
               aboutpropsTwo: currentemp.settingsId}} style={Navstyle}>
                    <Button variant="contained"  style={style}>EDIT</Button>
                    </NavLink> 
                    <Button variant="contained" href="#" onClick = {() => this.deleteTest(currentemp.settingsId)}  style={style}>
                        DELETE</Button></TableCell>

            ]})}

        columns={columns}
        options={options}
        
        /> 

    )
  }
}




      
      