import React, { useEffect, useState } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { GridListTileBar } from "@material-ui/core";

const ReleasedMovies = function () {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('/api/v1/movies?page=1&limit=10&status=RELEASED')
            .then(result => result.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded || (isLoaded && typeof items.movies === 'undefined')) {
        return <div>Loading...</div>;
    } else {
        return (
            <GridList cols = {4}>
                {items.movies.map((movie) => (
                    <GridListTile key={movie.id} style = {{height: '250px'}}>
                        <img src={movie.poster_url} alt={movie.title} />
                        <GridListTileBar title = {movie.title}/>
                    </GridListTile>
                ))}
            </GridList>
        )
    }
}

export default ReleasedMovies;