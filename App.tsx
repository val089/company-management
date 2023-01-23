import { useContext, useState, useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContextProvider, AuthContext } from './src/context/auth-context';
import auth from '@react-native-firebase/auth';

import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';

import { TabNavigation } from './src/navigation/TabNavigation';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  EmployeesList: undefined;
  TabNavigation: undefined;
};

export type RootStackNavigation<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!user && <AuthStack />}
      {user && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [initializing, setInitializing] = useState(true);
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      authenticate(user!);
      if (initializing) setInitializing(false);
    });
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return <Text>Loading...</Text>;
  }

  return <Navigation />;
};

const App = () => {
  return (
    <AuthContextProvider>
      <StatusBar />
      <Root />
    </AuthContextProvider>
  );
};

export default App;
