import React, {useRef, useState} from 'react';
import Header from '../../common/header/Header';
import UpcomingMovies from "./homecomponents/UpcomingMovies";
import ReleasedMovies from "./homecomponents/ReleasedMovies";
import MovieFilterForm from "../../forms/MovieFilterForm";
import './Home.css';

const Home = function () {
    const [filteredMovies, setFilteredMovies] = useState([]);

    function updateFilteredMovies (movies) {
        console.log(movies);
        setFilteredMovies(movies);
    }

    return (
        <div>
            <Header/>
            <div className = 'upcoming-movies-heading'>Upcoming Movies</div>
            <UpcomingMovies/>
            <div className = 'released-movies-container'>
                <div style = {{width: '76%', margin: '16px'}}>
                    <ReleasedMovies/>
                </div>
                <div style = {{width: '24%', margin: '16px'}}>
                    <MovieFilterForm updateFilteredMovies = {updateFilteredMovies}/>
                </div>
            </div>
        </div>
    )
}

export default Home;