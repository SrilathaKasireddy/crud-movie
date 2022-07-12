import { useEffect ,useState} from 'react';
import { MovieCard } from './MovieCard';
import { API } from './global';

export function Movies() {
  
  const[movieInfo,setmovieInfo]=useState([]);

  function getMovieAPI(){
    fetch(`${API}/movies`)
    .then((data)=>data.json())
    .then((mvs)=>setmovieInfo(mvs));
  }

  useEffect(()=>{
    getMovieAPI();
  },[]);

  return (
    <div className="movieList">
      {movieInfo.map((value, index) => {
        return <MovieCard key={value.id} id={value.id} img={value.imgg} name={value.namee} rating={value.ratingg} 
                          content={value.contentt} mveinf={movieInfo} setmovieInfo={setmovieInfo} getMovieAPI = {getMovieAPI} />;
      })}
    </div>
  );
}
