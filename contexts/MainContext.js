import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [formToggle, setFormToggle] = useState(true);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(0);
  const [media, setMedia] = useState([]);
  const [updateFavourite, setUpdateFavourite] = useState(0);
  const [updateAvatar, setUpdateAvatar] = useState(0);

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        formToggle,
        setFormToggle,
        update,
        setUpdate,
        loading,
        setLoading,
        updateMessage,
        setUpdateMessage,
        media,
        setMedia,
        updateFavourite,
        setUpdateFavourite,
        updateAvatar,
        setUpdateAvatar,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
