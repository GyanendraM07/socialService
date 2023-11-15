import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { display, width } from '@mui/system';
import { Button } from '@mui/material';
import "./Project.css";
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import Axios from 'axios';

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
 const [postopen,setPostopen]=React.useState(false);
 const [data, setdata] = useState({
  file: "",
  caption: "",
  comment: ""
});
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const navigate=new useNavigate();

  const handleClick=(event)=>{
    event.preventDefault();
    navigate('/showpost');
  }
  const profileClick=(event)=>{
    event.preventDefault();
    navigate('/profile');
  }
  useEffect(() => {
    const html = document.querySelector("html");
  }, [])

  const handleClickOpen = () => {
    setPostopen(true);
  };

  const handleClose = () => {
    setPostopen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data.file);
    console.log(data.caption);
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const fd = new FormData();
      fd.append("file", data.file);
      fd.append("caption", data.caption);
      fd.append("user", localStorage.getItem("realusername"));
      const login = await Axios.post("create/post", fd, config);
      alert("Succesfully Posted");
      setPostopen(false);

    }
    catch (error) {

    }
  }

  const HandleChange = (event) => {
    event.preventDefault();
    setdata({ ...data, [event.target.name]: event.target.files[0] });
    console.log(data.file)
  }
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setdata({ ...data, [name]: value });
    console.log(data.caption)
  }

  return (
   <div className='div1'>
    <h1>SocialMedia</h1>
    <Button onClick={handleClick} className="btn" >
    <HomeIcon id="icon1"></HomeIcon>
       <h3  className="h3">Home</h3>
       </Button><br/>
       <Button onClick={handleClick} className="btn" >
    <SearchIcon id="icon1"></SearchIcon>
       <h3  className="h3">Search</h3>
       </Button><br/>
       <Button onClick={handleClick} className="btn" >
    <SlideshowIcon id="icon1"></SlideshowIcon>
       <h3  className="h3">Reels</h3>
       </Button><br/>
       <Button onClick={handleClickOpen} className="btn" >
    <AddCircleOutlineIcon id="icon1"></AddCircleOutlineIcon>
       <h3  className="h3">create</h3>
       </Button><br/>
       <Button onClick={handleClick} className="btn" >
    <MapsUgcOutlinedIcon id="icon1"></MapsUgcOutlinedIcon>
       <h3  className="h3">Message</h3>
       </Button><br/>
       <Button onClick={profileClick} className="btn" >
       <Avatar alt="Remy Sharp"/>
       <h3  className="h3">Profile</h3>
       </Button><br/>
                 

        {/* <BiMessageRoundedEdit></BiMessageRoundedEdit>
        <Button onClick={handleClick}  id="btn2">Search</Button> */}
        <Dialog
        //   sx={{height:'25cm'}}
        open={postopen} onClose={handleClose}>

        <DialogContent>
          <Box
            component="form"
            sx={{
            }}
            noValidate
            autoComplete="off"
          >
            <label>Upload Image Or Vedeo</label>
            <TextField id="outlined-basic" type="file" variant="outlined" fullWidth
              size="small" name='file' onChange={HandleChange} /><br></br>
            <TextField id="outlined-basic" type="text" label="caption" variant="outlined" fullWidth
              size="small" name='caption' onChange={handleChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Post</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}