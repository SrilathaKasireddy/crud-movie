import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function MovieDetails() {
  const { movieId} = useParams();
  const navigate = useNavigate();
  const [movie,setMovie]=useState({});
  
  const getMovie=()=>{
    fetch(`https://618fb4edf6bf450017484a11.mockapi.io/Movies/${movieId}`,{
      method:"GET",
    }
    )
    .then((data)=>(data.json()))
    .then((mv)=>setMovie(mv));
    }   
  useEffect(()=>getMovie(),[]);
  return <div className="movie-detail-container">
    <iframe
      width="100%"
      height="650"
      src={movie.trailer}
      title="Youtube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
    <div className="movie-detail-container">
      <div className="movie-specs">
        <h2 className="movie-name">{movie.moviename}</h2>
       
      </div>
      <p className="movie-summary">{movie.summary}</p>
      <Button variant="contained" startIcon={<ArrowBackIosIcon />}onClick={() => navigate(-1)}>
  BACK
</Button>
     
    </div>
  </div>;


}
