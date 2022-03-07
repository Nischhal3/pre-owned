import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl, uploadsUrl} from '../utils/url';
import {fetchData, fetchFromMedia} from './CommonFunction';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  // Fetching all media
  const fetchMedia = async () => {
    try {
      const media = await getFilesByTag(appId);
      const mediaCategory = await fetchFromMedia(media);
      setMediaArray(mediaCategory);
    } catch (error) {
      console.log('Error', error);
    }
  };

  // Fetching media by category
  const getMediaByCategory = async (category) => {
    try {
      const media = await getFilesByTag(`${appId}_${category}`);
      return await fetchFromMedia(media);
    } catch (error) {
      console.log('Error', error);
    }
  };

  // Call loadMedia() only once when the component is loaded
  // Or when the update state is changed in MainContext
  useEffect(() => {
    fetchMedia();
    // return () => {};
  }, [update]);

  return {
    mediaArray,
    getMediaByCategory,
  };
};

const postMedia = async (formData, token) => {
  const options = {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  };

  const response = await fetchData(`${baseUrl}media`, options);
  return response;
};

const putMedia = async (data, token, fileId) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  return await fetchData(baseUrl + `media/${fileId}`, options);
};

const deleteMedia = async (fileId, token) => {
  const options = {
    method: 'DELETE',
    headers: {'x-access-token': token},
  };
  return await fetchData(`${baseUrl}media/${fileId}`, options);
};

const getMediaById = async (fileId) => {
  return await fetchData(`${baseUrl}media/${fileId}`);
};

// Use tag for avatar
const postTag = async (tagData, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(tagData),
  };

  return await fetchData(`${baseUrl}tags/`, options);
};

const getFilesByTag = async (tag) => {
  return await fetchData(`${baseUrl}tags/${tag}`);
};

const useFavourite = () => {
  // Like a post
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({file_id: fileId}),
    };
    return await fetchData(`${baseUrl}favourites`, options);
  };

  const getFavourtiesByFileId = async (fileId) => {
    return await fetchData(`${baseUrl}favourites/file/${fileId}`);
  };

  // Unlike a post
  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchData(`${baseUrl}favourites/file/${fileId}`, options);
  };

  const getFavouritesList = async (token) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    };
    return await fetchData(`${baseUrl}favourites`, options);
  };

  return {
    postFavourite,
    deleteFavourite,
    getFavourtiesByFileId,
    getFavouritesList,
  };
};

const getAvatar = async (userId, setAvatar) => {
  try {
    const avatarArray = await getFilesByTag('pre_owned_avatar_' + userId);
    const fetchedAvatar = avatarArray.pop();

    if (fetchedAvatar !== null) {
      setAvatar(uploadsUrl + fetchedAvatar.filename);
    }
  } catch (error) {
    console.log('Avatar message', error.message);
  }
};

export {
  getFilesByTag,
  postMedia,
  putMedia,
  deleteMedia,
  getMediaById,
  postTag,
  useMedia,
  useFavourite,
  getAvatar,
};
