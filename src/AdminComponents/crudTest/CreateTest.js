import React,{Component} from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Grid, Container} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import {NavLink} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


const style = {
  margin: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block"
}
const fieldStyle = {
//   marginLeft: "300px",
  width: "200px",
  display: 'flex',
        flexWrap: 'wrap'
}
const buttonStyle = {
    color: "grey",
    marginTop: "30px",
    marginLeft: "30px",
    width: "170px",
    textDecoration: "none",
    marginBottom: "40px",
    borderRadius: "25px"
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
const errorColor=
{
    color: "red"
}
const textStyle={
    padding: "25px"
}

class CreateTest extends Component
{
 constructor(props)
 {
     super(props);

     this.categoryOnChangeHandler=this.categoryOnChangeHandler.bind(this);
     this.typeOfTestOnChangeHandler=this.typeOfTestOnChangeHandler.bind(this);
     this.noOfQuestionsOnChangeHandler=this.noOfQuestionsOnChangeHandler.bind(this);
     this.timeLimitOnChangeHandler=this.timeLimitOnChangeHandler.bind(this);
     this.onSubmitHandler=this.onSubmitHandler.bind(this);

     this.state = {
          testCat: this.props.location.domain,
          testType:'',
          categoryError: '',
          testSubtype:'',
          typeoftestError: '',
          noOfQns:'',
          numberofquestionsError: '',
          timeLimit:'',
          timelimitError: '',
          testBankCategories:[],
          testBankTypeOfTests: [],
          dataCategories: [],
          dataTypeOfTests: [],
          selectCategory: false,
          selectTypeoftest: false,
          isHidden: false,
          poolId: 0,
          settingsId: 0
     }
 }


 componentDidMount() //loads right before anything loads on the page
 {
     console.log(this.state.testCat)
    if(this.state.testCat === "Non-Technical")
    {
        // axios.get('http://localhost:5000/TestBank/')
        axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/category/'+"Non-Technical")
        .then(res => { 
                this.setState(
                    {
                        testBankCategories: res.data
                    })
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.testCat === "Non-Technical"),
                        }
                    )
                    this.setState(
                        {
                           
                            dataCategories: this.state.testBankCategories.map(categoriess => categoriess.testType),
                            dataTypeOfTests: this.state.testBankCategories.map(categoriess => categoriess.testSubtype),

                        }
                    )
                    
                     })
    }
    else
    {
        // axios.get('http://localhost:5000/TestBank/')
        axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/category/'+"Technical")
        .then(res => { 
                this.setState(
                    {
                        testBankCategories: res.data
                    })
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.isHidden === false),
                        }
                    )
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.testCat === "Technical"),
                        }
                    )
                    this.setState(
                        {
                           
                            dataCategories: this.state.testBankCategories.map(categoriess => categoriess.testType),
                            dataTypeOfTests: this.state.testBankCategories.map(categoriess => categoriess.testSubtype),
                        }
                    )
                    
                     })
    }
       
   
}

validate = () => 
{
    let isError = false;
    const errors ={};

    if(this.state.noOfQns === ''){
        isError = true;
        errors.numberofquestionsError= "Enter a number";
    }
    // if(this.state.numberofquestions > ''){
    //     isError = true;
    //     errors.numberofquestionsError= "Enter a number <";
    // }
    
    if(this.state.timeLimit === ''){
        isError = true;
        errors.timelimitError= "Enter a number";
    }
    if(this.state.testType === ''){
        isError = true;
        errors.categoryError= "Select category type";
    }
    
    if(this.state.testSubtype === ''){
        isError = true;
        errors.typeoftestError= "Select type of test";
    }
    if(this.state.timeLimit.length >= 1)
    {
        this.setState(
            {
               timelimitError: ""
            }
        )
    }
    if(this.state.noOfQns.length >= 1)
    {
        this.setState(
            {
               numberofquestionsError: ""
            }
        )
    }
    if(this.state.selectCategory === true)
    {
        this.setState(
            {
               categoryError: ""
            }
        )
    }
    if(this.state.testType.match("^[A-z 0-9]+$" ))
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
 
 onSubmitHandler = (event) =>
 {
     event.preventDefault();

    const err = this.validate();
    if(!err)
    {

    const values = {
        isHidden: this.state.isHidden,
        noOfQns: this.state.noOfQns,
        // poolId: this.state.poolId,
        settingsId: this.state.settingsId,
        testCat: this.state.testCat,
        testSubtype: this.state.testSubtype,
        testType:this.state.testType,
        timeLimit: this.state.timeLimit
       
    }
    console.log(values);

    // axios.post("http://localhost:5000/Test/add", values)
    axios.post("http://192.168.200.200:8080/backendapi/admin/test-detail/update", values)
    .then((res) => console.log(res.data))
    .then(this.handleClickOpen())
    }
 }
  categoryOnChangeHandler = (event) =>
  {
      this.setState(
          {
           testType: event.target.value
          }
      )
  }
  typeOfTestOnChangeHandler = (event) => 
  {
      this.setState(
          {
              testSubtype: event.target.value
          }
      )
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
  selectOnclickCategory = () => 
  {
      this.setState(
          {
            selectCategory: true
          }
      )
  }
  selectOnclicktypeoftest = () => 
  {
      this.setState(
          {
            selectTypeoftest: true
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
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>CREATE TEST</h3>			
            </Grid>
          )
      }
      else{
          return(
            <Grid>
            <NavLink to='/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>CREATE TEST</h3>			
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
            <NavLink to='/Technical'  style={buttonStyle}>
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
                <NavLink to='/NonTechnical'  style={buttonStyle}>
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
                    <Grid item xs={12} style={style}>
    <form onSubmit={this.onSubmitHandler} style={style}>
                       <InputLabel style={InputLabelStyle}>CATEGORY</InputLabel>
                       <FormControl>
                           <Select
                           required="required"
                           style={fieldStyle}
                           ref="userInput" required 
                           onChange={this.categoryOnChangeHandler} 
                           value={this.state.testType}
                           placeholder="select an option"
                           errorText={this.state.categoryError}
                           onClick={this.selectOnclickCategory}
                         >
                                <option disabled selected value> -- select an option -- </option>
                          {
                              this.state.dataCategories.map(categories => {
                                  return (  <option
                                   key ={categories}
                                   value ={categories}> 
                                   {categories}
                               </option>
                                     
                                        )
                              })
                          }
                       </Select><br/>
                       <div style={errorColor}>{this.state.categoryError}</div>
                       </FormControl><br/>
                    
                       <InputLabel style={InputLabelStyle}>TYPE OF TEST</InputLabel>
                       <FormControl>                  
                           <Select required
                           style={fieldStyle}
                           ref="userInput" required 
                           onChange={this.typeOfTestOnChangeHandler} 
                           value={this.state.testSubtype}
                           placeholder="select an option"
                           errorText={this.state.typeoftestError}
                           onClick={this.selectOnclicktypeoftest}>
                                   <option disabled selected value> -- select an option -- </option>
                          {
                              this.state.dataTypeOfTests.map(typeoftests => {
                                  return (   <option
                                   key ={typeoftests}
                                   value ={typeoftests}> 
                                   {typeoftests}
                               </option>
                                  )
                              })
                          }
                       </Select><br/>
                       <div style={errorColor}>{this.state.typeoftestError}</div>
                       </FormControl><br/>
       
                       <InputLabel style={InputLabelStyle}>NO OF QUESTIONS</InputLabel>
                       <FormControl>
                           <TextField 
                            style={fieldStyle}
                           variant="outlined"
                       type="number"
                       onChange={this.noOfQuestionsOnChangeHandler}
                       value={this.state.noOfQns
                       }
                       errorText={this.state.numberofquestionsError}></TextField>
                          <div style={errorColor}>{this.state.numberofquestionsError}</div>
                        </FormControl><br/><br/>
                      
                       <InputLabel style={InputLabelStyle}>TIME LIMIT</InputLabel>
                      <FormControl>
                          <TextField 
                           style={fieldStyle}
                       variant="outlined"
                       type="number"
                       onChange={this.timeLimitOnChangeHandler}
                       value={this.state.timeLimit}
                       errorText={this.state.timelimitError}></TextField>
                       <div style={errorColor}>{this.state.timelimitError}</div>
                      </FormControl><br/><br/>
                      <br/>
                      <div>
      <Button variant="contained" type='submit' style={buttonStyle}>CREATE TEST</Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You have successfully created Test !!"}</DialogTitle>

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
export default CreateTest;



