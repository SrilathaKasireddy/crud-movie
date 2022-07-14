import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Counter } from './Counter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Paper } from "@mui/material";
import { API} from "./global"







export function MovieCard({ img, name, rating, content, _id, getMovieAPI ,value}) {
  const styles = {
    color: rating > 8 ? "green" : "red"
  };
  const [show, setShow] = useState(true);
  const paraStyles = {
    display: show ? "block" : "none"
  };
  const navigate = useNavigate();
  return (
    <div  >
    <Card style={{borderRadius:10,margin:5,padding:3,minHeight:"100vh",width:350,display:"flex",flexWrap:"wrap",textAlign:"center",justifyContent: "center"}} >
      
        <img  style={{display:"flex",flexWrap:"wrap",paddingBottom: 10,objectFit: "cover"}} className="movieImage" src={img} alt={name} />
        <CardContent>
          <div className="movieCredentials">
            <span className="movieName">{`${name}`}
            <IconButton 
              aria-label="Movie Details"
              size="small" 
              className = "infoIcon"
              color = "primary" 
              onClick={() => {
                navigate(`/movies/${value._id}`);
              }} >
              <InfoIcon />
            </IconButton>
            
              <IconButton 
              aria-label="Movie summary" 
              size="small"
              color = "primary" 
              onClick={() => {
                return setShow(!show);}} >
                {show ? <KeyboardControlKeyIcon /> : <ExpandMoreIcon />}
              </IconButton>
            
            </span>
            <span style={styles} className="movieRating">⭐ {rating} </span>
          </div>
          <div style={paraStyles} className="movieDescription">{content}</div>
        </CardContent>
        
          <Counter />
          <div>
          <IconButton 
            aria-label="Movie Edit"
            style={{marginLeft:"auto"}}
            className = "editIcon"
            color = "primary" onClick = {()=> 
              navigate(`/movies/edit/${value._id}`)}>
            <EditIcon  />
          </IconButton>
          <IconButton 
            aria-label="Movie Delete"
            style={{marginLeft:"auto"}}
            
            className = "deleteIcon"
            color = "primary" onClick = {()=> {
              navigate(`${API}/movies/${value._id}`,
              {method:"DELETE"})
              .then(()=>getMovieAPI());
          }}>
            <DeleteIcon  />
          </IconButton>
      
      </div>
    </Card>
    </div>
   
  
  );

}
