import React from "react";
import { Main } from "./Main";
import {useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate} from "react-router-dom";


export function Movie() {

  const [movieList, setMovieList] = useState([]);
  const navigate=useNavigate();
  const getMovies=()=>{
  fetch("https://618fb4edf6bf450017484a11.mockapi.io/movies",{
    method:"GET",
  }
  )
  .then((data)=>(data.json()))
  .then((mvs)=>setMovieList(mvs));
  }   
  useEffect(()=>getMovies(),[]);
  const handleDelete=(id)=>{
    fetch(`https://618fb4edf6bf450017484a11.mockapi.io/movies/${id}`,{
    method:"DELETE",
  }).then(()=>getMovies());
  }
  
  return <div className="movie-list">
    {movieList.map((ele, index) => (<Main 
    key={ele.id} 
    moviename={ele.moviename} 
    pic={ele.pic} 
    rating={ele.rating} 
    summary={ele.summary} 
    id={ele.id} 
    movieList={movieList} 
    setMovieList={setMovieList}
    deleteButton={<IconButton 
    aria-label="Movie-delete-button" 
    color="error" 
    onClick={()=>handleDelete(ele.id)}>
    <DeleteIcon />
  </IconButton>}
  editButton={<IconButton 
    aria-label="Movie-edit-button" 
    color="primary" 
    onClick={()=>navigate(`/Movies/edit/${ele.id}`)}>
    <EditIcon />
  </IconButton>}
      />))}
  </div>;
}
  