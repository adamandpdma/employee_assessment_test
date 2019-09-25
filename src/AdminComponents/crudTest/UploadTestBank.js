import React,{Component} from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import TestRows from './TestRows';

   const style = {
    margin: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }

  const fieldStyle = {
    width: "250px",
    display: 'flex',
          flexWrap: 'wrap'
  }
  const buttonStyle = {
      color: "grey",
  }
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap'
}
const InputLabelStyle={
    fontSize: "12px",
    margin: "10px",
    color: "grey"
}
const textStyle={
    padding: "25px"
}
const navStyle = {
    textDecoration: "none",
  }
 
class UploadTestBank extends Component
{
 constructor(props)
 {
     super(props);

     this.categoryOnChangeHandler=this.categoryOnChangeHandler.bind(this);
     this.typeOfTestOnChangeHandler=this.typeOfTestOnChangeHandler.bind(this);
     this.noOfQuestionsOnChangeHandler=this.noOfQuestionsOnChangeHandler.bind(this);
     this.onSubmitHandler=this.onSubmitHandler.bind(this);

     this.state = {
          domain: this.props.location.domain,
          category: '',
          typeoftest: '',
          numberofquestions: '',
          open: false
     }
 }
 onSubmitHandler = (event) =>
 {
     event.preventDefault();

    const values = {
            domain: this.state.domain,
            category: this.state.category,
            typeoftest: this.state.typeoftest,
            numberofquestions: this.state.numberofquestions,
        }
    console.log(values);
    // axios.post("http://localhost:5000/TestBank/add", values)
    // .then((res) => console.log(res.data))

 }

  categoryOnChangeHandler = (event) =>
  {
      this.setState(
          {
           category: event.target.value
          }
      )
  }
  typeOfTestOnChangeHandler = (event) => 
  {
      this.setState(
          {
              typeoftest: event.target.value
          }
      )
  }
  noOfQuestionsOnChangeHandler = (event) => 
  {
      this.setState(
          {
              numberofquestions: event.target.value
          }
      )
  }
  navigateBack = () => 
  {
      if(this.state.domain === "Technical")
      {
          return(
            <Grid>
            <NavLink to='/Technical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>UPLOAD TEST BANK</h3>			
            </Grid>
          )
      }
      else{
          return(
            <Grid>
            <NavLink to='/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>UPLOAD TEST BANK</h3>			
            </Grid>
          )
      }
  }
    render()
    {
        return(
     
            <div>
                <Container maxWidth="sm" style={containerStyle}>
               {this.navigateBack()}
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                >
                <Grid item xs={12}>
                <form onSubmit={this.onSubmitHandler} style={style}>
     
              <InputLabel style={InputLabelStyle}>CATEGORY</InputLabel>
              <FormControl>
                  <TextField
                  style={fieldStyle}
                  required 
                  onChange={this.categoryOnChangeHandler} 
                  value={this.state.category}>
              </TextField><br/>
              </FormControl><br/>
           
              <InputLabel style={InputLabelStyle}>TYPE OF TEST</InputLabel>
              <FormControl>                  
                  <TextField 
                 style={fieldStyle}
                 required 
                  onChange={this.typeOfTestOnChangeHandler} 
                  value={this.state.typeoftest}>
              </TextField><br/>
              </FormControl><br/>

              <InputLabel style={InputLabelStyle}>NO OF QUESTIONS</InputLabel>
              <FormControl>
                  <TextField required
                   style={fieldStyle}
                  variant="outlined"
              type="number"
              onChange={this.noOfQuestionsOnChangeHandler}
              value={this.state.numberofquestions
              }></TextField>
               </FormControl><br/><br/>

               <NavLink to={{pathname: '/testRows', 
           numberofquestions: this.state.numberofquestions, category: this.state.category, typeoftest: this.state.typeoftest}}  style={navStyle}><Button variant="contained" style={buttonStyle}>Generate Test Rows</Button></NavLink> 
              </form>
                </Grid>
                </Grid>
                </Container>
            </div>
        )
    }
}
export default UploadTestBank;

