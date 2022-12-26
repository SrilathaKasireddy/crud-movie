import { useState } from "react";
import Badge from '@mui/material/Badge';
import {Button} from "@mui/material"
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
export function Counter() {
 const [like, setLike] = useState(0);
 const [disLike, setDislike] = useState(0);


 return (
  <div>
  <Button >
   <Badge className="like" badgeContent= {like}  color="primary"  >
      <ThumbUpRoundedIcon style={{ fill: '#EFD126' }}   className="likebutton" 
      onClick={() => setLike(like + 1)}/>
    </Badge>
   </Button>
   <Button>
   <Badge  className="dislike"  badgeContent={disLike}  color="error" >
      <ThumbDownAltRoundedIcon style={{ fill: '#EFD126' }}   className="disLikebutton" onClick={() => setDislike(disLike + 1)}/>
    </Badge>
   
  </Button>
  </div>
 );
}