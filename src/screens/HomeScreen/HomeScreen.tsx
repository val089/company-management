import { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Chart, LoadingOverlay, MoneySummary } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { AuthContext } from '@app/context/auth-context';
import { useFetchEmployeesQuery, useFetchExpensesQuery } from '@app/store/slices/api';

import { RecentlyHiredEmployeesList } from './RecentlyHiredEmployeesList';

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { data: employees, isFetching: fetchingEmployees } = useFetchEmployeesQuery({});
  const { data: expenses, isFetching: fetchingExpenses } = useFetchExpensesQuery({});

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
