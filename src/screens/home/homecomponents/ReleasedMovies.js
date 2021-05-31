import React from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { GridListTileBar } from "@material-ui/core";

const ReleasedMovies = function (props) {
    return (
        <GridList cols = {4}>
            {props.releasedMovies.map((movie) => (
                <GridListTile key={movie.id} style = {{height: '350px'}}>
                    <img src={movie.poster_url} alt={movie.title} />
                    <GridListTileBar title = {movie.title} subtitle = {movie.release_date}/>
                </GridListTile>
            ))}
        </GridList>
    )
}

export default ReleasedMovies;