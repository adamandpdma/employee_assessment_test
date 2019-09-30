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
import Link from '@material-ui/core/Link';
import axios from "axios";
import FittedImage from 'react-fitted-image'
import PropTypes from 'prop-types';

const styles = theme => ({ 
modal : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
paper : {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
button : {
    background: 'linear-gradient(45deg, #03a9f4 30%, #00bcd4 90%)',
  },
media : {
    height: 150,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
avatar : {
      borderRadius:0,
      height: 150,
      width: 250,
  }
})


// const Profile = () => {

// const classes = useStyles();

// const [open, setOpen] = useState(false);
// const [details, setDetails] = useState('Guest');
// const [image,setImage] = useState();

// const handleOpen = () => {
//     setOpen(true);

//   };

// const handleClose = () => {
//     setOpen(false);

//   }  

// useEffect(() => {
//   const employeeDetails = localStorage.getItem('employeeid')
//   axios.get('http://localhost:4000/user/name/',employeeDetails)
//   .then(docs =>
//  setDetails(docs.name),
// console.log(details)
// )
//   });

// const handleImageChange = (event) => {
//   setImage(URL.createObjectURL(event.target.files[0]))
//   axios.post('http://localhost:4000/user/create/',image)
//   .then(res =>
//     setDetails(res.data) )
// }

class Profile extends Component {
  constructor(props) {
    super(props);
    // this.handleOpen = this.handleOpen.bind(this)
    // this.handleClose = this.handleClose.bind(this)
    this.state = {
      
       details: [],

       open: false,
      
       data: "",

       profileImage:"",
    };
  }

  handleOpen = () => {
    this.setState({open : true})
    // console.log(this.state.open)
  }

  handleClose = () => {
    this.setState({open : false})
  }

componentDidMount(){
const empid = localStorage.getItem('employeeid')
// const adminId = 42
// console.log(user_employeeid)
console.log(empid)
axios.get("http://192.168.200.200:8080/backendapi/employee/" + empid +"/profile/")
.then(res => {
  console.log(res.data)
  this.setState({ details: res.data })
  console.log(this.state.details)
  localStorage.setItem('name', this.state.details.name)
})

}

render(){

  const {classes} = this.props;
  const handleOpen = this.handleOpen
  const handleClose = this.handleClose
  const open = this.state.open
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
        src={`data:image/jpeg;base64,${details.profileImg}`} />       
        </Avatar>
        </Box>
        <Box mx={1.5}>
        {details.name}  
        </Box>
      </Box>

    <Modal
        open={open}
        onClose={handleClose}
        className= {classes.modal}
      >
    <Card
    >
      <CardActionArea>
      <CardContent>
          <Typography
          className={classes.button}
          align="center">
              Profile
          </Typography>
        <Typography
           align="center"
           margin= "normal">
           {details.name}  
           {/* { this.state.details.map(details => <li>{details.name}</li>)}            */}
        </Typography>
        </CardContent>
        <CardMedia
        className = {classes.media}
        >
        <Avatar 
        className={classes.avatar}>
        <FittedImage
        fit="cover" 
        src={`data:image/jpeg;base64,${details.profileImg}`} />       
        </Avatar>
        </CardMedia>
        </CardActionArea>    
    <CardActions>  
    <Button  
          margin="normal"
          variant="contained"
          className={classes.button}
        >
    {/* (Change your profile picture) */}
      </Button>
      </CardActions> 
      <CardActions>
      <Button
          margin="normal"
          fullWidth
          variant="contained"
          className={classes.button}
          >
<Link to={`./Input`}>Edit Profile</Link>
      </Button> 

      </CardActions>
      </Card>
      </Modal>
      </div>

  );
}
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);