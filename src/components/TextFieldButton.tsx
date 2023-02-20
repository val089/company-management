import { GlobalStyles } from '@app/constants/styles';
import { StyleSheet, Pressable, View, ViewStyle, StyleProp, Text } from 'react-native';
import { RightArrowIcon } from '@app/assets/icons/RightArrowIcon';

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
    backgroundColor: GlobalStyles.colors.primary100,
  },
  label: {
    color: GlobalStyles.colors.grey700,
    fontSize: 12,
  },
});
