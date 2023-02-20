import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { GlobalStyles } from '../../constants/styles';

interface Props {
  size?: string | number;
  fill?: string;
}

export const AddIcon = ({
  size = 50,
  fill = GlobalStyles.colors.blue100,
  ...restProps
}: SvgProps & Props) => (
  <Svg fill={fill} width={size} height={size} viewBox="0 0 32 32" {...restProps}>
    <Path d="M15.5 29.5c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM21.938 15.938c0-0.552-0.448-1-1-1h-4v-4c0-0.552-0.447-1-1-1h-1c-0.553 0-1 0.448-1 1v4h-4c-0.553 0-1 0.448-1 1v1c0 0.553 0.447 1 1 1h4v4c0 0.553 0.447 1 1 1h1c0.553 0 1-0.447 1-1v-4h4c0.552 0 1-0.447 1-1v-1z" />
  </Svg>
);
