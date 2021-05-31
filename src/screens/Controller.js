import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Details from './details/Details';
import Home from './home/Home';
import BookShow from './bookshow/BookShow';

const Controller = function () {
    return (
        <Router>
            <div className = 'router-container'>
                <Route exact path = '/' render = {(props) => <Home {...props}/>}/>
                <Route exact path = '/Details/:id' render = {(props) => <Details {...props}/>}/>
                <Route exact path = '/BookShow/:id' render = {(props) => <BookShow {...props}/>}/>
            </div>
        </Router>
    )
}

export default Controller;