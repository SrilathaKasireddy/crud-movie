import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import * as yup from "yup";
import { Card } from "@mui/material";


const formValidationSchema = yup.object({
  namee : yup.string().required("Please add name"),
  imgg : yup.string().required("Please add image source"),
  ratingg : yup.number().required("Please add rating").max(10,"Provide rating from 1-10").min(1,"Provide rating from 1-10"),
  contentt : yup.string().required("Please add summary").min(20,"Minimum 20 characters"),
  trailerr : yup.string().required("Please add trailer source")
}
);


export function MovieAdditionForm() {

  const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues : {
                      namee: "",
                      imgg: "",
                      ratingg: "",
                      contentt: "",
                      trailerr: ""
                    },
    validationSchema : formValidationSchema,
    onSubmit : (values)=>AddMovieAPI(values)
  })

  // const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  // const [rating, setRating] = useState("");
  // const [content, setContent] = useState("");
  // const [trailer, setTrailer] = useState("");
  const navigate = useNavigate();
  // const addMovie = () => {
    // const newMovie = {
    //   namee: name,
    //   imgg: image,
    //   ratingg: rating,
    //   contentt: content,
    //   trailerr: trailer
    // };
  //   addMovieAPI(newMovie);
  // };

  function AddMovieAPI(newMovie){
    fetch("https://618fb4edf6bf450017484a11.mockapi.io/movies",
      {method:"POST",
      body : JSON.stringify(newMovie),
      headers : {"Content-Type":"application/json"}
      }
    ).then(()=>navigate("/movies"))
      // .then((data)=>data.json())
      // .then((mvs)=>setmovieInfo(mvs));
  }

  // useEffect(()=>{
  //   addMovieAPI();
  // },[]);

return(
  <Card sx={{backgroundColor:"#D9D1D1",width:600,alignItems:"center",
      textAlign:"center",justifyContent:"center",marginTop:2,marginLeft:50,height:600,
      objectFit:"cover"}}>
    <form  onSubmit={handleSubmit}  style={{alignItems:"center",textAlign:"center",padding:15}}>
      
      <TextField 
       
      error={touched.namee && errors.namee}
      label="Name"
       variant="outlined"
         name="namee" 
         value={values.namee} 
         onChange={handleChange} 
         onBlur = {handleBlur}
         style={{padding:10,width:500}}
          
           helperText={touched.namee && errors.namee}/>
      {/* {touched.namee && errors.namee} */}

      


      <TextField
      error={touched.imgg && errors.imgg}
     
       label="Poster"
        variant="outlined"
         name="imgg" 
         value={values.imgg}
          onChange={handleChange}
        onBlur = {handleBlur} 
        style={{padding:10,width:500}}
        helperText={touched.imgg && errors.imgg}/>
      {/* {touched.imgg && errors.imgg} */}
      <TextField
      error={touched.ratingg && errors.ratingg}
      
       label="Rating"
        variant="outlined" 
        className="rating input" 
         name="ratingg" 
         value={values.ratingg}
          onChange={handleChange} 
          onBlur = {handleBlur} 
         style={{padding:10,width:500}}
          helperText={touched.ratingg && errors.ratingg}/>
      
      <TextField 
      error={touched.contentt && errors.contentt}
      
      label="Summary" 
      variant="outlined"
       className="summary input"
        name="contentt" 
      value={values.contentt}
       onChange={handleChange}
        onBlur = {handleBlur} 
      style={{padding:10,width:500}}
       helperText={touched.contentt && errors.contentt} />
      
      <TextField 
      error={touched.trailerr && errors.trailerr}
      
      label="Trailer"
       variant="outlined" 
       className="trailer input" 
       name="trailerr" 
      value={values.trailerr} 
      onChange={handleChange} 
      onBlur = {handleBlur} 
      style={{padding:10,width:500}}
       helperText={touched.trailerr && errors.trailerr}/>
      
      <Button variant="outlined" className="addMovieButton" type="submit">Add Movie</Button>
    </form>
    </Card>
  );
}



      
      
       
       