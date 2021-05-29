import React from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';

const RegisterForm = function () {
    return (
        <div style = {{textAlign: 'center'}}>
            <form id = 'register-form' className = 'login-register-form'>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'first-name'>First Name</InputLabel>
                    <Input id = 'first-name'/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'last-name'>Last Name</InputLabel>
                    <Input id = 'last-name'/>
                </FormControl><br/>
                <FormControl required = {true} >
                    <InputLabel htmlFor = 'email-address'>Email</InputLabel>
                    <Input id = 'email-address'/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'new-password'>Password</InputLabel>
                    <Input id = 'new-password'/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'contact-no'>Contact No.</InputLabel>
                    <Input id = 'contact-no'/>
                </FormControl><br/><br/>
                <Button variant = 'contained' color = 'primary' style = {{float: 'center'}}>REGISTER</Button>
            </form>
        </div>
    );
}

export default RegisterForm;