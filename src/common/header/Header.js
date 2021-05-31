import React, { useEffect, useState } from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg';
import { Button, Tab, Tabs, Typography } from '@material-ui/core';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import LoginForm from '../../forms/LoginForm';
import RegisterForm from '../../forms/RegisterForm';
import {Link} from 'react-router-dom';

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
            <Typography component = 'span'>{children}</Typography>
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

const Header = function (props) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = React.useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
      const userAccessToken = sessionStorage.getItem('access-token');
      if (userAccessToken) {
        setIsUserLoggedIn(true);
      }
    }, [])

    const updateLoggedInStatus = (loggedIn) => {
      setIsUserLoggedIn(loggedIn);
      if (isOpen) {
        toggleModal();
      }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function handleLogout () {
      const logoutRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + sessionStorage.getItem('access-token')
        }
      };
      fetch('/api/v1/auth/logout', logoutRequest)
        .then(
          (response) => {
            if (response.status === 200) {
              sessionStorage.removeItem('access-token');
              updateLoggedInStatus(false);
            } else {
              console.log('Invalid access token');
            }
          }
        )
    }

    let buttonsToDisplay;
    if (props.movieId !== undefined) {
      buttonsToDisplay = isUserLoggedIn ?
        <span>
          <Button variant = 'contained' color = 'primary' style = {{float: 'right'}} onClick = {handleLogout}>Logout</Button>
          <Link to = {'/BookShow/' + props.movieId}>
            <Button variant = 'contained' color = 'primary' style = {{float: 'right'}}>Book Show</Button>
          </Link>
        </span>
        :
        <span>
          <Button variant = 'contained' color = 'primary' style = {{float: 'right'}} onClick = {toggleModal}>Login</Button>
          <Button variant = 'contained' color = 'primary' style = {{float: 'right'}} onClick = {toggleModal}>Book Show</Button>
        </span>
    } else {
      buttonsToDisplay = isUserLoggedIn ?
        <Button variant = 'contained' color = 'primary' style = {{float: 'right'}} onClick = {handleLogout}>Logout</Button>
        :
        <Button variant = 'contained' color = 'primary' style = {{float: 'right'}} onClick = {toggleModal}>Login</Button>
    }

    return (
        <div className = 'header-container'>
          <img src = {Logo} alt = 'Logo' className = 'app-logo'/>
          {buttonsToDisplay}
          <Modal
              isOpen = {isOpen}
              onRequestClose = {toggleModal}
              contentLabel = "Login-Register Modal"
              className = 'login-register-modal'
              centered>
              <Tabs value = {value} onChange = {handleChange}>
                  <Tab label = "Login" {...a11yProps(0)} />
                  <Tab label = "Register" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value = {value} index = {0}>
                  <LoginForm updateLoggedInStatus = {updateLoggedInStatus} isUserLoggedIn = {isUserLoggedIn}/>
              </TabPanel>
              <TabPanel value = {value} index = {1}>
                  <RegisterForm/>
              </TabPanel>
          </Modal>
        </div>
  );
}

export default Header;