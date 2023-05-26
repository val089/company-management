import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: string | number;
  fill?: string;
}

export const ChevronUpIcon = ({ size = 24, fill = 'black', ...restProps }: Props) => (
  <Svg fill={fill} width={size} height={size} viewBox="0 0 24 24" {...restProps}>
    <Path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
  </Svg>
);
