//original
import React,{Component} from 'react';
import TestRows from './TestRows';
import {NavLink} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const imgStyle ={
  width: "350px",
  height: "250px"
}


let KB = 0

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        numberofquestions: this.props.numberofquestions,
        backgroundColor: "",
        open: false,
        openSuccess: false,
        openChooseFile: false
            }
    }
    _handleSubmit(e) 
    {
      e.preventDefault();
      console.log('handle uploading-', this.state.file);
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
    handleClose = () => {
      this.setState(
        {
          open: false
        }
      )
    }
    handleCloseSuccess = () => {
      this.setState(
        {
          openSuccess: false
        }
      )
    }
   handleCloseChooseFile = () => {
     this.setState(
       {
         openChooseFile: false
       }
     )
   }
    colorChange = (event) => 
    {     
     let i = parseInt(Math.floor(Math.log(this.state.file.size) / Math.log(1024)));
     KB=  Math.round(this.state.file.size / Math.pow(1024, i), 2);

       if(KB > 64)
       {
         this.setState(
           {
            open: true
           }
         )
       }  
       else if(KB <= 64)
       {
        this.setState(
          {
           openSuccess: true
          }
        )
        event.target.style.color= "grey";
       }
       else{
        this.setState(
          {
           openChooseFile: true
          }
        )
         event.target.style.color="Black"
       }
    }

    render() {
  
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} style={imgStyle}/>);
      } else {
        $imagePreview = (<div><p className="previewText">Please select an Image for Preview</p><br/></div>);
      }
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
 <NavLink to={{Pathname: '/admin/testRows',
       testtwo: this.state.imagePreviewUrl
        }}
        style={{"textDecoration": "none"}}
        onClick={(event) => this.colorChange(event)}
        >
          <Button variant="contained"
          style={{"padding": "5px",
           "marginTop": "5px", "fontSize": "10px"}}
          >
            Upload Image
              </Button>
              </NavLink> 

          </form>
          <div >
            {$imagePreview}
          </div>
          <div>
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Image size cannot exceed 64KB!"}</DialogTitle> 
        <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
         OKAY
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.openSuccess}
        onClose={this.handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Image uploaded successfully!"}</DialogTitle>
        <DialogActions>
            <Button onClick={this.handleCloseSuccess} color="primary" autoFocus>
         OKAY
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.openChooseFile}
        onClose={this.handleCloseChooseFile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Choose a file to upload an image!"}</DialogTitle>
        <DialogActions>
            <Button onClick={this.handleCloseChooseFile} color="primary" autoFocus>
         OKAY
        </Button>
        </DialogActions>
      </Dialog>
           </div>
        </div>
      )
    }
  }
  export default ImageUpload;



