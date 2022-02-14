import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl} from '../utils/url';
import {fetchData} from './CommonFunction';

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

// Get user by their id
const getUserById = async (userId, token) => {
  const options = {
    method: 'GET',
    headers: {'x-access-token': token},
  };
  return await fetchData(`${baseUrl}users/${userId}`, options);
};

const updateUser = async (data, token) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  return await fetchData(`${baseUrl}users`, options);
};

export {signUp, login, checkUserName, getUserByToken, getUserById, updateUser};
