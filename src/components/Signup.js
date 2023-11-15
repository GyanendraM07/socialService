import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Axios from "axios";
import qs from "qs";
import { height } from "@mui/system";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpSide() {
  const details = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    dateofBirth: "",
    gender: "",
    file: ""
  };
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    dateofBirth: "",
    gender: "",
    file: ""
  });

  useEffect(() => {
  }, []);

  // const token = async () => {
  //   try {
  //     const headers = {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     };
  //     const data = qs.stringify({
  //       username: "user1",
  //       password: "user1",
  //       grant_type: "password",
  //       client_id: "social_service",
  //       client_secret: "3cc86b99-db37-42af-aee0-04c61a331b9d"
  //     });
  //     const login = await Axios.post(
  //       "http://localhost:8080/auth/realms/sample/protocol/openid-connect/token",
  //       data,
  //       { headers }
  //     );
  //     console.log("reached");
  //     console.log(login);
  //     console.log("token" + login.access_tokenin);
  //     if (login.status == 200) {
  //       const { data } = login;
  //       sessionStorage.setItem("jwt_token", data.access_token);
  //       localStorage.setItem("refresh_token", data.refresh_token);
  //       localStorage.setItem("client_id", "social_service");
  //       localStorage.setItem("username", "user1");
  //       localStorage.setItem("expires_in", data.expires_in);
  //       document.body.style.zoom = "95%";
  //     }
  //   } catch (error) {
  //     console.log("login error ", { error });
  //     const errMsg = error.response.data.error_description;
  //   }
  // };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    console.log(value);
    setdata({ ...data, [name]: value });
  };
  const HandleChange = (event) => {
    event.preventDefault();
    setdata({ ...data, [event.target.name]: event.target.files[0] });
    console.log(data.file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      // const {userName,password}= data
    const fd = new FormData()
  fd.append("firstName",data.firstName)
  fd.append("lastName",data.lastName)
  fd.append("gender",data.gender)
  fd.append("userName",data.userName)
  fd.append("password",data.password)
  fd.append("dateofBirth",data.dateofBirth)
  fd.append("file", data.file);
  // fd.append("password",data.password)

      const login = await Axios.post("api/signup", fd ,config);
      alert("Succesfully Posted"+data.file);
       useEffect();
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: '10cm', width: '45.8cm', marginTop: '1cm', paddingLeft: '3cm', paddingRight: '3cm', marginLeft: '6cm' }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
          sx={{ height: '13cm' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              flexDirection: "column",
              alignItems: "center",
              width: '15cm'


            }}
          >
           
            <Typography component="h1" variant="h5" sx={{ marginLeft: '6.4cm',marginTop: '-1.5cm'  }} >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}

            >
              <Grid container spacing={2} sx={{ marginTop: '0.1cm' }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    size="small"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    size="small"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    id="userName"
                    label="Email Address Or Mobile Number"
                    name="userName"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="file"  fullWidth
                    size="small" name='file' onChange={HandleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Date Of birth</label>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="dateofBirth"
                    type="date"
                    id="dateOfBirth"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                    >
                      <FormControlLabel onChange={handleChange} value="female" control={<Radio />} label="Female" />
                      <FormControlLabel onChange={handleChange} value="male" control={<Radio />} label="Male" />
                      <FormControlLabel onChange={handleChange} value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}