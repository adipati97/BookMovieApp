import React, { useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';

const styles = (theme) => ({
    heading: {
        margin: theme.spacing.unit,
        color: theme.palette.primary.light
    },
    cardComponent: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    }
});

function MovieFilterForm (props) {
    const { classes } = props;
    const [movieName, setMovieName] = useState('');
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [releaseDateStart, setReleaseDateStart] = useState('');
    const [releaseDateEnd, setReleaseDateEnd] = useState('');

    const [genresList, setGenresList] = useState([]);
    const [artistsList, setArtistsList] = useState([]);

    async function getAllGenres () {
        const response = await fetch('/api/v1/genres');
        const responseBody = await response.json();
        setGenresList(responseBody.genres);
    }

    async function getAllArtists () {
        const response = await fetch('/api/v1/artists?page=1&limit=20');
        const responseBody = await response.json();
        setArtistsList(responseBody.artists);
    }

    async function handleSubmit (e) {
        e.preventDefault();
        const headers = {
            'Accept': 'application/json',
            'authorization': 'Bearer ' + sessionStorage.getItem('access-token')
        };
        const response = await fetch('/api/v1/admin/movies?' + getQueryString(), {headers});
        if (!response.ok) {
            alert('You must be signed in to filter movies');
        } else {
            const responseBody = await response.json();
            props.updateFilteredMovies(responseBody.movies);
        }
    }

    function getQueryString () {
        let queryString = 'status=RELEASED';
        if (movieName.length > 0) {
            queryString += '&title=' + encodeURIComponent(movieName);
        }
        if (genres.length > 0) {
            queryString += '&genre=' + encodeURIComponent(genres);
        }
        if (artists.length > 0) {
            queryString += '&artists=' + encodeURIComponent(artists);
        }
        if (releaseDateStart.length > 0) {
            queryString += '&start_date=' + releaseDateStart;
        }
        if (setReleaseDateEnd.length > 0) {
            queryString += '&end_date=' + releaseDateEnd;
        }
        return queryString;
    }
    
    return (
        <Card>
            <CardContent>
                <div className = {classes.heading}>FIND MOVIES BY:</div>
                <form id = 'movie-filter-form' onSubmit = {(e) => {handleSubmit(e)}}>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'movieName'>Movie Name</InputLabel>
                        <Input id = 'movieName' type = 'text' value = {movieName} onChange = {({target}) => setMovieName(target.value)}/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'genres'>Genres</InputLabel>
                        <Select id = 'genres' multiple = {true} value = {genres} onChange = {({ target }) => setGenres(target.value)} onFocus = {getAllGenres}>
                            {genresList.map((genre) => (
                                <MenuItem value = {genre.genre} key = {genre.id}>
                                    {genre.genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'artists'>Artists</InputLabel>
                        <Select id = 'artists' multiple = {true} value = {artists} onChange = {({ target }) => setArtists(target.value)} onFocus = {getAllArtists}>
                            {artistsList.map((artist) => (
                                <MenuItem value = {artist.first_name + ' ' + artist.last_name} key = {artist.id}>
                                    {artist.first_name + ' ' + artist.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'release-date-start' shrink = {true}>Release Date Start</InputLabel>
                        <Input id = 'release-date-start' type = 'date' value = {releaseDateStart} onChange = {({ target }) => setReleaseDateStart(target.value)}/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'release-date-end' shrink = {true}>Release Date End</InputLabel>
                        <Input id = 'release-date-end' type = 'date' value = {releaseDateEnd} onChange = {({ target }) => setReleaseDateEnd(target.value)}/>
                    </FormControl>
                    <Button type = 'submit' variant = 'contained' color = 'primary' className = {classes.cardComponent}>APPLY</Button>
                </form>
            </CardContent>
        </Card>
    )
};

export default withStyles(styles)(MovieFilterForm);