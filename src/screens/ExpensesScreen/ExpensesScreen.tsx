import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { GlobalStyles, bgColor } from '@app/constants/styles';
import { useFetchExpensesQuery } from '@app/store/slices/api';
import { LoadingOverlay, Typography } from '@app/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Expense, ExpenseType } from '@app/types';

const renderItem: ListRenderItem<Expense> = ({ item }) => {
  const { amount, type } = item;
  return (
    <View style={styles.listItem}>
      <Typography type="small">Description</Typography>
      <Typography
        type="normal"
        style={type === ExpenseType.EXPENSE ? styles.expense : styles.income}>
        {`${type === ExpenseType.EXPENSE ? '-' : ''}${amount}`} zł
      </Typography>
    </View>
  );
};

export const ExpensesScreen = () => {
  const { data: expenses, isFetching } = useFetchExpensesQuery({});

  if (isFetching) {
    return <LoadingOverlay message="Fetching data..." />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id}
        data={expenses}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 16,
  },
  list: {
    flex: 1,
    backgroundColor: bgColor,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: GlobalStyles.colors.white,
    elevation: 4,
    marginBottom: 10,
    height: 50,
  },
  expense: {
    color: GlobalStyles.colors.error100,
  },
  income: {
    color: GlobalStyles.colors.green100,
  },
});
