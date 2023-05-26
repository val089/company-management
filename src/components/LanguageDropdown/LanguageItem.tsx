import { ReactNode } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckIcon } from '@app/assets/icons';

interface LanguageItemProps {
  active: boolean;
  onPress: () => void;
  children: ReactNode;
  flag: ImageSourcePropType;
}

export const LanguageItem = ({ flag, active, onPress, children }: LanguageItemProps) => {
  const activeIcon = active ? <CheckIcon /> : null;

  return (
    <TouchableOpacity style={[styles.button, styles.flex]} onPress={onPress} disabled={active}>
      <View style={styles.flex}>
        <Image source={flag} style={styles.flag} />
        <Text style={styles.text}>{children}</Text>
      </View>
      {activeIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  flag: {
    height: 20,
    width: 20,
  },
  text: {
    paddingLeft: 20,
  },
});
