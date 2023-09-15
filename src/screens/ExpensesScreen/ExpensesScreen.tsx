import { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@app/components';
import { bgColor, GlobalStyles } from '@app/constants/styles';
import { useFetchExpensesQuery } from '@app/store/slices/api';
import { Expense, ExpenseType } from '@app/types';

export const ExpensesScreen = () => {
  const { data: expenses } = useFetchExpensesQuery({});

  const insets = useSafeAreaInsets();
  const safeArea = { paddingTop: insets.top + 70, paddingBottom: insets.bottom + 80 };

  const renderItem: ListRenderItem<Expense> = useCallback(({ item }) => {
    const { amount, type, category } = item;
    return (
      <View style={styles.listItem}>
        <Typography type="small">{category}</Typography>
        <Typography
          type="normal"
          style={type === ExpenseType.EXPENSE ? styles.expense : styles.income}>
          {`${type === ExpenseType.EXPENSE ? '-' : ''}${amount}`} zł
        </Typography>
      </View>
    );
  }, []);

  return (
    <View style={[styles.screen, safeArea]}>
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id}
        data={expenses}
        renderItem={renderItem}
        ListEmptyComponent={
          <Typography type="normal" style={styles.info}>
            No expenses to display
          </Typography>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    paddingTop: 16,
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
    shadowColor: GlobalStyles.colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  expense: {
    color: GlobalStyles.colors.error100,
  },
  income: {
    color: GlobalStyles.colors.green100,
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});
