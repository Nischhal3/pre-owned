import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl, uploadsUrl} from '../utils/url';
import {fetchData, fetchFromMedia} from './CommonFunction';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  // Category items
  const [home, setHome] = useState([]);
  const [electronics, setElectornics] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [sports, setSports] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [others, setOthers] = useState([]);

  // Category tags
  const homeTag = `${appId}_Home & Living`;
  const electronicsTag = `${appId}_Electronics`;
  const clothingTag = `${appId}_Clothing`;
  const sportsTag = `${appId}_Sports`;
  const gamingTag = `${appId}_Gaming & Accessories`;
  const othersTag = `${appId}_Others`;

  const fetchMedia = async () => {
    try {
      // Fetching items by category
      const allMedia = await getFilesByTag(appId);
      const homeMedia = await getFilesByTag(homeTag);
      const electronicsMedia = await getFilesByTag(electronicsTag);
      const clothingMedia = await getFilesByTag(clothingTag);
      const sportsMedia = await getFilesByTag(sportsTag);
      const gamingMedia = await getFilesByTag(gamingTag);
      const othersMedia = await getFilesByTag(othersTag);

      // Storing items by category
      const allMediaCategory = await fetchFromMedia(allMedia);
      const homeCategory = await fetchFromMedia(homeMedia);
      const electronicsCategory = await fetchFromMedia(electronicsMedia);
      const clothingCategory = await fetchFromMedia(clothingMedia);
      const sportsCategory = await fetchFromMedia(sportsMedia);
      const gamingCategory = await fetchFromMedia(gamingMedia);
      const othersCategory = await fetchFromMedia(othersMedia);

      setMediaArray(allMediaCategory);
      setHome(homeCategory);
      setElectornics(electronicsCategory);
      setClothing(clothingCategory);
      setSports(sportsCategory);
      setGaming(gamingCategory);
      setOthers(othersCategory);

      //console.log('Length', mediaArray.length);
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
    home,
    electronics,
    clothing,
    sports,
    gaming,
    others,
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

  const getFavourtiesList = async (token) => {
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
    getFavourtiesList,
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
