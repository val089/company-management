import React, { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface Props {
  size?: string | number;
  fill?: string;
}

export const CloseIcon: FC<SvgProps & Props> = ({
  size = '11.104',
  fill = '#000',
  ...restProps
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 11.104 11.104" {...restProps}>
      <Path
        data-name="Path 4362"
        d="m10.819 9.346-8.7-8.7a.971.971 0 0 0-1.374 0l-.46.454a.971.971 0 0 0 0 1.374l8.7 8.7a.971.971 0 0 0 1.374 0l.458-.458a.971.971 0 0 0 .002-1.37zm0 0"
        fill={fill}
        transform="translate(0 -.359)"
      />
      <Path
        data-name="Path 4363"
        d="m8.987.647-8.7 8.7a.971.971 0 0 0 0 1.374l.458.458a.971.971 0 0 0 1.374 0l8.7-8.7a.971.971 0 0 0 0-1.374l-.457-.457A.971.971 0 0 0 8.987.647zm0 0"
        transform="translate(0 -.362)"
        fill={fill}
      />
    </Svg>
  );
};
