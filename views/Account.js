import React, {useContext} from 'react';
import {Layout, Button} from '@ui-kitten/components';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  const logout = () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Layout>
      <Button onPress={logout}>Logout</Button>
    </Layout>
  );
};

export default Account;
