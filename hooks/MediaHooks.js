import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/url';
import {fetchData} from './CommonFunction';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  const fetchMedia = async (myPostsOnly) => {
    try {
      let json = await getFilesByTag(appId);
      // if (myFilesOnly) {
      //   json = json.filter((item) => item.user_id === user.user_id);
      // }

      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          // console.log(mediaData);
          return mediaData;
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.log('Error', error);
    }
  };

  // Call loadMedia() only once when the component is loaded
  // Or when the update state is changed in MainContext
  useEffect(() => {
    fetchMedia();
  }, [update]);
  return {mediaArray};
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

export {getFilesByTag, postMedia, postTag, useMedia, useFavourite};