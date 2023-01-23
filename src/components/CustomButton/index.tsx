import { Pressable, StyleProp, StyleSheet, ViewStyle, PressableProps, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface CustomButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export const CustomButton = ({ children, style, ...restProps }: CustomButtonProps) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={styles.button}
        {...restProps}
        android_ripple={{ color: GlobalStyles.colors.blue100 }}>
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
    backgroundColor: GlobalStyles.colors.secondary100,
  },
});