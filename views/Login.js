import React, {useContext} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// Linear gradient
import {LinearGradient} from 'expo-linear-gradient';

// Ui Kitten
import {Card, ButtonGroup, Button} from '@ui-kitten/components';

// Import from files
import colors from '../utils/colors';
import {MainContext} from '../contexts/MainContext';
import LoginForm from '../components/formComponents/LoginForm';
import SignupForm from '../components/formComponents/SignupForm';

const Login = () => {
  const {formToggle, setFormToggle} = useContext(MainContext);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={styles.container}
        >
          <Image
            style={styles.backgroundImg}
            source={require('../assets/backgrounds/loginbackground.png')}
          />

          <LinearGradient
            colors={['transparent', colors.btnBackground]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}
          >
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
                <LoginForm setFormToggle={setFormToggle} />
              ) : (
                <ScrollView>
                  <SignupForm setFormToggle={setFormToggle} />
                </ScrollView>
              )}
            </Card>
          </LinearGradient>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    position: 'absolute',
    width: '100%',
    height: '41%',
    top: -35,
  },
  card: {
    backgroundColor: colors.primary,
  },

  cardContainer: {
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    margin: 3,
  },
  container: {
    backgroundColor: colors.background,
  },

  header: {
    textAlign: 'center',
    marginBottom: 10,
    color: colors.text_dark,
  },
  linearGradient: {
    height: '85%',
    top: '25%',
    width: '98%',
    borderRadius: 75,
    alignSelf: 'center',
    overflow: 'scroll',
  },

  toggleGroup: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: '10%',
    zIndex: 1,

    borderRadius: 20,
  },

  toggle1: {
    width: 120,
    height: 50,
    backgroundColor: '#60715B',
    borderColor: '#60715B',
  },
  toggle2: {
    width: 120,
    height: 50,
    backgroundColor: colors.btnBackground,
    borderColor: colors.btnBackground,
  },
});

export default Login;
