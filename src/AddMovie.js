import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";


export function AddMovie() {
  const [moviename, setMovieName] = useState('');
  const [pic, setPic] = useState('');
  const [rating, setRating] = useState('');
  const [summary, setSummary] = useState('');
  const [trailer, setTrailer] = useState('');
  const navigate=useNavigate();
  const newMovie={"moviename": moviename,"pic":pic,"rating":rating,"summary":summary,"trailer":trailer};
  const addMovie =() => {
    fetch("https://618fb4edf6bf450017484a11.mockapi.io/movies", {
    method: "POST",
    body: JSON.stringify(newMovie),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => navigate("/Movies"));
  };
  
  return <div
      className="add-movie-spec">
      <form  className="add-movie-form" >
        
        <TextField
        className="add-movie-name"
        label="Name"
        type="text"
        value={moviename}
        onChange={event => setMovieName(event.target.value)}
        />
        <TextField
        className="add-movie-name"
        label="Poster"
        type="text"
        value={pic}
        onChange={event => setPic(event.target.value)}
        />
       <TextField
       className="add-movie-name"
       label="Rating"
       type="text"
       value={rating}
       onChange={event => setRating(event.target.value)}
       />
       <TextField
          className="add-movie-name"
          label="Summary"
          type="text"
          value={summary}
          onChange={event => setSummary(event.target.value)}
        />
       <TextField
          className="add-movie-name"
          label="Trailer"
          type="text"
          value={trailer}
          onChange={event => setTrailer(event.target.value)}
        />
        <Button className="add-movie-btn" onClick={addMovie} variant="contained" type="submit">ADD MOVIE</Button>
      </form> 
    </div>;
}
