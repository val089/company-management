import React from 'react';
import { StyleProp, TextStyle, Text, TextProps } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export type TypographyType = 'logoText' | 'button' | 'tabMenu';

interface TypographyProps extends TextProps {
  type: TypographyType;
  style?: StyleProp<TextStyle>;
}

export const Typography = ({ type, style = null, children, ...restProps }: TypographyProps) => {
  const typographyTypes = {
    logoText: {
      fontSize: 40,
      fontFamily: GlobalStyles.fonts.poppinsBold,
      color: GlobalStyles.colors.white,
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
  };
  return (
    <Text style={[typographyTypes[type], style]} {...restProps}>
      {children}
    </Text>
  );
};
