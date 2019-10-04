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
        settingsId: [],
        openStart: false,
  }
  this.handleClickOpen = this.handleClickOpen.bind(this)
}

  componentDidMount() 
  {
    console.log(this.state.category)

  axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/category/Non-Technical')
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
    toggle (element){
      sessionStorage.setItem(element.target.id,JSON.stringify(true))
    }
    handleClickOpen = (testSubtypeName, timeValue, noOfQnsValue, element) => {
      this.setState(
          {
              open: true,
              testSubtype: testSubtypeName,
              time: timeValue,
              noOfQnsData: noOfQnsValue,
          }
      )
      console.log(this.state.settingsId)

    sessionStorage.setItem(element.target.id,JSON.stringify(true))
    }


    handleClose = () => {
      this.setState(
        {
          open: false
        }
      )
    }
    checkedHandler = () => {
      this.setState(
        {
          openStart: true
        }
      )
   }
   startTest = () => {
     if(this.state.openStart === true)
     {
      return(
        <NavLink to={{pathname: '/takeTest', 
        testSubtypeData: this.state.testSubtype, 
        timeData: this.state.time,
        buttonDisable:this.state.buttonDisable }}  style={navStyle}>
          <Button variant="contained" color="#707070">
         START TEST
       </Button>
       </NavLink>
       )
     }
   }

   displayButtons = (id,testSubtype, 
    timeLimit, noOfQns) => {
    if (sessionStorage.getItem(id)) {
        return (
            <Button className="btn"  id={id}  
            onClick={(element) => this.handleClickOpen(testSubtype, 
              timeLimit, noOfQns,element)} 
               variant="contained" disabled={true}>START</Button>
        
        )
    } else {
        return (
            <Button className="btn"  id={id}  
            onClick={(element) => this.handleClickOpen(testSubtype, 
              timeLimit, noOfQns,element)} 
           variant="contained">START</Button>
        
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
        {this.startTest()}
        </DialogActions>
      </Dialog>

    <MUIDataTable 
        title={"Test Details"}
        data={this.state.data.map(currentemp => {
            return [
               currentemp.testSubtype,
               currentemp.noOfQns,
               currentemp.timeLimit + "  "+ 'minutes',
               <TableCell>
                {this.displayButtons(currentemp.settingsId,
                currentemp.testSubtype, 
              currentemp.timeLimit,
               currentemp.noOfQns)}
                 </TableCell>
               
            ]})}

        columns={columns}
        options={options}
        /> 
    </div>

    )
  }
}

