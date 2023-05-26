import React from 'react';
import { StyleProp, TextStyle, Text, TextProps, Appearance } from 'react-native';
import { GlobalStyles, fontColor } from '@app/constants/styles';

const colorScheme = Appearance.getColorScheme();

export type TypographyType = 'logoText' | 'button' | 'tabMenu' | 'normal' | 'small' | 'large';

interface TypographyProps extends TextProps {
  type: TypographyType;
  style?: StyleProp<TextStyle>;
}

export const Typography = ({ type, style = null, children, ...restProps }: TypographyProps) => {
  const typographyTypes = {
    logoText: {
      fontSize: 40,
      fontFamily: GlobalStyles.fonts.poppinsBold,
      color: fontColor,
    },
    button: {
      fontSize: 18,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: GlobalStyles.colors.white,
    },
    tabMenu: {
      fontSize: 14,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: GlobalStyles.colors.white,
    },
    normal: {
      fontSize: 16,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: fontColor,
    },
    small: {
      fontSize: 13,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: colorScheme === 'dark' ? GlobalStyles.colors.white : GlobalStyles.colors.black,
    },
    large: {
      fontSize: 24,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
    },
  };
  return (
    <Text style={[typographyTypes[type], style]} {...restProps}>
      {children}
    </Text>
  );
};
