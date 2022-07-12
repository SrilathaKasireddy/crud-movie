import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import * as yup from "yup";
import { Card } from "@mui/material";
import { API } from "./global";



const formValidationSchema = yup.object({
  namee : yup.string().required("Movie name is required"),
  imgg : yup.string().required("Please add image "),
  ratingg : yup.number().required("Please add rating").max(10,"Provide rating from 1-10").min(1,"Provide rating from 1-10"),
  contentt : yup.string().required("Please add summary").min(20,"Minimum 20 characters"),
  trailerr : yup.string().required("Please add trailer "),
}
);



export function EditMovie() {

  const[movie,setMovie]=useState(null);
  const { id } = useParams();
  
  function getMovieAPI(){
    fetch(`${API}/movies/${id}`)
    .then((data)=>data.json())
    .then((mvs)=>setMovie(mvs));
  }

  useEffect(()=>{
    getMovieAPI();
  },[]);






  return(
    movie ? <MovieEditCore movie={movie}/> : "Loading..."
  )

}



  function MovieEditCore({movie}){
    // const [name, setName] = useState(movie.namee);
    // const [image, setImage] = useState(movie.imgg);
    // const [rating, setRating] = useState(movie.ratingg);
    // const [content, setContent] = useState(movie.contentt);
    // const [trailer, setTrailer] = useState(movie.trailerr);

    // const editMovie = () => {
    //   const editedMovie = {
    //     namee: name,
    //     imgg: image,
    //     ratingg: rating,
    //     contentt: content,
    //     trailerr: trailer
    //   };
    //   // setmovieInfo([...movieInfo, newMovie]);
    //   // console.log(newMovie);
    //   editMovieAPI(editedMovie);
    // };
// }

    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
      initialValues : {
                        namee: movie.namee,
                        imgg: movie.imgg,
                        ratingg: movie.ratingg,
                        contentt: movie.contentt,
                        trailerr: movie.trailerr
                      },
      validationSchema : formValidationSchema,
      onSubmit : (values)=>editMovieAPI(movie,values)
    })

    



    const navigate = useNavigate();

    function editMovieAPI(movie,values){
      fetch(`${API}/movies/${movie.id}`,
        {
          method:"PUT",
          body : JSON.stringify(values),
          headers : {"Content-Type":"application/json"}
        }
      ).then(()=>navigate("/movies"))
    }
    return (
      <Card sx={{width:600,alignItems:"center",
      textAlign:"center",justifyContent:"center",marginTop:2,marginLeft:50,height:600,
      objectFit:"cover"}}>
    <form  onSubmit={handleSubmit}  style={{alignItems:"center",textAlign:"center",padding:10,color:"black"}}>
      
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
      
        <Button  type="submit">SAVE</Button>
      </form>
      </Card>
    );
  }
