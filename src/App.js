
import { useEffect, useState } from 'react'

import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard';

// 6c8bd4ad

const apiUrl = 'https://www.omdbapi.com?apikey=6c8bd4ad';

// const movie1 = {
//   "Title" : "spiderman",
//   "Year" : "2012",
//   "Poster" : "N/A",
//   "Type" : 'MOVIE'
// };

const App= () =>{

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const searchMovies =async (title) =>{
    const responce = await fetch(`${apiUrl}&s=${title}`)
    const data = await responce.json();
    setMovies(data.Search);

  }

  // const getRandomMovies = async () => {
  //   const response = await fetch(`${apiUrl}&s=random`);
  //   const data = await response.json();
  //   setMovies(data.Search);
  // };

  const getRandomMovies = async () => {
    const randomTerm = generateRandomTerm();
    const response = await fetch(`${apiUrl}&s=${randomTerm}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  
  const generateRandomTerm = () => {
    const randomWords = ['action', 'fantasy','funny', 'marvel','drama', 'thriller', 'horror', 'science', 'adventure'];
    return randomWords[Math.floor(Math.random() * randomWords.length)];
  };
  
  const handleLogoClick = () => {
    window.location.reload(); 
  };
  

  useEffect(()=>{
    
    getRandomMovies();
  },[])

  return (
    <div className="App">
      <h1 className='logo' onClick={handleLogoClick}>Movie API</h1>

      <div className='search'>
        <input 
        placeholder='search for movies' 
        // value = {spiderman}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <img src={searchIcon}
        alt='search'
        onClick={() => searchMovies(searchTerm)}
        />

      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>
          {movies.map((movie) => (
             <MovieCard movie={movie}/>
  
          ))}
  
          </div>
        ) :
        (
          <div className='empty'>
            <h2>No movies found</h2>;
          </div>
        )
      }

      

    </div>
  );
}

export default App;
