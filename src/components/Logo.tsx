import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Typography } from './Typography';

interface LogoProps {
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
}

export const Logo = ({ style, fontSize = 40 }: LogoProps) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <Typography type="logoText" style={[styles.text, { fontSize }]}>
        Company
      </Typography>
      <Typography type="logoText" style={[styles.text, { fontSize }]}>
        Management
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {},
  text: {
    lineHeight: 45,
  },
});
