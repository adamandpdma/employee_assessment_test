//original
import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import GenerateRows from './GenerateRows'

const imgStyle ={
  width: "350px",
  height: "250px"
}


let KB = 0

class MCUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        numberofquestions: this.props.numberofquestions,
        backgroundColor: "",
        open: false,
        openSuccess: false,
        openChooseFile: false,
        uploadCount: 0,
        alreadyUpload: false,
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
          openSuccess: false,
          alreadyUpload: false
        }
      )
      return(
        <GenerateRows imagePreviewUrl={this.state.imagePreviewUrl}/>
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
       {if (this.state.uploadCount ===0){
        this.setState(
          {
           openSuccess: true,
           uploadCount: +1
          }
        )
        event.target.style.color= "grey";
       }
        else {
          this.setState({
            alreadyUpload: true
          })
        }
        
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
        //   Image upload Area
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
              <NavLink to={{Pathname: '/employee/GenerateRows',
       testTwo: this.state.imagePreviewUrl,
        }}
        style={{"textDecoration": "none"}}
        onClick={(event) => this.colorChange(event)}
        >
          <Button variant="contained"
          style={{"padding": "5px",
           "marginTop": "5px", "fontSize": "10px",
           }}
          >
            Upload MC
              </Button></NavLink>
          </form>
          <div >
            {$imagePreview}
          </div>

          {/* Dialog Boxes */}
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
          {console.log(this.state.file + " " + imagePreviewUrl)}
        <DialogTitle id="alert-dialog-title">{"Image uploaded successfully!"}</DialogTitle>
        <DialogActions>
         <Button onClick={this.handleCloseSuccess} color="primary" autoFocus>
         OKAY
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.alreadyUpload}
        onClose={this.handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Image already uploaded"}</DialogTitle>
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
  export default MCUpload;



