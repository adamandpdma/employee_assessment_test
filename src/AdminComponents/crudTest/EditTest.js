import React,{Component} from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {NavLink} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
const style = {
    margin: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }
  const InputLabelStyle={
    fontSize: "12px",
    margin: "10px",
    color: "grey"
}
const errorColor=
{
    color: "red"
}
const textStyle={
    padding: "25px"
}

class EditTest extends Component
{
 constructor(props)
 {
     super(props);

     this.noOfQuestionsOnChangeHandler=this.noOfQuestionsOnChangeHandler.bind(this);
     this.timeLimitOnChangeHandler=this.timeLimitOnChangeHandler.bind(this);
     this.onSubmitHandler=this.onSubmitHandler.bind(this);

     this.state = {
 
          testCat: '',
          testType:'',
          testSubtype:'',
          noOfQns:0,
          numberofquestionsError: '',
          timeLimit:0,
          timelimitError: '',
          testBankCategories:[],
          testBankTypeOfTests: [],
          dataCategories: [],
          dataTypeOfTests: [],
          previousNumberOfquestions: '',
          id: this.props.location.aboutpropsTwo,
          poolId: '',
          isHidden: ''
     }
 }

 componentDidMount() 
 {
        axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/id/'+this.state.id)
        .then(testByID => {
          this.setState(
              {
                  testCat: testByID.data.testCat,
                  testType: testByID.data.testType,
                  testSubtype: testByID.data.testSubtype,
                  noOfQns: testByID.data.noOfQns,
                  timeLimit: testByID.data.timeLimit,
                  previousNumberOfquestions: testByID.data.noOfQns,
                  poolId: testByID.data.poolId,
                  isHidden: testByID.data.isHidden
              }
          )
        })
 }
 validate = () => 
 {
    let isError = false;
    const errors ={};

    console.log(this.state.noOfQns)
    if(this.state.noOfQns === ''){
        isError = true;
        errors.numberofquestionsError= "Enter a number";
    }
    return isError;
 }
 validate = () => 
{
    let isError = false;
    const errors ={};

    if(this.state.noOfQns === ''){
        isError = true;
        errors.numberofquestionsError= "Enter a number";
    }
    if(this.state.noOfQns< this.state.previousNumberOfquestions){
        isError = true;
        errors.numberofquestionsError= "Enter a number >" + this.state.previousNumberOfquestions;
    }
    if(this.state.timeLimit === ''){
        isError = true;
        errors.timelimitError= "Enter a number";
    }   
    if(isError){
        this.setState(
            {
                ...this.state,
                ...errors
            });
    }
    return isError
}

 onSubmitHandler = (event) =>
 {
     event.preventDefault();

    const err = this.validate();
    if(!err)
    {

        const values = {
            isHidden: this.state.isHidden,
            noOfQns: this.state.noOfQns,
            poolId: this.state.poolId,
            settingsId: this.state.id,
            testCat: this.state.testCat,
            testSubtype: this.state.testSubtype,
            testType: this.state.testType,
            timeLimit: this.state.timeLimit,
           
        }
    console.log(values);

  
    axios.post("http://192.168.200.200:8080/backendapi/admin/test-detail/update",values)
    .then((res) => console.log(res.data))
    .then(this.handleClickOpen())


 }
}

  noOfQuestionsOnChangeHandler = (event) => 
  {
      this.setState(
          {
              noOfQns: event.target.value
          }
      )
  }
  timeLimitOnChangeHandler = (event) => 
  {
      this.setState(
          {
              timeLimit: event.target.value
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
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>EDIT TEST</h3>			
            </Grid>
          )
      }
      else{
          return(
            <Grid>
            <NavLink to='/admin/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>EDIT TEST</h3>			
            </Grid>
          )
      }
  }
  popOverPkay = () => 
  {
      if(this.state.testCat === "Technical")
      {
          return(
            <Grid>
            <NavLink to='/admin/Technical'  style={buttonStyle}>
            <Button onClick={this.handleClose} color="primary" autoFocus>
         OKAY
        </Button>
            </NavLink>
        </Grid>
          )
      }
      else{
        {
            return(
                <Grid>
                <NavLink to='/admin/NonTechnical'  style={buttonStyle}>
                <Button onClick={this.handleClose} color="primary" autoFocus>
             OKAY
            </Button>
                </NavLink>
            </Grid>
            )
        }
      }

  }


  handleClickOpen = () => {
    this.setState(
        {
            open: true
        }
    )
  }

  handleClose = () => {
   this.setState(
       {
           open: false
       },
       
  this.setState(
        {
        testCat: '',
        testType: '',
        testSubtype: '',
        noOfQns: '',
        timeLimit: '',
        open: false
        }
    )
   )
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
                    value={this.state.testType}
                    style={fieldStyle}
                    ref="userInput" required 
                    >
                   {
                       this.state.testBankCategories.map(categories => {
                           return (<option
                                   key ={categories}
                                   value ={categories}> 
                                   {categories}
                               </option>
                           )
                       })
                   }
                </TextField><br/>
                </FormControl><br/>
             
                <InputLabel style={InputLabelStyle}>TYPE OF TEST</InputLabel>
                <FormControl>                  
                    <TextField
                   value={this.state.testSubtype} 
                 style={fieldStyle}
                    ref="userInput" required 
                    >
                   {
                       this.state.testBankTypeOfTests.map(typeoftests => {
                           return (<option
                                   key ={typeoftests}
                                   value ={typeoftests}> 
                                   {typeoftests}
                               </option>
                           )
                       })
                   }
                </TextField><br/>
                </FormControl><br/>

                <InputLabel style={InputLabelStyle}>NO OF QUESTIONS</InputLabel>
                <FormControl>
                    <TextField
                     style={fieldStyle}
                    variant="outlined"
                type="number"
                onChange={this.noOfQuestionsOnChangeHandler}
                value={this.state.noOfQns
                }></TextField>
                 <div style={errorColor}>{this.state.numberofquestionsError}</div>
                 </FormControl><br/><br/>
               
                <InputLabel style={InputLabelStyle}>TIME LIMIT</InputLabel>
               <FormControl>
                   <TextField
                    style={fieldStyle}
                variant="outlined"
                type="number"
                onChange={this.timeLimitOnChangeHandler}
                value={this.state.timeLimit}></TextField>
                 <div style={errorColor}>{this.state.timelimitError}</div>
               </FormControl><br/><br/>
               <br/>
               <div>
      <Button variant="contained" type='submit' style={buttonStyle}>SAVE CHANGES</Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You have successfully updated the Test !!"}</DialogTitle>

        <DialogActions>
          {this.popOverPkay()}
        </DialogActions>
      </Dialog>
    </div>
                       </form>
                </Grid>
                </Grid>
                </Container>
            </div>
        )
    }
}
export default EditTest;
                

