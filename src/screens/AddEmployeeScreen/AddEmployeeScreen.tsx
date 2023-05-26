import { useContext } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { RootStackNavigation } from '@app/App';
import { AddImageModal, Avatar } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { AuthContext } from '@app/context/auth-context';
import { useCamera } from '@app/hooks/useCamera';
import { useModal } from '@app/hooks/useModal';
import { useAddEmployeeMutation } from '@app/store/slices/api';

import { AddEmployeeForm } from './AddEmployeeForm';
import { AddEmployeeFormValuesType } from './validationSchema';

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
