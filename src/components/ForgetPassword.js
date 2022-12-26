import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField'
import { API } from '../global.js';
import { useState } from 'react';
import { Grid } from "@material-ui/core";
import Paper from '@mui/material/Paper';
export function ForgetPassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const forgetPassword = (emailDetail) => {
    fetch(`${API}/forgetPassword`, {
      method: "POST",
      body: JSON.stringify(emailDetail),
      headers: {
        "Content-Type": "application/json",

      },
    }).then((data) => data.json())
      .then((data1) => {
        setErrorMsg(data1.message);
      }
      );


  };
  const initialValues = {
    Email: '',
  }
  const userValidationSchema = Yup.object({
    Email: Yup.string().email("Must be a valid email").required('Required'),
  })

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: userValidationSchema,
    onSubmit: (emailDetail) => {
      // console.log("onSubmit", emailDetail);
      forgetPassword(emailDetail);
    },
  });
  const style1 = errorMsg === "User exists and password reset mail is sent" ?
    { color: "green" } : { color: "red" }

  return <div className="usercontainer">

    <Grid container direction="row" alignItems="center" justify="center"
      style={{ backgroundColor: "#F7F9F8", minHeight: "100vh" }} >
      <form onSubmit={handleSubmit} style={{ padding: "3%", margin: 50, backgroundColor: "#DEF7EA" }}  >


        <TextField
          InputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 15 } }}
          className="add-user-name"
          label="Enter Registered Mail Id"
          type="Email"
          value={values.Email}
          name="Email"
          style={{ padding: 5 }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.Email && errors.Email ? true : false}
          helperText={touched.Email && errors.Email ? errors.Email : ""}
          variant="standard"
        />
        <br />
        <br />
        <button type="submit"
          className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Submit</button>
        <div className="text-center" >
          {errorMsg}
        </div>
        <br />
        <br />
        <div className="text-center" >
          <h4>Don't have an account?  <Link to="/Register" ><button type="submit"
            className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Signup</button></Link></h4>
          <br />
          <br />
          <br />
          <Link to="/Login"><button type="submit"
            className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Login</button></Link>
        </div>
      </form>
    </Grid>

  </div>;

}

