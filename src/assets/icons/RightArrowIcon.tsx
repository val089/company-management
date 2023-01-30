import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props {
  size?: string | number;
  fill?: string;
}

export const RightArrowIcon = ({ size = '12', fill = '#fff', ...restProps }: SvgProps & Props) => {
  return (
    <Svg data-name="strzałka powrotu" width={size} height={size} viewBox="0 0 12 12" {...restProps}>
      <Path
        data-name="Path 493"
        d="M.646 35.7a.769.769 0 0 1 .133-.01h7.586l-.165-.079a1.538 1.538 0 0 1-.435-.308l-2.127-2.127a.8.8 0 0 1-.112-1.019.769.769 0 0 1 1.154-.1l3.847 3.843a.769.769 0 0 1 0 1.088L6.68 40.839a.769.769 0 0 1-1.154-.077.8.8 0 0 1 .112-1.019l2.123-2.131a1.539 1.539 0 0 1 .385-.281l.231-.1H.821a.8.8 0 0 1-.811-.651.769.769 0 0 1 .636-.88z"
        transform="translate(.774 -30.366)"
        fill={fill}
      />
      <Path data-name="Rectangle 2980" fill="none" d="M0 0h12v12H0z" />
    </Svg>
  );
};
