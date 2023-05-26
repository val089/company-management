import { useContext, useEffect, useState } from 'react';
import { Appearance, StatusBar, Text } from 'react-native';
import { Provider } from 'react-redux';
import { AuthContext, AuthContextProvider } from '@app/context/auth-context';
import { TabNavigation } from '@app/navigation/TabNavigation';
import { AddEmployeeScreen } from '@app/screens/AddEmployeeScreen/AddEmployeeScreen';
import { LoginScreen } from '@app/screens/LoginScreen/LoginScreen';
import { SignUpScreen } from '@app/screens/SignUpScreen/SignUpScreen';
import { store } from '@app/store/store';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { BasicHeader } from './components/BasicHeader';
import { GlobalStyles } from './constants/styles';
import { AddExpenseScreen } from './screens/AddExpenseScreen/AddExpenseScreen';
import { EmployeeDetailsScreen } from './screens/EmployeeDetailsScreen';
import { ExpensesCategoriesScreen } from './screens/ExpensesCategoriesScreen';
import { TakingPhotoAndUploadingScreen } from './screens/TakingPhotoAndUploadingScreen';

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
  ExpensesCategories: undefined;
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
          header: () => <BasicHeader title="Sign Up" />,
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
      <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetailsScreen}
        options={{
          header: () => <BasicHeader title="Employee Details" />,
        }}
      />
      <Stack.Screen name="TakingPhotoAndUploading" component={TakingPhotoAndUploadingScreen} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          header: () => <BasicHeader title="Add Expense" />,
        }}
      />
      <Stack.Screen
        name="ExpensesCategories"
        component={ExpensesCategoriesScreen}
        options={{
          header: () => <BasicHeader title="Expenses Categories" />,
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
