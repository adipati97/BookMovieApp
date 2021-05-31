import React, {useEffect, useState} from 'react';
import Header from '../../common/header/Header';
import UpcomingMovies from "./homecomponents/UpcomingMovies";
import ReleasedMovies from "./homecomponents/ReleasedMovies";
import MovieFilterForm from "../../forms/MovieFilterForm";
import './Home.css';

const Home = function (props) {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);

    useEffect(() => {
        setUpcomingMoviesList();
        setReleasedMoviesList();
    }, [])

    async function setUpcomingMoviesList () {
        const response = await fetch('/api/v1/movies?status=PUBLISHED');
        const responseBody = await response.json();
        setUpcomingMovies(responseBody.movies);
    }

    async function setReleasedMoviesList () {
        const response = await fetch('/api/v1/movies?status=RELEASED');
        const responseBody = await response.json();
        setReleasedMovies(responseBody.movies);
    }

    function updateFilteredMovies (movies) {
        setReleasedMovies(movies);
    }



    return (
        <div>
            <Header movieId = {props.match.params.id}/>
            <div className = 'upcoming-movies-heading'>Upcoming Movies</div>
            <UpcomingMovies upcomingMovies = {upcomingMovies}/>
            <div className = 'released-movies-container'>
                <div style = {{width: '76%', margin: '16px'}}>
                    <ReleasedMovies releasedMovies = {releasedMovies}/>
                </div>
                <div style = {{width: '24%', margin: '16px'}}>
                    <MovieFilterForm updateFilteredMovies = {updateFilteredMovies}/>
                </div>
            </div>
        </div>
    )
}

export default Home;