import {baseUrl} from '../../variables/url';
// Common function to fetch data from server
const fetcData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log('Response', response);
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message} : ${json.error}`
        : json.message;

      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fucntion for user registration
export const signUp = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return await fetcData(`${baseUrl}users`, options);
};
