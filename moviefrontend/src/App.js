import './App.css';
import api from './api/axiosConfig'
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const getMovies = async () =>{
    try{
       const res = await api.get("/api/v1/movies"); 
       setMovies(res.data);
    }
    catch(err){
      console.log(err);
    }
   
  }

  const getMovieData  = async (moviesId) => {
    try{
      const response = await api.get(`/api/v1/movies/${movieId}`); 
      const singleMovie = response.data;
      setMovie(singleMovie);
      setMReviews(singleMovie.reviews);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path='/' element={<Home movies={movies}/>} />
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}/>
        <Route path="/Reviews:movieId" element={<Reviews getMovieData={getMovieData()} reviews= {reviews} setReviews = {setReviews()}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
