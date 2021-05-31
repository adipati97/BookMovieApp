import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/header/Header';
import './Details.css'

const Details = function (props) {
    const [movie, setMovie] = useState();
    useEffect(() => {
        const movieId = props.match.params.id;
        const headers = {
            'Accept': 'application/json',
            'authorization': 'Bearer ' + sessionStorage.getItem('access-token')
        };
        fetch('/api/v1/admin/movies/' + movieId, {headers})
            .then(response => response.json())
            .then(
                (response) => {
                    setMovie(response);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])
    if (movie === undefined) {
        return (<div>Loading...</div>)
    } else {
        return(
            <div>
                <Header/>
                <Link to = '/'>
                    <Typography style = {{marginTop: '8px', marginLeft: '24px', height: '24px'}}>
                        &lt; Back to Home
                    </Typography>
                </Link>
                <div className = 'movie-details'>
                    <div style = {{width: '20%', marginLeft: '24px'}}>
                        <img src = {movie.poster_url}/>
                    </div>
                    <div style = {{width: '60%'}}>Movie Details and Trailer</div>
                    <div style = {{width: '20%'}}>Artists</div>
                </div>
            </div>
        )
    }
}

export default Details;