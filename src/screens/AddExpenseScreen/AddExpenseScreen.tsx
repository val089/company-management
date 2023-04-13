import { useContext } from 'react';
import { View, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '@app/context/auth-context';
import { AddExpenseForm } from './AddExpenseForm';
import { AddExpenseFormValuesType } from './validationSchema';
import { useAddExpenseMutation } from '@app/store/slices/api';
import { LoadingOverlay } from '@app/components';
import { ExpenseType } from '@app/types';
import { bgColor } from '@app/constants/styles';

export const AddExpenseScreen = () => {
  const { user } = useContext(AuthContext);
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const onSubmit = async (formData: AddExpenseFormValuesType) => {
    try {
      if (user?.uid) {
        const formattedData = {
          // category: formData.category,
          type: formData.type as ExpenseType,
          amount: Number(formData.amount),
          userId: user.uid,
          createdAt: new Date().toISOString(),
        };
        await addExpense(formattedData);
      }
    } catch (err) {
      Alert.alert(
        'Something went wrong',
        'Could not add expense, please check your inputs and try again.',
      );
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Adding new expense" />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={[styles.screen, styles.innerScreen]}>
        <View>
          <AddExpenseForm onSubmit={onSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  innerScreen: {
    paddingHorizontal: 16,
    backgroundColor: bgColor,
  },
});
