import React from 'react';
import Header from '../../common/header/Header';
import UpcomingMovies from "./homecomponents/UpcomingMovies";
import './Home.css';

const Home = function () {
    return (
        <div>
            <Header/>
            <div className = 'upcoming-movies-heading'>Upcoming Movies</div>
            <UpcomingMovies/>
        </div>
    )
}

export default Home;