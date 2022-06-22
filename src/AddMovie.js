import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import { flexbox } from "@mui/system";

const formValidationSchema = yup.object({
  namee : yup.string().required("Please add name"),
  imgg : yup.string().required("Please add poster"),
  ratingg : yup.number().required("Please add rating").max(10,"Provide rating from 1-10").min(1,"Provide rating from 1-10"),
  contentt : yup.string().required("Please add summary").min(20,"Minimum 20 characters"),
  trailerr : yup.string().required("Please add trailer source")
}
);
export function AddMovie() {
  // const [namee, setNamee] = useState('');
  // const [poster, setPoster] = useState('');
  // const [ratingg, setRating] = useState('');
  // const [contentt, setcontentt] = useState('');
  // const [trailerr, setTrailerr] = useState('');
   const navigate=useNavigate();
  // const newMovie={"namee": namee,"poster":poster,"ratingg":ratingg,"contentt":contentt,"trailerr":trailerr};
  
  
  function MovieEditCore({movie}){
    
  const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues : {
                      namee: movie.namee,
                      imgg: movie.imgg,
                      ratingg: movie.ratingg,
                      contentt: movie.contentt,
                      trailerr: movie.trailerr
                    },
    validationSchema : formValidationSchema,
    onSubmit : (values)=>AddMovie(movie,values)
  })

  const AddMovie =() => {
    fetch("https://618fb4edf6bf450017484a11.mockapi.io/movies", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data)=>console.log(data))
  .then(() => navigate("/Movies"));
  };
  return (
    <form onSubmit={handleSubmit} 
    className="formSection">
      
      <TextField 
      error={touched.namee && errors.namee}
      variant="outlined"
      label="Name" 
       
       name="namee" 
       value={values.namee} 
       onChange={handleChange} 
       onBlur = {handleBlur}  
       id="filled-error-helper-text"
       helperText={touched.namee && errors.namee}/>
     
      <TextField  
      error={touched.imgg && errors.imgg}
       label="Poster" 
       variant="outlined" 
       name="imgg" 
       value={values.imgg} 
      onChange={handleChange} 
      onBlur = {handleBlur}  
      id="filled-error-helper-text" 
      helperText={touched.imgg && errors.imgg}/>
      
      <TextField 
      error={touched.ratingg && errors.ratingg}
      label="Rating" 
      
      variant="outlined"
      
       className="rating" 
        name="ratingg" 
        value={values.ratingg} 
        onChange={handleChange}
         onBlur = {handleBlur}  
         id="filled-error-helper-text" helperText={touched.ratingg && errors.ratingg}/>
     
      <TextField 
      error={touched.contentt && errors.contentt}
       label="Summary" 
       variant="outlined" 
       
       name="contentt"
        value={values.contentt} 
        onChange={handleChange} 
        onBlur = {handleBlur}  
        id="filled-error-helper-text"
         helperText={touched.contentt && errors.contentt} />
      
      <TextField  
      error={touched.trailerr && errors.trailerr}
      label="Trailer" 
      variant="outlined"
       className="trailer"
        name="trailerr" 
        value={values.trailerr}
         onChange={handleChange} 
         onBlur = {handleBlur}  
         id="filled-error-helper-text"
          helperText={touched.trailerr && errors.trailerr}/>
      {/* {touched.trailerr && errors.trailerr}  */}
      <Button className="addmovie" type="submit">Add Movie</Button>
    </form>
  );
}
}