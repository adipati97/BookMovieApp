import React, { useState } from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';

const LoginForm = function ({updateLoggedInStatus}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit (e) {
        e.preventDefault();
        const credentials = window.btoa(username + ':' + password);
        const loginRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": "Basic " + credentials
            }
        };
        fetch('/api/v1/auth/login', loginRequest)
            .then(
                (response) => {
                    sessionStorage.setItem('access-token', response.headers.get('access-token'));
                    updateLoggedInStatus(true);
                },
                (error) => {
                    updateLoggedInStatus(false);
                }
            )
    }

    return (
        <div style = {{textAlign: 'center'}}>
            <form id = 'login-form' className = 'login-register-form' onSubmit = {(e) => {handleSubmit(e)}}>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'userName'>Username</InputLabel>
                    <Input id = 'username' value = {username} onChange = {({ target }) => setUsername(target.value)}/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'password'>Password</InputLabel>
                    <Input id = 'password' value = {password} onChange = {({ target }) => setPassword(target.value)}/>
                </FormControl><br/><br/>
                <Button  type = 'submit' variant = 'contained' color = 'primary' style = {{float: 'center'}}>LOGIN</Button> 
            </form>
        </div>
    );
}

export default LoginForm;