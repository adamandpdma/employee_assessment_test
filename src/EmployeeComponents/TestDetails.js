import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Axios from 'axios';

import Typography from '@material-ui/core/Typography';


const style ={
    textDecoration: "none",
    width: "50px",
    margin: '10px',
    borderRadius: "30px",
    fontSize: "10px"
    }
const navStyle = {
  textDecoration: "none",
}

export default class TestDetails extends Component {
  constructor(props) {
    super(props);



    this.state = {
        data: [],
        category: this.props.location.category,
        open: false,
        termsAndConditionsError: "",
        time: '',
        attemptsData: "",
        testSubtype: "",
        noOfQnsData: "",
        resultId: '',
        settingsId: []
  }
  this.attemptsDataHandler = this.attemptsDataHandler.bind(this)
}

  componentDidMount() 
  {
    console.log(this.state.category)

  // axios.get('http://localhost:5000/Test/')
  axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/type/'+ this.state.category)
        .then(res => {
            this.setState (
                {
                    data: res.data
                }
             )
             this.setState(
              {
                data: this.state.data.filter(el => el.isHidden === false),
              }
          )
        })
    }
    handleClickOpen = (testSubtypeName, timeValue, noOfQnsValue) => {
      this.setState(
          {
              open: true,
              testSubtype: testSubtypeName,
              time: timeValue,
              noOfQnsData: noOfQnsValue
          }
      )
      console.log(this.state.settingsId)
    }
 
    handleClose = () => {
      this.setState(
        {
          open: false
        }
      )
    }

    attemptsDataHandler = (id) => {
          axios.get('http://192.168.200.200:8080/backendapi/employee/10/tests/'+id+'/attempts')
            .then( res => { 
              this.setState({
                attemptsData: res.data
              })
            }
            )       
     return(<TableCell>{this.state.attemptsData}/2</TableCell>)
     
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
          name: "Test Name",
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
          name: "Attempts",
          options: {
            filter: false,
           
          }
        },
      {
        name: "Result",
        options: {
          filter: false,
    
        }
      },

    
  ]
    return (
      <div>
          <Dialog aria-labelledby="customized-dialog-title" open={this.state.open}>
        <DialogTitle id="customized-dialog-title">
          TERMS AND CONDITIONS
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
              Total No.of Questions: <b>{this.state.noOfQnsData}</b><br/>    
              Time Limit: <b>{this.state.time} minutes</b>
            <ol>
                <li>
                    Do not refresh (or press F5) or close the tab/browser.
                </li>
                <li>
                    You have only 2 attempts for this test.
                </li>
                <li>
                    Test would be automatically submitted once the time is up.
                </li>
            </ol>
            <label>
            <input type="checkbox" onChange={this.checkedHandler} defaultChecked={this.state.checked}/>
            <i>I have read and accepted the terms and conditions.</i>
            </label>
            
          </Typography>
        </DialogContent>
        <DialogActions>
          <NavLink to={{pathname: '/takeTest', 
           testSubtypeData: this.state.testSubtype, timeData: this.state.time }}  style={navStyle}>
             <Button onClick={this.handleClose} color="#707070">
            START TEST
          </Button>
          </NavLink>
        </DialogActions>
      </Dialog>

    <MUIDataTable 
        title={"Test Details"}
        data={this.state.data.map(currentemp => {
            return [
               currentemp.testSubtype,
               currentemp.noOfQns,
               currentemp.timeLimit + "  "+ 'minutes',
               this.attemptsDataHandler(currentemp.settingsId),
               <TableCell>
                 <Button variant='contained' style={style} onClick={() => this.handleClickOpen(currentemp.testSubtype, currentemp.timeLimit, currentemp.noOfQns)}>Start</Button>
                 </TableCell>
               
            ]})}

        columns={columns}
        options={options}
        /> 
    </div>

    )
  }
}

