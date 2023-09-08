import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackNavigation } from '@app/App';
import {
  AddImageModal,
  Avatar,
  CustomButton,
  Input,
  TextFieldButton,
  Typography,
} from '@app/components';
import { bgColor, GlobalStyles } from '@app/constants/styles';
import { AuthContext } from '@app/context/auth-context';
import { useCamera } from '@app/hooks/useCamera';
import { useModal } from '@app/hooks/useModal';
import { useAddEmployeeMutation } from '@app/store/slices/api';
import { yupResolver } from '@hookform/resolvers/yup';

import { AddEmployeeFormValuesType, validationSchema } from './validationSchema';

const initialValues = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  salary: '',
  email: '',
  employmentDate: new Date(),
};

export const AddEmployeeScreen = ({ navigation }: RootStackNavigation<'AddEmployee'>) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { isModalOpen, showModal, hideModal } = useModal();
  const { choosePhoto, openCamera, imageUri } = useCamera();

  const { user } = useContext(AuthContext);
  const [addEmployee] = useAddEmployeeMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = useForm<AddEmployeeFormValuesType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const insets = useSafeAreaInsets();
  const safeArea = { paddingTop: insets.top + 70, paddingBottom: insets.bottom };

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
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={safeArea}>
        <View style={styles.screen}>
          <Pressable style={styles.imgContainer} onPress={showModal}>
            <Avatar imageUri={imageUri} />
          </Pressable>

          <Input label="First name" name="firstName" control={control} />
          <Input label="Last name" name="lastName" control={control} style={styles.input} />
          <Input label="Job position" name="jobPosition" control={control} style={styles.input} />
          <Input label="E-mail" name="email" control={control} style={styles.input} />
          <Input label="Salary" name="salary" control={control} style={styles.input} />

          <TextFieldButton
            onPress={() => setIsDatePickerOpen(true)}
            label="Employment date:"
            style={styles.input}>
            <Typography type="normal">
              {getValues().employmentDate.toLocaleDateString('pl-PL')}
            </Typography>
          </TextFieldButton>

          <DatePicker
            mode="date"
            modal
            open={isDatePickerOpen}
            date={getValues().employmentDate}
            onConfirm={(date: Date) => {
              setIsDatePickerOpen(false);
              setValue('employmentDate', date);
            }}
            onCancel={() => {
              setIsDatePickerOpen(false);
            }}
          />

          <AddImageModal
            isModalOpen={isModalOpen}
            hideModal={hideModal}
            choosePhoto={onChoosePhoto}
            openCamera={openCamera}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <CustomButton onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <Typography type="button">ADD</Typography>
        </CustomButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
    backgroundColor: bgColor,
    marginBottom: 100,
    paddingBottom: 80,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 16,
  },
  input: {
    marginTop: 16,
  },
  buttonsContainer: {
    paddingVertical: 20,
    backgroundColor: bgColor,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    borderTopColor: GlobalStyles.colors.grey700,
    borderTopWidth: 1,
  },
});
