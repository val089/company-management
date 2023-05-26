import { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AuthContext } from '@app/context/auth-context';
import { RecentlyHiredEmployeesList } from './RecentlyHiredEmployeesList';
import { useFetchEmployeesQuery, useFetchExpensesQuery } from '@app/store/slices/api';
import { useDispatch } from 'react-redux';
import { setEmployees } from '@app/store/slices/employees';
import { Chart, LanguageDropdown, LoadingOverlay, MoneySummary } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { setExpenses } from '@app/store/slices/expenses';

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: employees, isFetching: fetchingEmployees } = useFetchEmployeesQuery({});
  const { data: expenses, isFetching: fetchingExpenses } = useFetchExpensesQuery({});

  useEffect(() => {
    if (employees) {
      dispatch(setEmployees(employees));
    }

    if (expenses) {
      dispatch(setExpenses(expenses));
    }
  }, [employees, expenses, dispatch]);

  if (!user) return null;

  if (fetchingEmployees || fetchingExpenses) {
    <LoadingOverlay message="Fetching data..." />;
  }

  const money = expenses?.reduce(
    (prev, curr) => ({
      amount: prev.amount + (curr.type === 'expense' ? -curr.amount : curr.amount),
    }),
    {
      amount: 0,
    },
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.moneySummaryContainer}>
        <MoneySummary money={money?.amount} style={styles.moneySummary} />
      </View>
      {expenses && <Chart expenses={expenses} />}
      {employees && <RecentlyHiredEmployeesList employees={employees} />}
      <LanguageDropdown />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: bgColor,
  },
  moneySummaryContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  moneySummary: {
    width: '50%',
  },
});
