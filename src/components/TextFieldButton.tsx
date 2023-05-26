import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { RightArrowIcon } from '@app/assets/icons/RightArrowIcon';
import { bgColor, fontColor, GlobalStyles } from '@app/constants/styles';

interface TextFieldButtonProps {
  label: string;
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TextFieldButton = ({
  children,
  onPress,
  style,
  label,
  ...restProps
}: TextFieldButtonProps) => {
  return (
    <View style={[styles.rootContainer, style]} {...restProps}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Pressable style={styles.container} onPress={onPress}>
        {children}
        <View style={styles.icon}>
          <RightArrowIcon />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 24,
    borderColor: GlobalStyles.colors.grey700,
    borderWidth: 1,
  },
  container: {
    paddingLeft: 29,
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    backgroundColor: GlobalStyles.colors.blue100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    left: 15,
    top: -10,
    paddingHorizontal: 8,
    backgroundColor: bgColor,
  },
  label: {
    color: fontColor,
    fontSize: 12,
  },
});
