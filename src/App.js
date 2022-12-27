// import logo from './logo.svg';
import './App.css';

import {createContext, useState} from "react";
import {AddColor} from "./AddColor";

import Login from "./components/Login";
import { Register } from "./components/Register";
import { ForgetPassword } from './components/ForgetPassword';
import { ChangePassword } from "./components/ChangePassword";
import { PasswordUpdated } from "./components/PasswordUpdated";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { MovieAdditionForm } from './MovieAdditionForm';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MovieDetails } from './MovieDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { TicTacToe } from './TicTacToe';
import { Movies } from './Movies';
import { EditMovie } from './EditMovie';
import { BasicForm } from './Basicform';
import SimpleImageSlider from "react-simple-image-slider";


const images = [
  { url: "https://www.koimoi.com/wp-content/new-galleries/2022/01/netflix-shelves-bahubali-before-the-beginning-worth-150-crores-002.jpg" },
  { url: "https://images.indianexpress.com/2021/10/suriya.jpg" },
  
];

const mveinf=
[
  {
   "id": "100",
   "imgg": "https://1.bp.blogspot.com/-xXozKBO7bb4/YNtPyI0431I/AAAAAAAAGVo/XqivzSQ4qBwTPKEXv0zCI1xzcxJ0Z43RACLcBGAsYHQ/s0/HDgallery%2BRRR%2BRC%2BNTR.jpeg",
   "namee": "RRR",
   "ratingg": 8.8,
   "contentt": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
   "trailerr": "https://www.youtube.com/embed/f_vbAtFSEc0"
  },
  {
   "id": "101",
   "imgg": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
   "namee": "Iron man 2",
   "ratingg": 7,
   "contentt": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
   "trailerr": "https://www.youtube.com/embed/wKtcmiifycU"
  },
  {
   "id": "102",
   "imgg": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e21dcb82167047.5d14eb668443a.jpg",
   "namee": "No Country for Old Men",
   "ratingg": 8.1,
   "contentt": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money. ",
   "trailerr": "https://www.youtube.com/embed/38A__WT3-o0"
  },
  {
   "id": "103",
   "imgg": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
   "namee": "Jai Bhim",
   "ratingg": 8.8,
   "contentt": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
   "trailerr": "https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {
   "id": "104",
   "imgg": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
   "namee": "The Avengers",
   "ratingg": 8,
   "contentt": "Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.",
   "trailerr": "https://www.youtube.com/embed/eOrNdBpGMv8"
  },
  {
   "id": "105",
   "imgg": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
   "namee": "Interstellar",
   "ratingg": 8.6,
   "contentt": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
   "trailerr": "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
   "id": "106",
   "imgg": "https://lumiere-a.akamaihd.net/v1/images/p_ratatouille_19736_0814231f.jpeg",
   "namee": "Ratatouille",
   "ratingg": 8,
   "contentt": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
   "trailerr": "https://www.youtube.com/embed/NgsQ8mVkN8w"
  },
  {
   "id": "107",
   "imgg": "https://m.media-amazon.com/images/M/MV5BZTM1MGM3NjgtZjE4Mi00ZTNlLWI3ODAtNTViZjFmMDc3MjlhXkEyXkFqcGdeQXVyOTA3MTM0MTM@._V1_.jpg",
   "namee": "96",
   "ratingg": 8.6,
   "contentt": "K Ramachandran, a photographer, gets nostalgic after he visits his school in his hometown. During a reunion with his classmates, he meets Janaki, his childhood sweetheart.",
   "trailerr": "https://www.youtube.com/embed/r0synl-lI4I"
  },
  {
   "id": "108",
   "imgg": "https://st1.bollywoodlife.com/wp-content/uploads/2017/11/Bahubali-The-beginning.jpg",
   "namee": "Baahubali",
   "ratingg": 8,
   "contentt": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
   "trailerr": "https://www.youtube.com/embed/sOEg_YZQsTI"
  },
  {
   "id": "109",
   "imgg": "https://m.media-amazon.com/images/M/MV5BZjAzZjZiMmQtMDZmOC00NjVmLTkyNTItOGI2Mzg4NTBhZTA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
   "namee": "M.S. Dhoni: The Untold Story",
   "ratingg": 7.9,
   "contentt": "M S Dhoni, a boy from Ranchi, aspires to play cricket for India. Though he initially tries to please his father by working for the Indian Railways, he ultimately decides to chase his dreams.",
   "trailerr": "https://www.youtube.com/embed/6L6XqWoS8tw"
  },
  {
   "id": "110",
   "imgg": "https://m.media-amazon.com/images/I/51r4i5VQK3L._AC_.jpg",
   "namee": "The Dark Knight",
   "ratingg": 9,
   "contentt": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
   "trailerr": "https://www.youtube.com/embed/EXeTwQWrcwY"
  },
  {
   "id": "111",
   "imgg": "https://cdn.wallpapersafari.com/42/10/RmUqYA.jpg",
   "namee": "King Kong",
   "ratingg": 9,
   "contentt": "Peter Jackson's expansive remake of the 1933 classic follows director Carl Denham (Jack Black) and his crew on a journey from New York City to the ominous Skull Island to film a new movie. Accompanying him are playwright Jack Driscoll (Adrien Brody) and actress Ann Darrow (Naomi Watts), who is whisked away by the monstrous ape, Kong, after they reach the island. The crew encounters dinosaurs and other creatures as they race to rescue Ann, while the actress forms a bond with her simian captor.",
   "trailerr": "https://www.youtube.com/embed/V00s34PFHVo"
  },
  {
   "id": "112",
   "imgg": "https://static.moviecrow.com/gallery/20210710/187352-E57obaLUUAE48xs.jfif",
   "namee": "Vikram",
   "ratingg": 8,
   "contentt": "Amar is assigned to investigate a case of serial killings. When Amar investigates the case, he realizes it is not what it seems to be and following down this path will lead to nothing but war between everyone involved.",
   "trailerr": "https://www.youtube.com/embed/OKBMCL-frPU"
  },
  {
   "id": "113",
   "imgg": "https://afilmywap.online/wp-content/uploads/2022/06/Brahmastra-Movie.jpg",
   "namee": "Brahmastra",
   "ratingg": 8,
   "contentt": "This is the story of Shiva who sets out in search of love and self-discovery. During his journey, he has to face many evil forces that threaten our existence.",
   "trailerr": "https://www.youtube.com/embed/BUjXzrgntcY"
  }
 ]

function App() {
  const [mode,setMode] = useState("dark");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  
  const[movieInfo,setmovieInfo]=useState(mveinf);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  console.log(token)
  if (token)
    var Username = parseJwt(token).UserName
   
    
  
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{borderRadius:10,margin:10,minHeight:"100vh"}} >
        <div className="App">
          
          <AppBar position="static">
            <Toolbar className="toolBar">
              <div>
                <Button color="inherit" onClick = {()=>
                   navigate("/")}>Home</Button>
                
                <Button color="inherit" onClick = {()=>
                   navigate("/movies")}>Movies</Button>
                <Button color="inherit" onClick = {()=> 
                  navigate("/addmovies")}>Add Movies</Button>
                {/* <Button color="inherit" onClick = {()=>
                   navigate("/addcolor")}>Color Game</Button> */}
                {/* <Button color="inherit" onClick = {()=>
                   navigate("/tictactoe")}>TicTacToe</Button> */}
              </div>
              <div >
                <Button 
                 color="inherit" 
                 className="modeButton" onClick = {()=> 
                  setMode(mode==="light" ? "dark" : "light")
                  }>{mode==="light" ? <Brightness4Icon/> : <Brightness7Icon/>}&nbsp;&nbsp;
                    {mode==="light" ? "Dark Mode" : "Light Mode"}
                </Button>
               
                

              </div>
            </Toolbar>
          </AppBar>
              
          <Routes>
           
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} />
            
            
            <Route path="/movies" 
            element={<Movies />} />
            <Route path="/addmovies"
            element={<MovieAdditionForm />}/>
            {/* <Route path="/addcolor" element={<AddColor />} /> */}
            {/* <Route path="/tictactoe" element={<TicTacToe/>} /> */}
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/movies/edit/:id" 
            element={<EditMovie />} />
            <Route path="/basicform" element={<BasicForm />} />
            <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/PasswordUpdated" element={<PasswordUpdated />} />
        <Route path="/reset-password/:id/:token" element={<ChangePassword />} />
          </Routes>
        </div>
        </Paper>
    </ThemeProvider>
  ) 
}

function NotFound(){
  return <h1>404 not found</h1>
}



export {App};






export function Home(){

  

  const [sliderOptions, setSliderOptions] = useState({
    useGPURender: true,
    showNavs: true,
    showBullets:true,
    loop: true,
    autoPlay: true,
    autoPlayDelay: 2,
    startIndex: 3,
    navStyle: 1,
    navSize: 50,
    navMargin: 30,
    duration: 0.5,
    bgColor: '#000'
  });
   
    return (
      <div style={{ Width:"90%",
      height:"100%",margin:30,objectFit:"contain"}} >
      <SimpleImageSlider
     
        width={1400} 
        loop={sliderOptions.loop}
        showBullets={sliderOptions.showBullets}
        autoPlay={sliderOptions.autoPlay}
        autoPlayDelay={sliderOptions.autoPlayDelay}
        startIndex={sliderOptions.startIndex}
        useGPURender={sliderOptions.useGPURender}
        navStyle={sliderOptions.navStyle}
        navSize={sliderOptions.navSize}
        navMargin={sliderOptions.navMargin}
        slideDuration={sliderOptions.duration}
        
        height={504}
        images={images}
        
      />
    </div>
        
    );
};

