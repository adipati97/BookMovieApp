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

const MovieFilterForm = (props) => {
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
    
    return (
        <Card>
            <CardContent>
                <div className = {classes.heading}>FIND MOVIES BY:</div>
                <form>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'movieName'>Movie Name</InputLabel>
                        <Input id = 'movieName' type = 'text' value = {movieName} onChange = {({target}) => setMovieName(target.value)}/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'genres'>Genres</InputLabel>
                        <Select id = 'genres' multiple = {true} value = {genres} onChange = {({ target }) => setGenres(target.value)} onFocus = {getAllGenres}>
                            {genresList.map((genre) => (
                                <MenuItem value = {genre.genre}>
                                    {genre.genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'artists'>Artists</InputLabel>
                        <Select id = 'artists' multiple = {true} value = {artists} onChange = {({ target }) => setArtists(target.value)} onFocus = {getAllArtists}>
                            {artistsList.map((artist) => (
                                <MenuItem value = {artist.id}>
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
                    <Button variant = 'contained' color = 'primary' className = {classes.cardComponent}>APPLY</Button>
                </form>
            </CardContent>
        </Card>
    )
};

export default withStyles(styles)(MovieFilterForm);