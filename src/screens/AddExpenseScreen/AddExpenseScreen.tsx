import { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { selectCategory } from '@app/store/slices/expenseCategory';
import { Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { AuthContext } from '@app/context/auth-context';
import { AmountAndType } from './AmountAndType';
import { AddExpenseFormValuesType, validationSchema } from './validationSchema';
import { useAddExpenseMutation } from '@app/store/slices/api';
import { LoadingOverlay, CustomButton, Typography, TextFieldButton } from '@app/components';
import { ExpenseType } from '@app/types';
import { bgColor } from '@app/constants/styles';
import { RootStackNavigation } from '@app/App';

const initialValues = {
  amount: '0',
  type: 'income',
  category: 'category01',
};

export const AddExpenseScreen = ({ navigation }: RootStackNavigation<'AddExpense'>) => {
  const category = useAppSelector(selectCategory);
  const { user } = useContext(AuthContext);
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const methods = useForm<AddExpenseFormValuesType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData: AddExpenseFormValuesType) => {
    try {
      if (user?.uid) {
        const formattedData = {
          category: formData.category,
          type: formData.type as ExpenseType,
          amount: Number(formData.amount),
          userId: user.uid,
          createdAt: new Date().getTime(),
        };
        await addExpense(formattedData);
        navigation.goBack();
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
    <FormProvider {...methods}>
      <SafeAreaView style={styles.screen}>
        <ScrollView style={[styles.screen, styles.innerScreen]}>
          <AmountAndType />

          <TextFieldButton
            onPress={() => navigation.navigate('ExpensesCategories')}
            label="Category"
            style={styles.category}>
            <Typography type="normal">{category}</Typography>
          </TextFieldButton>

          <CustomButton
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            disabled={isSubmitting}>
            <Typography type="button">ADD</Typography>
          </CustomButton>
        </ScrollView>
      </SafeAreaView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  innerScreen: {
    paddingHorizontal: 16,
    backgroundColor: bgColor,
    position: 'relative',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
  },
  category: {
    marginTop: 20,
  },
});
