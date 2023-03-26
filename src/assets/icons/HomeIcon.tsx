import React from 'react';
import Svg, { SvgProps, G, Polygon } from 'react-native-svg';

interface Props {
  size?: string | number;
}

export const HomeIcon = ({ size = 30, ...restProps }: SvgProps & Props) => (
  <Svg height={size} width={size} viewBox="0 0 512 512" {...restProps}>
    <G>
      <Polygon
        points="434.162,293.382 434.162,493.862 308.321,493.862 308.321,368.583 203.682,368.583 203.682,493.862
		77.841,493.862 77.841,293.382 256.002,153.862"
      />
      <Polygon points="0,242.682 256,38.93 512,242.682 482.21,285.764 256,105.722 29.79,285.764" />
      <Polygon points="439.853,18.138 439.853,148.538 376.573,98.138 376.573,18.138" />
    </G>
  </Svg>
);
