import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {NavLink} from 'react-router-dom';
import axios from "axios";
import FittedImage from 'react-fitted-image'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({ 
modal : {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: "0"
      },
paper : {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
profile : {
  marginTop: theme.spacing(2),
  background: 'linear-gradient(45deg, #03a9f4 30%, #00bcd4 90%)',
  color: "white",
  paddingTop:"5px",
  paddingBottom:"5px",

  },
button : {
    background: 'white',
  },
typography:{
  marginTop: theme.spacing(1),
},
media : {
    height: 150,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),

  },
avatar : {
      borderRadius:0,
      height: 184,
      width: 184,
  },
card:{
  padding:0
},

})


const imgStyle ={
  width: "350px",
  height: "250px"
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
       details: [],

       open: false,

       dialog:false,
      
       data: "",

       profileImage:"",
 
       file: '',

       imagePreviewUrl: '',

    };
  }

  _handleSubmit(e) 
  {
    const empId = localStorage.getItem('employeeid')
    const password = localStorage.getItem('password')
    e.preventDefault();
    console.log('handle uploading-', this.state.file);

    const values = {
      employeeId: empId,
      email: this.state.details.email,
      mobileNo: this.state.details.mobileNo,
      name: this.state.details.name,
      password: password,
      profileImg: this.state.imagePreviewUrl.split(',')[1]
    }

    console.log(values)

    let i = parseInt(Math.floor(Math.log(this.state.file.size) / Math.log(1024)));
    let KB=  Math.round(this.state.file.size / Math.pow(1024, i), 2);

      if(KB > 64)
      {
      this.setState({errorDialog:true}) 
      }  
      else if(KB <= 64)
      {
        axios.post("http://192.168.200.200:8080/backendapi/employee/"+ empId + "/update-profile-image", values)
        .then((res => {
          console.log(res.data)
         { if (res.data === true) {
          this.setState({dialog:true})
          // this.setState({pic:this.state.imagePreviewUrl.split(',')[1]})
          // this.setState({defaultPic:false})
          localStorage.setItem('profile', this.state.imagePreviewUrl.split(',')[1])
          
        }}
      }))   
    }
}

  _handleImageChange(e) {
    e.preventDefault();
   

    let file = e.target.files[0];
    
    this.getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored",base64);
    });   
  }

  getBase64 = (file) => 
  {
    return new Promise((resolve,reject) => 
    {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          Holder: reader.result
        });
      }
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }


  handleOpen = () => {
    this.setState({open : true})
    // console.log(this.state.open)
  }

  handleClose = () => {
    this.setState({open : false})
    this.setState({dialog : false})
  }

  handleOnclick = () => {
    //this.props.history.push('/')
    window.location= "/"
  }

componentDidMount(){
const empId = localStorage.getItem('employeeid')
if(empId != null){
// const adminId = 42
// console.log(user_employeeid)
axios.get("http://192.168.200.200:8080/backendapi/employee/" + empId +"/profile/")
.then(res => {
  this.setState({ details: res.data })
  console.log(this.state.details)
  localStorage.setItem('name', this.state.details.name)
  localStorage.setItem('profile', this.state.details.profileImg)
})
}
else{
  // this.props.history.push('/Input')          
}}

render(){
  let {imagePreviewUrl} = this.state;
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} style={imgStyle}/>);
  } else {
    $imagePreview = (<div className="previewText"></div>);
  }

  const {classes} = this.props;
  const handleOpen = this.handleOpen
  const handleClose = this.handleClose
  const handleOnclick = this.handleOnclick
  const open = this.state.open
  const dialog = this.state.dialog
  const errorDialog =this.state.errorDialog
  const details = this.state.details

  return (

    <div>
      <Box 
      display="flex" 
      height={30} 
      flexDirection="row"
      onClick= {handleOpen}>
        <Box>
        <Avatar
        >
        <FittedImage
        fit="cover" 
        src={`data:image/jpeg;base64,${localStorage.getItem('profile')}`} />       
        </Avatar>
        </Box>
        <Box mx={1.5}>
          {localStorage.getItem('name')}
        </Box>
      </Box>

    <Modal
        open={open}
        onClose={handleClose}
        className= {classes.modal}
      >
    <Card
    maxWidth= "xs"
    >
      <CardActionArea>
      <CardContent
      className={classes.card}>
          <Typography
          variant = "h5"
          fullWidth
          className={classes.profile}
          align="center">
              Profile
          </Typography>
        <Typography
           align="center"
           margin= "normal"
           className={classes.typography}>
          {localStorage.getItem('name')}
        </Typography>
        </CardContent>
        <CardMedia
        className = {classes.media}
        >
        <Avatar 
        className={classes.avatar}>
        <FittedImage
        fit="cover" 
        src={`data:image/jpeg;base64,${localStorage.getItem('profile')}`} />       
        </Avatar>
        </CardMedia>
        </CardActionArea>  
     

        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <div>
            <Button           
            fullWidth>
              <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
              </Button>
              </div>
           <div>  
          <Button
          fullWidth
          type="submit"
          >
            Confirm Picture
          </Button>
          </div>  
          </form>
          {/* <div >
            {$imagePreview}
          </div> */}
        </div>

      <CardActions>
      <Button
          fullWidth
          className={classes.button}
          >
      <NavLink to='/employee/editProfile' style={{color: 'black', textDecoration: 'none'}}>     
      Edit Profile
      </NavLink>
      </Button> 
      {/* </Link> */}

      </CardActions>
      </Card>
      </Modal>
      <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Profile Picture has been changed"}</DialogTitle>
      {/* <Button
          margin="normal"
          fullWidth
          variant="contained"
          className={classes.button}
          >
      <NavLink to={'/employee'}>Okay</NavLink>
      </Button> */}
      </Dialog>
      <Dialog
            open={errorDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Please select a 64kb or smaller sized image"}</DialogTitle>
      </Dialog>
      </div>

  );
}
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);