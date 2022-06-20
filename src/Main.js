import { useState } from "react";
import { Counter } from "./Counter";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {Button,Paper} from "@mui/material"

export function Main({ moviename, pic, rating, summary ,id, deleteButton,editButton}) {
  const styles = {
    color: rating > 8 ? "green" : "red",
  };
  const [show, setShow] = useState(true);
  // const paraStyle = {
  //   display: show ? "block" : "none",
  // };
  const navigate=useNavigate();
 

  return (
   <Paper elevation={4} style={{borderRadius:10,margin:10,minHeight:"100vh"}}>
  
    <img  src={pic} alt={moviename} />
    
    
      <h1 className="movie-name">
        {moviename}
      <IconButton aria-label="Movie Details" color="primary" onClick={()=>navigate(`/Movies/${id}`)}>
        <InfoIcon />
      </IconButton> 
      <IconButton aria-label="Movie Details" color="primary" onClick={() => setShow(!show)}>
        {show?<ExpandLessIcon/>:<ExpandMoreIcon/>}
      </IconButton>
      </h1> 
      <p style={styles} className="movie-rating">
        ⭐{rating}</p>
    
    {/* Conditional styling */}
    {/* <p style={paraStyle} className="movie-summary">{summary}</p> */}

    {/*Conditional rendering  */}
    {show ? <p className="summary">{summary}</p> : null}
    
     
      <div className="movie-counter-del">
      <Button style={{border:"none",margin:20,borderRadius:50}} ><Counter/></Button> 
     {deleteButton}
     {editButton}
      </div>
      
   
    </Paper>
    );
}





