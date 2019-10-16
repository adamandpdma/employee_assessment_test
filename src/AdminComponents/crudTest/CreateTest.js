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
  width: "200px",
  display: 'flex',
  flexWrap: 'wrap'
}
const buttonStyle = {
    color: "black",
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
          testType:this.props.location.category,
          categoryError: '',
          testSubtype:this.props.location.typeoftest,
          typeoftestError: '',
          noOfQns:'',
          numberofquestionsError: '',
          timeLimit:'',
          timelimitError: '',
          testBankCategories:[],
          testBankTypeOfTests: [],
          dataCategories: [],
          dataTypeOfTests: [],
          poolId: [],
          selectCategory: false,
          selectTypeoftest: false,
          isHidden: false,
          settingsId: 0,
          poolId: this.props.location.poolId,
          numberofquestions: this.props.location.numberofquestions,
          disabled: true,
          disabledFalse: this.props.location.disabled
     }
 }


 componentDidMount() //loads right before anything loads on the page
 {
     console.log(this.state.testCat)
     console.log(this.state.poolId + "POOL ID")
    if(this.state.testCat === "Non-Technical")
    {
        // axios.get('http://localhost:5000/TestBank/')
        // axios.get('http://192.168.200.200:8080/backendapi/admin/test-detail/category/'+"Non-Technical")
        axios.get("http://192.168.200.200:8080/backendapi/admin/questionpool")
        .then(res => { 
                this.setState(
                    {
                        testBankCategories: res.data,
                    })
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.hidden === false),
                        }
                    )
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.poolCat === "Non-Technical"),
                        }
                    )
                    this.setState(
                        {
                           
                            dataCategories: this.state.testBankCategories.map(categoriess => categoriess.poolType),
                            dataTypeOfTests: this.state.testBankCategories.map(categoriess => categoriess.poolSubtype),


                        }
                    )
                    
                     })
    }
    else
    {

        axios.get("http://192.168.200.200:8080/backendapi/admin/questionpool")
        .then(res => { 
                this.setState(
                    {
                        testBankCategories: res.data,
                    })
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.hidden === false),
                        }
                    )
                    this.setState(
                        {
                    testBankCategories: this.state.testBankCategories.filter(el => el.poolCat === "Technical"),
                        }
                    )
                    this.setState(
                        {
                           
                            dataCategories: this.state.testBankCategories.map(categoriess => categoriess.poolType),
                            dataTypeOfTests: this.state.testBankCategories.map(categoriess => categoriess.poolSubtype),
                        }
                    )
                    
                     })
    }
       
   
   
}

validate = () => 
{

    console.log(this.state.noOfQns)
    console.log(this.state.numberofquestions)
    let isError = false;
    const errors ={};

    if(this.state.noOfQns === ''){
        isError = true;
        errors.numberofquestionsError= "Enter a number";
    }
    if(this.state.noOfQns > this.state.numberofquestions){
        isError = true;
        errors.numberofquestionsError= "Number should be < or =" + this.state.numberofquestions;
    }
    if(this.state.noOfQns > this.state.numberofquestions+"0"){
        isError = true;
        errors.numberofquestionsError= "Number should be < or =" + this.state.numberofquestions;
    }  
    if(this.state.noOfQns.match("[0-9]") && !(this.state.noOfQns > this.state.numberofquestions) 
    && !(this.state.noOfQns > this.state.numberofquestions+"0"))
    {
        errors.numberofquestionsError=""
    }
    if(this.state.timeLimit.match("[0-9]"))
    {
        errors.timelimitError= " ";
    }
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
        poolId: this.state.poolId,
        settingsId: this.state.settingsId,
        testCat: this.state.testCat,
        testSubtype: this.state.testSubtype,
        testType:this.state.testType,
        timeLimit: this.state.timeLimit
       
    }
    console.log(values);

    axios.post("http://192.168.200.200:8080/backendapi/admin/test-detail/create", values)
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
            <NavLink to='/admin/Technical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg></NavLink><h3 style={textStyle}>CREATE TEST</h3>			
            </Grid>
          )
      }
      else{
          return(
            <Grid>
            <NavLink to='/admin/NonTechnical'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
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

        const uniqueValuesType =  this.state.testBankCategories.map(categoriess => categoriess.poolType)
        const uniqueType = [...new Set(uniqueValuesType)]; 
        console.log(uniqueType)
        
        const uniqueValuesSubtype =  this.state.testBankCategories.map(categoriess => categoriess.poolSubtype)
        const uniqueSubType = [...new Set(uniqueValuesSubtype)]; 
        console.log(uniqueSubType)
        return(
          
            <div>
                <Container maxWidth="sm" style={containerStyle}>
                   
                	{this.navigateBack()}	
                    {(this.state.disabled === true && this.state.disabledFalse === undefined) && (
                        <p style={{color: "red"}}>UPLOAD TEST BANK TO CREATE TEST !</p>
                    )}		
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
                           <TextField
                           style={fieldStyle}
                           required 
                           value={this.state.testType}
                         >
                       </TextField><br/>
                       <div style={errorColor}>{this.state.categoryError}</div>
                       </FormControl><br/>
                    
                       <InputLabel style={InputLabelStyle}>TYPE OF TEST</InputLabel>
                       <FormControl>                  
                           <TextField required
                           style={fieldStyle}
                           value={this.state.testSubtype}>
                       </TextField><br/>
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
                      
                       <InputLabel style={InputLabelStyle}>TIME LIMIT
                       <p style={{color: "blue"}}> In Minutes</p>
                       </InputLabel>
                     
                      <FormControl>
                          <TextField 
                           style={fieldStyle}
                       variant="outlined"
                       type="number"
                       onChange={this.timeLimitOnChangeHandler}
                       value={this.state.timeLimit}
                       errorText={this.state.timelimitError}>
                       </TextField>

                       <div style={errorColor}>{this.state.timelimitError}</div>
                      </FormControl><br/><br/>
                      <br/>
                      <div>
                          {(this.state.disabled === true && this.state.disabledFalse === undefined) && (
    <Button variant="contained" type='submit' style={{color: "grey"}} disabled={this.state.disabled}>
    CREATE TEST</Button>
                          )}
                                                  {this.state.disabledFalse === false && (
    <Button variant="contained" type='submit' style={{color: "black"}} disabled={this.state.disabledFalse}>
    CREATE TEST</Button>
                          )}
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





