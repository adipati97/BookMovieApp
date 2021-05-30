import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';

const RegisterForm = function () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState();

    function handleSubmit (e) {
        e.preventDefault();
        const userDetails = {
            'email_address': email,
            'first_name': firstName,
            'last_name': lastName,
            'mobile_number': contactNo,
            'password': password
        };
        const signupRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userDetails)
        };
        fetch('/api/v1/signup', signupRequest)
            .then(response => response.json())
            .then(
                (response) => {
                    if (response.id) {
                        setRegistrationSuccess(true);
                        setRegistrationMessage('Registration successful. Please login!');
                    } else {
                        setRegistrationMessage(response.message);
                        setRegistrationSuccess(false);
                    }
                }
            )
    }

    return (
        <div style = {{textAlign: 'center'}}>
            <form id = 'register-form' className = 'login-register-form' onSubmit = {(e) => {handleSubmit(e)}}>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'first-name'>First Name</InputLabel>
                    <Input id = 'first-name' value = {firstName} onChange = {({ target }) => setFirstName(target.value)}/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'last-name'>Last Name</InputLabel>
                    <Input id = 'last-name' value = {lastName} onChange = {({ target }) => setLastName(target.value)}/>
                </FormControl><br/>
                <FormControl required = {true} >
                    <InputLabel htmlFor = 'email-address'>Email</InputLabel>
                    <Input id = 'email-address' value = {email} onChange = {({ target }) => setEmail(target.value)}/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'new-password'>Password</InputLabel>
                    <Input id = 'new-password' type = 'password' value = {password} onChange = {({ target }) => setPassword(target.value)}/>
                </FormControl><br/>
                <FormControl required = {true}>
                    <InputLabel htmlFor = 'contact-no'>Contact No.</InputLabel>
                    <Input id = 'contact-no' value = {contactNo} onChange = {({ target }) => setContactNo(target.value)}/>
                </FormControl><br/><br/>
                <span>{registrationMessage}</span><br/><br/>
                <Button variant = 'contained' color = 'primary' style = {{float: 'center'}} type = 'submit'>REGISTER</Button>
            </form>
        </div>
    );
}

export default RegisterForm;