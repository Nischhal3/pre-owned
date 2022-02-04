import React, {useContext} from 'react';
import {Layout, Button} from '@ui-kitten/components';
import {MainContext} from '../contexts/MainContext';

const Account = () => {

  const {setIsLoggedIn} = useContext(MainContext);

  return (
    <Layout>
      <Button onPress={() => {setIsLoggedIn(false)}}>Logout</Button>
    </Layout>
  );
};

export default Account;
