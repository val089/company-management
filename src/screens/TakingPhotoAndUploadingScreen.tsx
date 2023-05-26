import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '@app/components';

export const TakingPhotoAndUploadingScreen = () => {
  const [imageUri, setImageUri] = useState('');

  const handleChoosePhoto = async () => {
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.innerScreen}>
        <CustomButton onPress={handleChoosePhoto}>
          <Text>Open Gallery</Text>
        </CustomButton>

        <CustomButton onPress={openCamera} style={{ marginTop: 20 }}>
          <Text>Open Camera</Text>
        </CustomButton>

        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  innerScreen: {
    width: '100%',
  },
  image: {
    marginTop: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    alignSelf: 'center',
  },
});
