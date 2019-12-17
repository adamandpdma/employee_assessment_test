import 'date-fns';
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import GenerateRows from './GenerateRows'
import {NavLink} from 'react-router-dom';
import MCUpload from './MCUpload'
import { th } from 'date-fns/locale';

export default class MaterialUIPickers extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedDate: '',
      selectedDateTwo : '',
      disable: false
    }
  }


  handleChange = (date) => {
    this.setState({
      selectedDate: date,
    }, () => {
      console.log(this.state.selectedDate)
    },)  
  }; 
  handleChangeTwo = (date) => {
    this.setState({
      selectedDateTwo: date,
    }, () => {
      console.log(this.state.selectedDateTwo)
    },)  
  }
 disableFunction = () => 
 {
  if(this.state.selectedDate === '' && this.state.selectedDateTwo === '' || this.state.selectedDateTwo === "" || this.state.selectedDate === "")
  {
    alert("Select the dates")
  }
   if(this.state.selectedDate !== '' && this.state.selectedDateTwo !== '')
   {
   this.setState(
     {
       disable: true
     }
   )
    }
 }
render()
{
  return (
    <div>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <b><p>From Date</p></b>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.selectedDate}
          onChange={(date) => this.handleChange( date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <b><p>To Date</p></b>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={this.state.selectedDateTwo}
          onChange={(date) => this.handleChangeTwo( date)}
          KeyboardButtonProps={{
            'aria-label': 'change date'      
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
      {(this.props.keyValue === this.props.ij && this.state.selectedDate !== "" && this.state.selectedDateTwo !== "")&& (
        <NavLink to={{pathname: '/employee/GenerateRows',
       selectedDate: this.state.selectedDate,
       selectedDateTwo: this.state.selectedDateTwo}}
       style={{"textDecoration": "none"}}
       onClick={() => this.disableFunction()} ><button 
       style={{"backgroundColor": "#648fcc", 
       "color": "white", "fontSize": "15px",
        "padding": "17px",
       "borderRadius": "10px"}} 
       disabled={this.state.disable}>Ok</button></NavLink> 
       )}
    </div>
  
  );
}
}


