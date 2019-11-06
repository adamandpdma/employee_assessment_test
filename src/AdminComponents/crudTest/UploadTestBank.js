//original
import React,{Component} from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TestRows from './TestRows';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

   const style = {
    margin: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }

  const fieldStyle = {
    width: "250px",
    display: 'flex',
          flexWrap: 'wrap',
  }
  const buttonStyle = {
      color: "black",
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
  const errorColor=
{
    color: "red"
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
          categoryError: '',
          typeoftest: '',
          typeoftestError: '',
          numberofquestions: 0,
          numberofquestionsError: '',
          open: false,
          subtypeData: []
     }
 }
 componentDidMount = () => 
 {
     if(this.state.domain === "Technical")
     {
        axios.get("http://192.168.200.200:8080/backendapi/admin/test-detail/category/Technical")
        .then(res => {
            this.setState(
                {
                    subtypeData:res.data.map(values => values.testSubtype)
                }
            )
        })
     }
     else if(this.state.domain === "Non-Technical")
     {
        axios.get("http://192.168.200.200:8080/backendapi/admin/test-detail/category/Non-Technical")
        .then(res => {
            this.setState(
                {
                    subtypeData:res.data.map(values => values.testSubtype)
                }
            )
        })
     }
 }
 validate = () => 
 {
     console.log(this.state.subtypeData + "hehe")
     let isError = false;
     const errors ={};
 
     if(this.state.numberofquestions <= 0){
         isError = true;
         errors.numberofquestionsError= "Enter a number greater than 0";
     }
     if(this.state.numberofquestions >30){
        isError = true;
        errors.numberofquestionsError= "You can only enter a maximum of 30";
    }
     if(this.state.category === ''){
         isError = true;
         errors.categoryError= "Select Test Category";
     }
     
     if(this.state.typeoftest === ''){
         isError = true;
         errors.typeoftestError= "Enter test type";
     }
     if(this.state.subtypeData.includes(this.state.typeoftest))
     {
        isError = true;
        errors.typeoftestError= "The subtype already exists enter a new subtype !";
       
     }
     if(this.state.category.match("^[A-z 0-9]+$" ))
     {
        errors.categoryError= "";
     }
     if(this.state.typeoftest.match("^[A-z 0-9]+$" ) && !this.state.subtypeData.includes(this.state.typeoftest))
     {
        errors.typeoftestError= "";
     }
     if(this.state.numberofquestions > 0 && this.state.numberofquestions<30){

        errors.numberofquestionsError= "";
    }
     if(this.state.category.match("^[A-z]+$" ))
     {
         this.setState(
             {
                categoryError: ""
             }
         )
     }
     if(this.state.typeoftest.match("^[A-z 0-9]+$" ))
     {
         this.setState(
             {
                typeoftestError: ""
             }
         )
     }
     
     if(isError){
         this.setState(
             {
                 ...this.state,
                 ...errors
             });
     }
 
     return isError;
 }

 onSubmitHandler = () =>
 {
  
     const err = this.validate();
     if(!err)
     {
       this.setState(
           {
               open: true
           }
       )
     }
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
            <NavLink to='/admin/Technical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>UPLOAD TEST BANK</h3>			
            </Grid>
          )
      }
      else{
          return(
            <Grid>
            <NavLink to='/admin/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
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
        <InputLabel htmlFor="age-simple" >Category</InputLabel>
        <FormControl>
        {this.state.domain === "Technical" && (
        <Select
          required
          value={this.state.category}
          ref="userInput" 
          onChange={this.categoryOnChangeHandler}
          errorText={this.state.categoryError}
          style={fieldStyle}
        >
          <option value="Programming"style={{cursor: "pointer"}}>Programming</option>
          <option value="Agile" style={{cursor: "pointer"}}>Agile</option>
          <option value="DevOps"style={{cursor: "pointer"}}>DevOps</option>
          <option value="Aptitude"style={{cursor: "pointer"}}>Aptitude</option>
        </Select>)}
        {this.state.domain === "Non-Technical" && (
        <Select
          required
          value={this.state.category}
          ref="userInput" 
          onChange={this.categoryOnChangeHandler}
          errorText={this.state.categoryError}
          style={fieldStyle}
        >
          <option value="Logical" style={{cursor: "pointer"}}>Logical</option>
          <option value="Aptitude" style={{cursor: "pointer"}}>Aptitude</option>
          <option value="Data Interpretation" style={{cursor: "pointer"}}>Data Interpretation</option>
        </Select>)}
        {this.state.domain === undefined &&( 
        <Select
          required
          value={this.state.category}
          ref="userInput" 
          onChange={this.categoryOnChangeHandler}
          errorText={this.state.categoryError}
          style={fieldStyle}
        >
          <option value="Logical" style={{cursor: "pointer"}}></option>
          <option value="Aptitude" style={{cursor: "pointer"}}></option>
          <option value="Data Interpretation" style={{cursor: "pointer"}}></option>
        </Select>)}
        <div style={errorColor}>{this.state.categoryError}</div>
      </FormControl>  
              <InputLabel style={InputLabelStyle}>TYPE OF TEST</InputLabel>
              <FormControl>                  
                  <TextField 
                 style={fieldStyle}
                 required 
                  onChange={this.typeOfTestOnChangeHandler} 
                  value={this.state.typeoftest}
                  errorText={this.state.typeoftestError}>
              </TextField><br/>
              <div style={errorColor}>{this.state.typeoftestError}</div>
              </FormControl><br/>

              <InputLabel style={InputLabelStyle}>NO OF QUESTIONS</InputLabel>
              <FormControl>
                  <TextField required
                   style={fieldStyle}
                  variant="outlined"
              type="number"
              onChange={this.noOfQuestionsOnChangeHandler}
              value={this.state.numberofquestions
              }
              errorText={this.state.numberofquestionsError}>
              </TextField>
               <div style={errorColor}>{this.state.numberofquestionsError}</div>
               </FormControl><br/><br/>
        
           <Button variant="contained" 
           style={buttonStyle}
           onClick={this.onSubmitHandler}
           >Generate Test Rows</Button>
              </form>
              <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Proceed to add questions!!"}</DialogTitle>

        <DialogActions>
        <NavLink to={{pathname:'/admin/testRows', 
           numberofquestions: this.state.numberofquestions,
           category: this.state.category,
           typeoftest: this.state.typeoftest,
           domain: this.state.domain
          }}
           style={navStyle}>
         <Button> OKAY </Button>
         </NavLink>
        </DialogActions>
      </Dialog>
                </Grid>
                </Grid>
                </Container>
            </div>
        )
    }
}
export default UploadTestBank;




     