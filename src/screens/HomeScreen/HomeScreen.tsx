import { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthContext } from '@app/context/auth-context';
import { RecentlyHiredEmployeesList } from './RecentlyHiredEmployeesList';
import { useFetchEmployeesQuery } from '@app/store/slices/api';
import { useDispatch } from 'react-redux';
import { setEmployees } from '@app/store/slices/employees';
import { Chart, LoadingOverlay } from '@app/components';
import { bgColor } from '@app/constants/styles';

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: employees, isLoading } = useFetchEmployeesQuery({});

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
      <Chart />
      {employees && <RecentlyHiredEmployeesList employees={employees} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: bgColor,
  },
});
