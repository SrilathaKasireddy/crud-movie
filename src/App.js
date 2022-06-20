//import logo from "./logo.svg";
import "./App.css";
import { AddColor } from "./AddColor";
import React from "react";
import { AddMovie } from "./AddMovie";
import { useState } from "react";
import { Routes,Route ,Navigate, useNavigate} from "react-router-dom";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { Movie } from "./Movie";
import { MovieDetails } from "./MovieDetails";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {TicTacToe} from "./TicTacToe";
import {EditMovie} from "./EditMovie";

function App() {

  
   const navigate=useNavigate();
   const [mode,setMode]=useState("dark")
   
const theme = createTheme({
  palette: {
    mode: mode,
  },
});

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{borderRadius:10,margin:10,minHeight:"100vh"}} >
    <div className="App">
    <AppBar position="static">
    <Toolbar>
      <Button color="inherit" onClick={()=>navigate("/")}>Home</Button>
      <Button color="inherit" onClick={()=>navigate("/Movies")}>Movies</Button>
      <Button color="inherit" onClick={()=>navigate("/Movies/add")}>Add Movies</Button>
      <Button color="inherit" onClick={()=>navigate("/color-game")}>Color Game</Button>
      <Button color="inherit" onClick={()=>navigate("/TicTacToe")}>TicTacToe Game</Button>
      <Button 
      startIcon={mode==="dark"?<Brightness7Icon/>:<Brightness4Icon/>}
      color="inherit" 
      onClick={()=>{setMode(mode==="light"?"dark":"light")}}>
      {mode==="light"?"dark":"light"}Mode</Button>    
    </Toolbar>
    </AppBar>
    
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Movies/:id" element={<MovieDetails />}/>
        <Route path="/color-game" element={<AddColor/>}/>
        <Route path="/TicTacToe" element={<TicTacToe/>}/>
        <Route path="/Movies" element={<Movie/>}/>
        <Route path="/Movies/add" element={<AddMovie />}/>
        <Route path="/Movies/edit/:id" element={<EditMovie/>}/>
        <Route path="/404" element={<NotFound/>}/>
        <Route path="/films" element={<Navigate replace to="/Movies"/>}/>
        <Route path="/*" element={<Navigate replace to="/404"/>}/>
      </Routes>
        
    </div>
    </Paper>
    </ThemeProvider>
  );
}

 export default App;