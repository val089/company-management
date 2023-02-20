import { StyleSheet, View, Image } from 'react-native';
import avatarImg from '@app/assets/images/avatar.png';

type AvatarProps = {
  imageUri?: string;
};

export const Avatar = ({ imageUri }: AvatarProps) => {
  return (
    <>
      {imageUri ? (
        <View style={styles.imgContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      ) : (
        <Image source={avatarImg} style={styles.image} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    overflow: 'hidden',
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 84,
  },
});
