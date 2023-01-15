import { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

import { LoginForm } from './LoginForm';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { signIn } from '../../utils/auth';

export const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const submitHandler = async (email: string, password: string): Promise<void> => {
    setIsAuthenticating(true);
    try {
      await signIn(email, password);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.',
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Log in..." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.innerScreen}>
        <LoginForm onSubmit={submitHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.primary100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerScreen: {
    width: '100%',
  },
});
