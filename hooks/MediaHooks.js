import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/url';
import {fetchData, fetchFromMedia} from './CommonFunction';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);
  const [loading, setLoading] = useState(false);

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
      await fetchFromMedia(allMedia, setMediaArray);
      await fetchFromMedia(homeMedia, setHome);
      await fetchFromMedia(electronicsMedia, setElectornics);
      await fetchFromMedia(clothingMedia, setClothing);
      await fetchFromMedia(sportsMedia, setSports);
      await fetchFromMedia(gamingMedia, setGaming);
      await fetchFromMedia(othersMedia, setOthers);

      // Storing items by category
      // const allMediaCategory = await fetchFromMedia(allMedia, setMediaArray);
      // const homeCategory = await fetchFromMedia(homeMedia, setHome);
      // const electronicsCategory = await fetchFromMedia(
      //   electronicsMedia,
      //   setElectornics
      // );
      // const clothingCategory = await fetchFromMedia(clothingMedia, setClothing);
      // const sportsCategory = await fetchFromMedia(sportsMedia, setSports);
      // const gamingCategory = await fetchFromMedia(gamingMedia, setGaming);
      // const othersCategory = await fetchFromMedia(othersMedia, setOthers);

      // // Storing all the media category in single array
      // setMediaArray([
      //   ...homeCategory,
      //   ...electronicsCategory,
      //   ...clothingCategory,
      //   ...sportsCategory,
      //   ...gamingCategory,
      //   ...othersCategory,
      // ]);
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

// Messages (comment)
const useMessage = () => {
  const getMessagesByFileId = async (fileId) => {
    return await fetchData(`${baseUrl}comments/file/${fileId}`);
  };

  const postMessage = async (message, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(message),
    };

    return await fetchData(`${baseUrl}comments`, options);
  };
  const deleteMessage = async (msgId) => {
    const options = {
      method: 'DELETE',
      // headers: {'x-access-token': token},
    };
    return await fetchData(`${baseUrl}/comments/${msgId}`, options);
  };

  return {deleteMessage, getMessagesByFileId, postMessage};
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
  return {postFavourite, deleteFavourite, getFavourtiesByFileId};
};

export {
  getFilesByTag,
  postMedia,
  putMedia,
  deleteMedia,
  postTag,
  useMedia,
  useMessage,
  useFavourite,
};
