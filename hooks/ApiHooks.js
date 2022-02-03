import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl} from '../utils/url';

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

// const useMedia = () => {
//   const [mediaArray, setMediaArray] = useState([]);
//   const {update} = useContext(MainContext);
//   const loadMedia = async (start = 0, limit = 10) => {
//     try {
//       const response = await fetch(
//         `${baseUrl}media?start=${start}&limit=${limit}`
//       );
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       const json = await response.json();
//       const media = await Promise.all(
//         json.map(async (item) => {
//           const response = await fetch(baseUrl + 'media/' + item.file_id);
//           const mediaData = await response.json();
//           // console.log(mediaData);
//           return mediaData;
//         })
//       );
//       setMediaArray(media);
//       // console.log(mediaArray);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // Call loadMedia() only once when the component is loaded
//   // OR when the update state (MainContext) is changed
//   useEffect(() => {
//     loadMedia(0, 5);
//   }, [update]);

//   const postMedia = async (formData, token) => {
//     const options = {
//       method: 'POST',
//       headers: {
//         'x-access-token': token,
//         'Content-Type': 'multipart/form-data',
//       },
//       body: formData,
//     };
//     return await doFetch(baseUrl + 'media', options);
//   };
//   return {mediaArray, postMedia};
// };

const useLogin = () => {
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
  return {login};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await fetchData(baseUrl + 'users/user', options);
  };

  const signupUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchData(baseUrl + 'users', options);
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await fetchData(baseUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    const result = await fetchData(baseUrl + 'users/username/' + username);
    return result.available;
  };

  return {getUserByToken, signupUser, putUser, checkUsername};
};

// const useTag = () => {
//   const postTag = async (tagData, token) => {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-access-token': token,
//       },
//       body: JSON.stringify(tagData),
//     };
//     return await doFetch(baseUrl + 'tags/', options);
//   };

//   const getFilesByTag = async (tag) => {
//     return await doFetch(baseUrl + 'tags/' + tag);
//   };

//   return {postTag, getFilesByTag};
// };

// export {useMedia, useLogin, useUser, useTag};

export {useLogin, useUser};

// import {baseUrl} from '../../variables/url';
// // Common function to fetch data from server
// const fetcData = async (url, options) => {
//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();
//     console.log('Response', response);
//     if (response.ok) {
//       return json;
//     } else {
//       const message = json.error
//         ? `${json.message} : ${json.error}`
//         : json.message;

//       throw new Error(message || response.statusText);
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Fucntion for user registration
export const signUp = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return await fetchData(`${baseUrl}users`, options);
};
