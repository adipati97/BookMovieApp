import { Button, Card, CardContent, FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import React from 'react';
import { withStyles } from "@material-ui/core/styles";

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
    return (
        <Card>
            <CardContent>
                <div className = {classes.heading}>FIND MOVIES BY:</div>
                <form>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'movieName'>Movie Name</InputLabel>
                        <Input id = 'movieName' type = 'text'/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'genres'>Genres</InputLabel>
                        <Input id = 'genres' type = 'text'/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'artists'>Artists</InputLabel>
                        <Input id = 'artists' type = 'text'/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'release-date-start' shrink = {true}>Release Date Start</InputLabel>
                        <Input id = 'release-date-start' type = 'date'/>
                    </FormControl>
                    <FormControl className = {classes.cardComponent}>
                        <InputLabel htmlFor = 'release-date-end' shrink = {true}>Release Date End</InputLabel>
                        <Input id = 'release-date-end' type = 'date'/>
                    </FormControl>
                    <Button variant = 'contained' color = 'primary' className = {classes.cardComponent}>APPLY</Button>
                </form>
            </CardContent>
        </Card>
    )
};

export default withStyles(styles)(MovieFilterForm);