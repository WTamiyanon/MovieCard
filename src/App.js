/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";

// dec0a434

const API_URL = 'https://www.omdbapi.com?apikey=dec0a434';
const DEFAULT_INITIAL_QUERY = 'Movie';

const App = () => {
    const [ movies, setMovies ] = useState ([]);
    const [ searchTerm, setSearchTerm ] = useState ('');
    const [ isLoading, setIsLoading ] = useState(false);

    const searchMovies = async (title) => {
        const query = title.trim() === '' ? DEFAULT_INITIAL_QUERY : title;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}&s=${query}`);
            const data = await response.json();

            setMovies(data.Search || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
        
    };
    useEffect(() => {
        searchMovies(searchTerm);
    }, [searchTerm]);
    return (
        <div className="app">
            <h1>MovieLander</h1>
            <div className="search">
                <input 
                    placeholder="Search for movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTerm);
                        }
                    }}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {isLoading && (
                <div className="loading">
                    <h2>Loading...</h2>
                </div>
            )}

            { !isLoading && (
                movies && movies?.length > 0 ? (
                    <div className="container">
                        { movies.map((movie) => ( 
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            )}

        </div>
    );
}

export default App;