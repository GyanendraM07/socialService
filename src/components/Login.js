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
import ReactDOM from "react-dom";
import Axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import App from "../App";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './Login.css';

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignInSide() {
  const [data, setdata] = useState({
    userName: "",
    password: "",
    error: "",
  });
  // const navigate = useNavigate();

    
  useEffect(() => {
    token();
  }, []);

  const token = async () => {
    try {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const data = qs.stringify({
        username: "user1",
        password: "user1",
        grant_type: "password",
        client_id: "social_service",
        client_secret: "3cc86b99-db37-42af-aee0-04c61a331b9d"
      });
      const login = await Axios.post(
        "http://localhost:8080/auth/realms/sample/protocol/openid-connect/token",
        data,
        { headers }
      );
      console.log("reached");
      console.log(login);
      console.log("token" + login.access_tokenin);
      if (login.status == 200) {
        const { data } = login;
        sessionStorage.setItem("jwt_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("client_id", "social_service");
        localStorage.setItem("username", "user1");
        localStorage.setItem("expires_in", data.expires_in);
        document.body.style.zoom = "95%";
      }
    } catch (error) {
      console.log("login error ", { error });
      const errMsg = error.response.data.error_description;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("inside handlechange" + value);
    setdata({ ...data, [name]: value });
    // setdata[{ ...data, [name]: value }];
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
      console.log(data.name + " " + data.email + " " + data.password);
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
    fd.append("user",data.userName)
    fd.append("password",data.password)

        const login = await Axios.post("api/signin", fd ,config);
        const verfy=login.data.data;
        console.log(verfy)
        if(verfy==true){
          
    localStorage.setItem("realusername", data.userName);
          console.log("first")
          ReactDOM.render(<App />, document.getElementById("root"));
        }
        else{
          alert("pls enter coreect username password");
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div >
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{height:'10cm', marginTop:'3cm',paddingLeft:'3cm',paddingRight:'3cm' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://mpng.subpng.com/20190128/jsu/kisspng-social-media-vector-graphics-multimedia-adradium-5c4ee4b0ba6a23.6731483315486742247636.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            height:'10cm'
            
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        sx={{height:'10cm',backgroundColor:'	#F5F5F5'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              flexDirection: "column",
              alignItems: "center",
              
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main",marginLeft:'4cm',marginTop:'-1cm'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{marginLeft:'3.5cm'}}>
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ marginTop:'0.5cm',width:'8cm',marginLeft:'1cm'}}
              
            >
              <TextField
                autoComplete="off"
                fullWidth
                size="small"
                name="userName"
                label="userId"
                variant="outlined"
                value={data.userId}
                onChange={handleChange}
                required
              />
              <TextField
              sx={{marginTop:'0.5cm'}}
                autoComplete="off"
                required
                fullWidth
                size="small"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                value={data.password}
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 ,marginLeft:'2.3cm'}}
              >
                Sign In
              </Button>
            
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  {/* <Link href="navbar" variant="body2">
                    {"admin home"}
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>);
}
