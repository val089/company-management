import { useContext } from 'react';
import { View, Alert } from 'react-native';
import { AuthContext } from '@app/context/auth-context';
import { AddExpenseForm } from './AddExpenseForm';
import { AddExpenseFormValuesType } from './validationSchema';
import { useAddExpenseMutation } from '@app/store/slices/api';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import { ExpenseType } from '@app/types';

export const AddExpenseScreen = () => {
  const { user } = useContext(AuthContext);
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const onSubmit = async (formData: AddExpenseFormValuesType) => {
    try {
      if (user?.uid) {
        const formattedData = {
          category: formData.category,
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
    return <LoadingOverlay message="New expense is added" />;
  }

  return (
    <View>
      <AddExpenseForm onSubmit={onSubmit} />
    </View>
  );
};
