import { Image, StyleSheet, View } from 'react-native';
import avatarImg from '@app/assets/images/avatar.png';

type AvatarProps = {
  imageUri?: string;
  size?: number;
};

export const Avatar = ({ imageUri, size = 80 }: AvatarProps) => {
  const imageStyle = {
    width: size,
    height: size * 1.05,
  };

  return (
    <>
      {imageUri ? (
        <View style={styles.imgContainer}>
          <Image source={{ uri: imageUri }} style={imageStyle} />
        </View>
      ) : (
        <Image source={avatarImg} style={imageStyle} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    overflow: 'hidden',
    borderRadius: 50,
  },
});
