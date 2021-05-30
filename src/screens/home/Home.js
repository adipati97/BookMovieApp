import React from 'react';
import Header from '../../common/header/Header';
import UpcomingMovies from "./homecomponents/UpcomingMovies";
import ReleasedMovies from "./homecomponents/ReleasedMovies";
import MovieFilterForm from "../../forms/MovieFilterForm";
import './Home.css';

const Home = function () {
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
                    <MovieFilterForm/>
                </div>
            </div>
        </div>
    )
}

export default Home;