import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg';
import { Button, FormControl, FormHelperText, Input, InputLabel, Tab, Tabs, Typography } from '@material-ui/core';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography>{children}</Typography>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }  

const Header = function () {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <div className = 'header-container'>
                <img src = {Logo} alt = 'Logo' className = 'app-logo'/>
                <Button variant = 'contained' color = 'primary' style = {{float: 'right'}} onClick = {toggleModal}>Login</Button>
                <Button variant = 'contained' color = 'primary' style = {{float: 'right'}}>Logout</Button>
                <Button variant = 'contained' color = 'primary' style = {{float: 'right'}}>Book Show</Button>
                <Modal
                    isOpen = {isOpen}
                    onRequestClose = {toggleModal}
                    contentLabel = "Login-Register Modal"
                    className = 'login-register-modal'
                    centered>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div style = {{textAlign: 'center'}}>
                            <form id = 'login-form' className = 'login-register-form'>
                                <FormControl required = 'true'>
                                    <InputLabel htmlFor = 'userName'>Username</InputLabel>
                                    <Input id = 'username'/>
                                </FormControl><br/>
                                <FormControl required = 'true'>
                                    <InputLabel htmlFor = 'password'>Password</InputLabel>
                                    <Input required = 'true' id = 'password'/>
                                </FormControl><br/><br/>
                                <Button variant = 'contained' color = 'primary' style = {{float: 'center'}}>LOGIN</Button> 
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style = {{textAlign: 'center'}}>
                            <form id = 'register-form' className = 'login-register-form'>
                                <FormControl required = 'true'>
                                    <InputLabel htmlFor = 'first-name'>First Name</InputLabel>
                                    <Input id = 'first-name'/>
                                </FormControl><br/>
                                <FormControl required = 'true'>
                                    <InputLabel htmlFor = 'last-name'>Last Name</InputLabel>
                                    <Input required = 'true' id = 'last-name'/>
                                </FormControl><br/>
                                <FormControl required = 'true' >
                                    <InputLabel htmlFor = 'email-address'>Email</InputLabel>
                                    <Input required = 'true' id = 'email-address'/>
                                </FormControl><br/>
                                <FormControl required = 'true'>
                                    <InputLabel htmlFor = 'new-password'>Password</InputLabel>
                                    <Input required = 'true' id = 'new-password'/>
                                </FormControl><br/>
                                <FormControl required = 'true'>
                                    <InputLabel htmlFor = 'contact-no'>Contact No.</InputLabel>
                                    <Input required = 'true' id = 'contact-no'/>
                                </FormControl><br/><br/>
                                <Button variant = 'contained' color = 'primary' style = {{float: 'center'}}>REGISTER</Button>
                            </form>
                        </div>
                    </TabPanel>
                </Modal>
        </div>
  );
}

export default Header;