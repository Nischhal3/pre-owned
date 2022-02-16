import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {Card, Layout, ButtonGroup, Button, Text} from '@ui-kitten/components';
import colors from '../utils/colors';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import {MainContext} from '../contexts/MainContext';

const Login = () => {
  // const [formToggle, setFormToggle] = useState(true);
  const {formToggle, setFormToggle} = useContext(MainContext);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <Layout style={styles.layout}>
          <Image
            style={styles.backgroundImg}
            source={require('../assets/backgrounds/LoginBG.png')}
          />
          <Card style={styles.cardContainer}>
            <ButtonGroup
              style={styles.toggleGroup}
              selectedIndex={formToggle ? 0 : 1}
            >
              <Button
                style={formToggle ? styles.toggle2 : styles.toggle1}
                onPress={() => setFormToggle(true)}
              >
                Log In
              </Button>
              <Button
                style={formToggle ? styles.toggle1 : styles.toggle2}
                onPress={() => setFormToggle(false)}
              >
                Sign Up
              </Button>
            </ButtonGroup>
            {formToggle ? (
              <Card style={styles.card}>
                <LoginForm setFormToggle={setFormToggle} />
              </Card>
            ) : (
              <Card style={styles.card}>
                <ScrollView>
                  <SignupForm setFormToggle={setFormToggle} />
                </ScrollView>
              </Card>
            )}
          </Card>
        </Layout>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.container,
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
  },
  cardContainer: {
    top: '40%',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  card: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleGroup: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  toggle1: {
    width: 100,
    backgroundColor: '#60715B',
    borderColor: '#60715B',
  },
  toggle2: {
    width: 100,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
    color: colors.text_dark,
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
    color: colors.text_dark,
  },
});

export default Login;
