import { GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/header/Header';
import './Details.css'
import YouTube from 'react-youtube';
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
        const toggleStarFilling = (e) => {
            e.target.style.fill = 'black' ? 'yellow' : 'black';
        }
        return(
            <div>
                <Header movieId = {props.match.params.id}/>
                <Link to = '/'>
                    <Typography style = {{marginTop: '8px', marginLeft: '24px', height: '24px'}}>
                        &lt; Back to Home
                    </Typography>
                </Link>
                <div className = 'movie-details'>
                    <div style = {{width: '20%', marginLeft: '24px'}}>
                        <img src = {movie.poster_url} alt = {movie.title}/>
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
                    <div style = {{width: '20%'}}>
                        <Typography style = {{fontWeight: 'bold'}}>Rate this movie:</Typography>
                        <span className = 'movie-rating'>
                            <StarBorderIcon style = {{fill: 'black'}} onClick = {toggleStarFilling}/>
                            <StarBorderIcon style = {{fill: 'black'}} onClick = {toggleStarFilling}/>
                            <StarBorderIcon style = {{fill: 'black'}} onClick = {toggleStarFilling}/>
                            <StarBorderIcon style = {{fill: 'black'}} onClick = {toggleStarFilling}/>
                            <StarBorderIcon style = {{fill: 'black'}} onClick = {toggleStarFilling}/>
                        </span>
                        <div style = {{marginTop: '16px'}}>
                            <GridList cols = {2}>
                                {movie.artists.map((artist) => (
                                    <GridListTile key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + artist.last_name}/>
                                        <GridListTileBar title = {artist.first_name + artist.last_name}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;