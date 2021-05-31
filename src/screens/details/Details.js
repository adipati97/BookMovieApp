import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/header/Header';
import './Details.css'
import YouTube from 'react-youtube';

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
                    <div style = {{width: '60%'}}>
                        <Typography variant = 'h2'>{movie.title}</Typography>
                        <div>
                            <Typography inline = {true} style = {{fontWeight: 'bold'} }>Genre: </Typography>
                            <Typography inline = {true}>{movie.genres.join()}</Typography>
                        </div>
                        <div>
                            <Typography inline = {true} style = {{fontWeight: 'bold'}}>Duration: </Typography>
                            <Typography inline = {true}>{movie.duration}</Typography>
                        </div>
                        <div>
                            <Typography inline = {true} style = {{fontWeight: 'bold'}}>Release Date: </Typography>
                            <Typography inline = {true}>{new Date(movie.release_date).toDateString()}</Typography>
                        </div>
                        <div>
                            <Typography inline = {true} style = {{fontWeight: 'bold'}}>Rating: </Typography>
                            <Typography inline = {true}>{movie.critics_rating}</Typography>
                        </div>
                        <div style = {{marginTop: '16px'}}>
                            <Typography inline = {true} style = {{fontWeight: 'bold'}}>Plot: </Typography>
                            <Typography inline = {true}>{movie.storyline}</Typography>
                        </div>
                        <div style = {{marginTop: '16px'}}>
                            <Typography style = {{fontWeight: 'bold'}}>Trailer: </Typography>
                            <YouTube videoId = {movie.trailer_url.split('v=')[1]}/>
                        </div>
                    </div>
                    <div style = {{width: '20%'}}>Artists</div>
                </div>
            </div>
        )
    }
}

export default Details;