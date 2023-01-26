import { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AddEmployeeForm } from './AddEmployeeForm';
import { GlobalStyles } from '@app/constants/styles';
import { AuthContext } from '@app/context/auth-context';
import { AddEmployeeFormValuesType } from './validationSchema';
import { RootStackNavigation } from '@app/App';
import firestore from '@react-native-firebase/firestore';

export const AddEmployeeScreen = ({ navigation }: RootStackNavigation<'AddEmployee'>) => {
  const { user } = useContext(AuthContext);

  const onSubmit = async (data: AddEmployeeFormValuesType) => {
    const ref = firestore().collection('employees');
    try {
      await ref.add({
        ...data,
        userId: user?.uid,
      });

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
