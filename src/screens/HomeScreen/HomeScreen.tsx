import { useContext, useEffect } from 'react';
import { Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import { AuthContext } from '@app/context/auth-context';
import { RecentlyHiredEmployeesList } from './RecentlyHiredEmployeesList';
import { apiSlice, useFetchEmployeesQuery } from '@app/store/slices/api';
import { useDispatch } from 'react-redux';
import { setEmployees } from '@app/store/slices/employees';
import { LoadingOverlay } from '@app/components/LoadingOverlay';

export const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: employees, isLoading } = useFetchEmployeesQuery({});

  const logoutHandler = () => {
    dispatch(apiSlice.util.resetApiState());
    logout();
  };

  useEffect(() => {
    if (employees) {
      dispatch(setEmployees(employees));
    }
  }, [employees, dispatch]);

  if (!user) return null;

  if (isLoading) {
    <LoadingOverlay message="Fetching data..." />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text>Welcome {user.email}</Text>
      <Button title="Logout" onPress={logoutHandler} />
      {employees && <RecentlyHiredEmployeesList employees={employees} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
