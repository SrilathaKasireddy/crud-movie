import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import * as yup from "yup";



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
    fetch(`https://618fb4edf6bf450017484a11.mockapi.io/movies/${id}`)
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
      fetch(`https://618fb4edf6bf450017484a11.mockapi.io/movies/${movie.id}`,
        {
          method:"PUT",
          body : JSON.stringify(values),
          headers : {"Content-Type":"application/json"}
        }
      ).then(()=>navigate("/movies"))
    }
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
        <Button  type="submit">SAVE</Button>
      </form>
    );
  }
