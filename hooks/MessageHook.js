import {baseUrl} from '../utils/url';
import {fetchData} from './CommonFunction';

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

const getMessagesByFileId = async (fileId) => {
  return await fetchData(`${baseUrl}comments/file/${fileId}`);
};

const deleteMessage = async (msgId, token) => {
  console.log('MEssage', msgId, token);
  const options = {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  };
  return await fetchData(`${baseUrl}comments/${msgId}`, options);
};

export {postMessage, getMessagesByFileId, deleteMessage};
