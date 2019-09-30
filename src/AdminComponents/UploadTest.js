  
import React,{Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UploadTestTable from './UploadTestTable'
import PropTypes from 'prop-types';

//inline CSS style for Material UI withStyle
const styles = theme => ({
    input: {
     margin: 5,
     marginLeft:38,
      height: 40
    },
    input1: {
        margin: 5,
        marginLeft: 20,
        height: 40
    },
    input2: {
        margin: 5,
        marginLeft: 4,
        height: 40,
        width:75
    },
    button: {
        margin: 5,
        height: 40
      }

})
    
class App extends Component{

  state ={
    values :[
      {category:'',typeOfTest:'',question:''}
    ],
  }
  //Handle change for the 3 text field 
  handleChange = prop => event => {
    this.setState({ ...this.state, [prop]: event.target.value });
    
  };

render(){
  const { classes } = this.props;
  return (
    <div><Typography variant="h5" gutterBottom>
    Upload Test Bank
  </Typography>
  <Typography variant="body2">
    <div>Category:  
    <TextField
    InputProps={{
        className: classes.input
      }}
    variant="outlined" value={this.setState.category}
    onChange={this.handleChange('category')} />
    </div>
    <div>Type of test:
    <TextField
     InputProps={{
        className: classes.input1
      }}
    variant="outlined" value={this.setState.typeOfTest}
    onChange={this.handleChange('typeOfTest')}/>
    </div>
    <div>
    Question Limit:
    <TextField
    InputProps={{
        className: classes.input2
      }}
    variant="outlined" value={this.setState.question}
    onChange={this.handleChange('question')}/>
    {/* <Button  className={classes.button}>Confirm</Button> */}
    <UploadTestTable />
    </div>
    <Button type="submit" >
      {/* To implement submit for the value of everything */}
       Save changes</Button>              
  </Typography>  
        </div>
  )
}
}

//propTypes is use so that {classes} can be implement to {classes}=this.props
//and able to call withStyle function. Only class compoment need to use this 
//method for withStyle
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);