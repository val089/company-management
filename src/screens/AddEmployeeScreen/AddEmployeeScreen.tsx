import { useContext } from 'react';
import { View, StyleSheet, Alert, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '@app/context/auth-context';
import { AddEmployeeForm } from './AddEmployeeForm';
import { AddEmployeeFormValuesType } from './validationSchema';
import { RootStackNavigation } from '@app/App';
import { useAddEmployeeMutation } from '@app/store/slices/api';
import { AddImageModal, Avatar } from '@app/components';
import { useModal } from '@app/hooks/useModal';
import { useCamera } from '@app/hooks/useCamera';
import { bgColor } from '@app/constants/styles';

export const AddEmployeeScreen = ({ navigation }: RootStackNavigation<'AddEmployee'>) => {
  const { isModalOpen, showModal, hideModal } = useModal();
  const { choosePhoto, openCamera, imageUri } = useCamera();

  const { user } = useContext(AuthContext);
  const [addEmployee] = useAddEmployeeMutation();

  const onSubmit = async (formData: AddEmployeeFormValuesType) => {
    try {
      if (user?.uid) {
        const formattedData = {
          ...formData,
          userId: user.uid,
          // createdAt: new Date(), // błąd z non-serializable values
          createdAt: new Date().toISOString(),
          employmentDate: formData.employmentDate.toISOString(),
          imageUri,
        };
        await addEmployee(formattedData);
        navigation.goBack();
      }
    } catch (err) {
      Alert.alert(
        'Something went wrong',
        'Could not add employee, please check your inputs and try again.',
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Pressable style={styles.imgContainer} onPress={showModal}>
            <Avatar imageUri={imageUri} />
          </Pressable>
          <AddEmployeeForm onSubmit={onSubmit} />
          <AddImageModal
            isModalOpen={isModalOpen}
            hideModal={hideModal}
            choosePhoto={choosePhoto}
            openCamera={openCamera}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: bgColor,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
