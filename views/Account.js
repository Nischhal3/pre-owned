import React, {useContext} from 'react';
import {Layout, Button, Text} from '@ui-kitten/components';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const Account = ({navigation}) => {
  const {user, setIsLoggedIn} = useContext(MainContext);

  console.log(user);
  const logout = () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Layout>
      <Text>
        {user.username}: {user.email}
      </Text>
      <Button onPress={logout}>Logout</Button>
      <Button
        onPress={() => {
          navigation.navigate('UpdateUser');
        }}
      >
        Update user
      </Button>
    </Layout>
  );
};

Account.propTypes = {
  navigation: PropTypes.object,
};

export default Account;
