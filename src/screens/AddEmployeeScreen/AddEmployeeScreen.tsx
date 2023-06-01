import { useContext } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  const insets = useSafeAreaInsets();
  const safeArea = { paddingTop: insets.top + 70, paddingBottom: insets.bottom + 40 };

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

  const onChoosePhoto = async () => {
    await choosePhoto();
    hideModal();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.screen, safeArea]}>
      <Pressable style={styles.imgContainer} onPress={showModal}>
        <Avatar imageUri={imageUri} />
      </Pressable>
      <AddEmployeeForm onSubmit={onSubmit} />
      <AddImageModal
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        choosePhoto={onChoosePhoto}
        openCamera={openCamera}
      />
    </ScrollView>
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
    paddingTop: 16,
  },
});
