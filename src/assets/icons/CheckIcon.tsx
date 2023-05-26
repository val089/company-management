import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface Props {
  size?: string | number;
  fill?: string;
}

export const CheckIcon = ({ size = '14', fill = '#000', ...restProps }: SvgProps & Props) => {
  const width = `${size}`;
  const height = `${+size * 0.74428}`;

  return (
    <Svg width={width} height={height} viewBox="0 0 14 10.42" {...restProps}>
      <Path
        id="do_checkbox"
        data-name="do checkbox"
        d="M5,10.42l-5-5L1.41,4.01,5,7.59,12.59,0,14,1.42Z"
        fill={fill}
      />
    </Svg>
  );
};
