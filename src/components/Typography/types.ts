import { StyleProp, TextProps, TextStyle } from 'react-native';

type TypographyType =
  | 'logoText'
  | 'button'
  | 'tabMenu'
  | 'normal'
  | 'normalBold'
  | 'small'
  | 'large';

export interface TypographyProps extends TextProps {
  type: TypographyType;
  style?: StyleProp<TextStyle>;
}
