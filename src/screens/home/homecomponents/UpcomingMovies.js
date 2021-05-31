import React from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { GridListTileBar } from "@material-ui/core";

const UpcomingMovies = function (props) {
    return (
        <GridList cols = {6} style = {{flexWrap: 'nowrap'}}>
            {props.upcomingMovies.map((movie) => (
                <GridListTile key={movie.id} style = {{height: '250px'}}>
                    <img src={movie.poster_url} alt={movie.title} />
                    <GridListTileBar title = {movie.title}/>
                </GridListTile>
            ))}
        </GridList>
    )
}

export default UpcomingMovies;