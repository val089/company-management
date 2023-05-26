import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: string | number;
  fill?: string;
}

export const ChevronDownIcon = ({ size = 24, fill = 'black', ...restProps }: Props) => (
  <Svg fill={fill} width={size} height={size} viewBox="0 0 24 24" {...restProps}>
    <Path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </Svg>
);
