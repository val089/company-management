import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ModalPopup } from '@app/components/ModalPopup';

import { CustomButton } from './CustomButton';
import { Typography } from './Typography';

type ConfirmDeletionModalProps = {
  isModalOpen: boolean;
  hideModal: () => void;
  choosePhoto: () => void;
  openCamera: () => void;
};

export const AddImageModal = ({
  isModalOpen,
  hideModal,
  choosePhoto,
  openCamera,
}: ConfirmDeletionModalProps) => {
  return (
    <ModalPopup
      visible={isModalOpen}
      onCancel={hideModal}
      header={<Typography type="normal">Add a photo</Typography>}
      footer={null}>
      <View style={styles.content}>
        <CustomButton onPress={choosePhoto}>
          <Typography type="button">Open Gallery</Typography>
        </CustomButton>

        <CustomButton onPress={openCamera} style={styles.openCameraBtn}>
          <Typography type="button">Open Camera</Typography>
        </CustomButton>
      </View>
    </ModalPopup>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
  content: {
    marginVertical: 40,
  },
  openCameraBtn: {
    marginTop: 20,
  },
});
