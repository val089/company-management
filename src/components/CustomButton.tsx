import { Pressable, StyleProp, StyleSheet, ViewStyle, PressableProps, View } from 'react-native';
import { GlobalStyles } from '@app/constants/styles';

interface CustomButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CustomButton = ({
  children,
  onPress,
  style,
  disabled,
  ...restProps
}: CustomButtonProps) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: disabled ? GlobalStyles.colors.grey700 : GlobalStyles.colors.blue100 },
        ]}
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.blue100 }}
        {...restProps}>
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 50,
  },
  button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
});
