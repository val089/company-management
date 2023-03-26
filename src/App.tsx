import { useContext, useState, useEffect } from 'react';
import { store } from '@app/store/store';
import { Provider } from 'react-redux';
import { StatusBar, Text, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContextProvider, AuthContext } from '@app/context/auth-context';
import auth from '@react-native-firebase/auth';

import { LoginScreen } from '@app/screens/LoginScreen/LoginScreen';
import { SignUpScreen } from '@app/screens/SignUpScreen/SignUpScreen';
import { AddEmployeeScreen } from '@app/screens/AddEmployeeScreen/AddEmployeeScreen';
import { EmployeeDetailsScreen } from './screens/EmployeeDetailsScreen';
import { TakingPhotoAndUploadingScreen } from './screens/TakingPhotoAndUploadingScreen';
import { AddExpenseScreen } from './screens/AddExpenseScreen/AddExpenseScreen';
import { TabNavigation } from '@app/navigation/TabNavigation';
import { BasicHeader } from './components/BasicHeader';
import { GlobalStyles } from './constants/styles';

const colorScheme = Appearance.getColorScheme();

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  EmployeesList: undefined;
  TabNavigation: undefined;
  AddEmployee: undefined;
  EmployeeDetails: { employeeId: string };
  TakingPhotoAndUploading: undefined;
  Expenses: undefined;
  AddExpense: undefined;
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
      <Stack.Screen
        name="AddEmployee"
        component={AddEmployeeScreen}
        options={{
          header: () => <BasicHeader title="Add employee" />,
        }}
      />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
      <Stack.Screen name="TakingPhotoAndUploading" component={TakingPhotoAndUploadingScreen} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          header: () => <BasicHeader title="Add Expense" />,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!user && <AuthStack />}
        {user && <AuthenticatedStack />}
      </NavigationContainer>
    </Provider>
  );
};

const Root = () => {
  const [initializing, setInitializing] = useState(true);
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        authenticate(user);
      }
      if (initializing) {
        setInitializing(false);
      }
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
      <StatusBar
        backgroundColor={
          colorScheme === 'dark' ? GlobalStyles.colors.primary100 : GlobalStyles.colors.white
        }
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Root />
    </AuthContextProvider>
  );
};

export default App;
