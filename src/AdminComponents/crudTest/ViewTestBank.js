import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
export default class ViewTestBank extends Component {
  constructor(props) {
    super(props);

    this.deleteTest = this.deleteTest.bind(this);

    this.state = {
        data: [],
        testCat: this.props.location.domain,
        open: false,
        openConfirmation: false,
        settingsIdData: 0,
        testBank: ''
      
  }
}


  componentDidMount() 
  {
    console.log(this.state.domain)
    if(this.state.testCat === "Technical")
    {
        axios.get("http://192.168.200.200:8080/backendapitest/admin/questionpool")
        .then(res => {
            this.setState (
                {
                    data: res.data
                }
             )
             this.setState(
                {
                    data: this.state.data.filter(el => el.hidden !== true && el.poolCat === "Technical"
                    && el.noOfQnsInPool !== 0 && el.poolType !== "" && el.poolSubtype !== ""),
                }
            )
          
        })
    }
    if(this.state.testCat === "Non-Technical")
    {
        axios.get("http://192.168.200.200:8080/backendapitest/admin/questionpool")
        .then(res => {
            this.setState(
                {
                    data: res.data
                }
             )
             this.setState(
                {
                    data: this.state.data.filter(el => el.hidden !== true && el.poolCat === "Non-Technical" 
                    && el.noOfQnsInPool !== 0 && el.poolType !== "" && el.poolSubtype !== "" ),
                }
            )
          
        })
    }
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
handleClose = () => {
    this.setState(
        {
            open: false
        }
    )
}
  deleteTest = (id,subtype) => 
  {
    this.setState(
      {
        settingsIdData: id,
        open: true,
        testBank: subtype
      }
    )
  }
  deleteData = () => {
    this.setState(
      {
        open: false
      }
    )

    axios.put('http://192.168.200.200:8080/backendapitest/admin/questionpool/set-hidden/'+this.state.settingsIdData)
    .then((res) => console.log(res.data)) 
    .then(this.handleclickopen())
 
    this.setState(
        {
         data: this.state.data.filter(el => el.poolId !== this.state.settingsIdData),
         hidden: true
        }
    )
  }

        navigateBack = () => 
      {
          if(this.state.testCat === "Technical")
          {
              return(
                <Grid>
                <NavLink to='/admin/Technical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
                <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink>
                <h3 style={textStyle}>VIEW TEST</h3>			
                </Grid>
              )
          }
          else{
              return(
                <Grid>
                <NavLink to='/admin/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
                <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/>
                </svg></NavLink><h3 style={textStyle}>VIEW TEST</h3>			
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
            name: "Action",
            options: {
              filter: false,

            }
        }
    
  ]

    return (
        <div>
             <MUIDataTable 

title={"Question Pool Details"}
data={this.state.data.concat().reverse().map(currentemp => {
    return [
       currentemp.poolCat,
       currentemp.poolType,
       currentemp.poolSubtype,
       currentemp.noOfQnsInPool,
       <TableCell> 
       <Button variant="contained" href="#" onClick = {() => this.deleteTest(currentemp.poolId,currentemp.poolSubtype)} style={style}>
        DELETE</Button></TableCell>

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
<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete "+ " " +this.state.testBank + " " +"? "}</DialogTitle>

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
<DialogTitle id="alert-dialog-title">{"Successfully Deleted the Question Bank !"}</DialogTitle>

<DialogActions>
<Button onClick ={this.handleCloseConfirmation}>
OKAY
</Button>
</DialogActions>
</Dialog>
        </div>

    )
  }
}




      
      