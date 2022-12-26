
import { Grid } from "@material-ui/core";
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { API } from '../global.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const entry = () => navigate("/Home");

  const loginUser = (userDetail) => {
    fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(userDetail),
      headers: {
        "Content-Type": "application/json",
      },

    }).then((data) => data.json())
      .then((data1) => {
        localStorage.setItem("token", data1.token)
        if (data1.message === "successful login") {
          entry();
        }
        else {
          setErrorMsg(data1.message);
        }
      });


  };

  const initialValues = {
    UserName: '',
    Password: '',
  }
  const userValidationSchema = Yup.object({
    UserName: Yup.string().required('Required'),
    Password: Yup.string().required('Required'),
  })

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: userValidationSchema,
    onSubmit: (userDetail) => {
      // console.log("onSubmit", userDetail);
      loginUser(userDetail);
    },
  });
  return (
    <>
      <Grid container direction="row" alignItems="center" justify="center" style={{ backgroundColor: 
        "black" }} >

       

          
       
        <form onSubmit={handleSubmit} 
        
        style={{ padding: "5%", margin: 50, backgroundColor: "black" }}   >

          <TextField
            className="username"
            InputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            label="User Name"
            type="text"
            value={values.UserName}
            name="UserName"
            style={{ padding: 10 }}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.UserName && errors.UserName ? true : false}
            helperText={touched.UserName && errors.UserName ? errors.UserName : ""}
          />
          <br />

          <TextField
            InputProps={{ style: { fontSize: 15 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            className="password"
            label="Password"
            type="password"
            variant="outlined"
            value={values.Password}
            name="Password"
            style={{ padding: 10 }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.Password && errors.Password ? true : false}
            helperText={touched.Password && errors.Password ? errors.Password : ""}
          />
           <br/>
           <br/>
          <button type="submit"
            className="btn btn-success" style={{ height: 40, width: 60, fontSize: 15 }}>Login</button>
           <br/>
           <br/>
          <div className="text-center" style={{ color: "red" }}>
            {errorMsg}
          </div>
          <div className="text-center" style={{ color: "", padding: 5 }} >
            <h4>Don't have an account? <Link to="/Register"><button type="submit"
              className="btn btn-success" style={{ height: 40, width: 65, fontSize: 15 }}>Signup</button></Link></h4>
             <br/>
             <br/>
            <Link to="/ForgetPassword"><button type="submit"
              className="btn btn-success" style={{ height: 40, width: 200, fontSize: 15 }}>Forgotten your password?</button></Link>
          </div>

        </form>
      </Grid>
      <h6 style={{ textAlign: 'center' }} >Made With ❤️ By Srilatha Kasireddy</h6>
    </>
  );
}