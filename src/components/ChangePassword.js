import { Typography } from '@mui/material'
import { Grid } from "@material-ui/core";
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { API } from '../global.js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export function ChangePassword() {
  const param = useParams();
  const id = param.id;
  const token = param.token;


  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  // const entry=()=>navigate("/");
  const authDetail = { id: id, token: token }

  const getApproval = (authDetail) => {
    fetch(`${API}/verifyToken`, {
      method: "POST",
      body: JSON.stringify(authDetail),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`

      },
    }).then((data) => data.json())
      .then((data1) => {
        if (data1.message === "Changing Password Approved") {
          setMessage("Approved");
        }
        else {
          setMessage(data1.message);
        }
      });
  }
  useEffect(() => getApproval(authDetail), []);

  return (message ? ((message === "Approved") ? <SetNewPassword id={id} /> : <div style={{ textAlign: "center", fontSize: "50px" }}>{`${message}`}</div>) : <div><h1 style={{ textAlign: "center", fontSize: "50px" }}>Loading....</h1></div>);
}

function SetNewPassword({ id }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const changePassword = (newPassword) => {
    const newData = { Password: newPassword.Password, id: id }
    fetch(`${API}/changePassword`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`

      },
    }).then((data) => data.json())
      .then((data1) => {
        if (data1.message === "Password updated successfully") {
          navigate("/PasswordUpdated")
        } else {
          setErrorMsg(data1.message);
        }
      });


  };
  const initialValues = {
    Password: '',
    Password2: ''
  }
  const userValidationSchema = Yup.object({
    Password: Yup.string().min(8).required(),
    Password2: Yup.string().min(8).required().oneOf([Yup.ref('Password'), null], 'Passwords must match')
  })

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: userValidationSchema,
    onSubmit: (newPassword) => {
      // console.log("onSubmit", newPassword);
      changePassword(newPassword);
    },
  });

  return (<div className="usercontainer">
    <Grid container direction="row" alignItems="center" justify="center" style={{ minHeight: "100vh", backgroundColor: "#F7F9F8" }} >
      <form onSubmit={handleSubmit} style={{ padding: "3%", margin: 50, backgroundColor: "#DEF7EA" }}  >
        <Typography variant="h4" pb={2}
          sx={{
            textAlign: 'center',
          }}>
          Reset Password
        </Typography>

        <TextField
          InputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 15 } }}
          className="password"
          label="New Password"
          type="password"
          value={values.Password}
          name="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.Password && errors.Password ? true : false}
          style={{ padding: 5 }}
          variant="filled"
          helperText={touched.Password && errors.Password ? errors.Password : ""}
        />

        <br />
        <TextField
          variant="filled"
          style={{ padding: 5 }}
          InputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 15 } }}
          className="password"
          label="Confirm Password"
          type="password"
          value={values.Password2}
          name="Password2"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.Password2 && errors.Password2 ? true : false}
          helperText={touched.Password2 && errors.Password2 ? errors.Password2 : ""}
        />
        <br />
        <br />
        <button type="submit"
          className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Submit</button>
        <div className="text-center" style={{ color: "red" }}>
          {errorMsg}
        </div>
        <div className="text-center" >
          <Link to="/Register" ><button type="submit"
            className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Signup</button></Link>

          <br />
          <br />

          <Link to="/Login"><button type="submit"
            className="btn btn-success" style={{ height: 40, width: 70, fontSize: 15 }}>Login</button></Link>
        </div>

      </form>
    </Grid>

  </div>);
}