import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/header/Header';
import './Details.css'

const Details = function (props) {
    console.log(props);
    return(
        <div>
            <Header/>
            <Link to = '/'>
                <Typography style = {{marginTop: '8px', marginLeft: '24px', height: '24px'}}>
                    Back to Home
                </Typography>
            </Link>
            <div className = 'movie-details'>
                <div style = {{width: '20%'}}>Movie Poster</div>
                <div style = {{width: '60%'}}>Movie Details and Trailer</div>
                <div style = {{width: '20%'}}>Artists</div>
            </div>
        </div>
    )
}

export default Details;