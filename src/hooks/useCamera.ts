import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const useCamera = () => {
  const [imageUri, setImageUri] = useState('');

  const choosePhoto = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        presentationStyle: 'fullScreen',
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
      });

      if (response.assets) {
        const source = `data:image/jpeg;base64,${response.assets[0].base64 ?? ''}`;
        setImageUri(source);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async () => {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        presentationStyle: 'fullScreen',
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
      });

      if (response.assets) {
        const source = `data:image/jpeg;base64,${response.assets[0].base64 ?? ''}`;
        setImageUri(source);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    openCamera,
    choosePhoto,
    imageUri,
  };
};
