import { View, StyleSheet, Alert } from 'react-native';
import { AddEmployeeForm } from './AddEmployeeForm';
import { GlobalStyles } from '@app/constants/styles';
import { AddEmployeeFormValuesType } from './validationSchema';
import { RootStackNavigation } from '@app/App';
import { useAddEmployeeMutation } from '@app/store/slices/employeesAPI';

export const AddEmployeeScreen = ({ navigation }: RootStackNavigation<'AddEmployee'>) => {
  const [addEmployee] = useAddEmployeeMutation();

  const onSubmit = async (data: AddEmployeeFormValuesType) => {
    try {
      await addEmployee(data);
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Something went wrong',
        'Could not add employee, please check your inputs and try again.',
      );
    }
  };

  return (
    <View style={styles.screen}>
      <AddEmployeeForm onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: GlobalStyles.colors.primary100,
    flex: 1,
    padding: 16,
  },
});
