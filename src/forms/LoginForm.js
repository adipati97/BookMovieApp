import React from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';

const LoginForm = function () {
    return (
        <div style = {{textAlign: 'center'}}>
            <form id = 'login-form' className = 'login-register-form'>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'userName'>Username</InputLabel>
                    <Input id = 'username'/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'password'>Password</InputLabel>
                    <Input id = 'password'/>
                </FormControl><br/><br/>
                <Button variant = 'contained' color = 'primary' style = {{float: 'center'}}>LOGIN</Button> 
            </form>
        </div>
    );
}

export default LoginForm;