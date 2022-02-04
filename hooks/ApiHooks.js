import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl} from '../utils/url';

// Communicating with server
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function for user registration
const signUp = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return await fetchData(`${baseUrl}users`, options);
};

// Function for use login
const login = async (userCredentials) => {
  console.log('Clicked');

  // user credentials format: {username: 'someUsername', password: 'somePassword'}
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  };
  return await fetchData(baseUrl + 'login', options);
};

// Checking user name is available? in server for registration
const checkUserName = async (inputName) => {
  const result = await fetchData(`${baseUrl}users/username/${inputName}`);
  return result.available;
};

// Gets user by their token
const getUserByToken = async (token) => {
  const options = {
    method: 'GET',
    headers: {'x-access-token': token},
  };
  return await fetchData(baseUrl + 'users/user', options);
};

export {signUp, login, checkUserName, getUserByToken};
