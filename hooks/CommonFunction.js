import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Getting token from Storage
const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

// Time Converting
const getLocalTime = () => {
  const convertToLocalTime = (date) => {
    const year = date.slice(2, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const hour = date.slice(11, 13);
    const minute = date.slice(14, 16);

    return `${day}/${month}/${year} ${hour}:${minute}`;
  };
  return {convertToLocalTime};
};
export {getToken, getLocalTime, fetchData};
