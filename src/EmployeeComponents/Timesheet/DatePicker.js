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

export default class MaterialUIPickers extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedDate: new Date('2019-12-09T21:11:54'),
      selectedDateTwo : new Date('2019-12-09T21:11:54'),
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

render()
{
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <p>From Date</p>
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
      <p>To Date</p>
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
      <Grid container>
        <Button style={{"backgroundColor": "#648fcc", "color": "white", "fontSize": "10px"}}
 >Ok</Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
}


