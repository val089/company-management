import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const VisibleOffEye: React.FC<SvgProps> = ({
  width = '24',
  height = '24',
  viewBox = '0 0 48 48',
  ...restProps
}) => (
  <Svg height={height} width={width} viewBox={viewBox} {...restProps}>
    <Path
      fill="#C0C0C0"
      d="M31.6 26.4 27.8 22.65Q28.9 20.35 27.175 19.125Q25.45 17.9 24.05 18.9L20.6 15.4Q21.35 15.05 22.275 14.85Q23.2 14.65 24 14.65Q27.5 14.65 29.925 17.075Q32.35 19.5 32.35 23Q32.35 23.75 32.15 24.775Q31.95 25.8 31.6 26.4ZM38.85 33.8 36.25 31.1Q38.4 29.35 40.05 27.25Q41.7 25.15 42.7 23Q40.1 17.55 35.2 14.3Q30.3 11.05 24.5 11.05Q22.45 11.05 20.4 11.4Q18.35 11.75 17.45 12.25L14.2 9Q15.9 8.25 18.8 7.65Q21.7 7.05 24.25 7.05Q31 7.05 36.9 10.725Q42.8 14.4 46.05 21.05Q46.25 21.45 46.35 21.975Q46.45 22.5 46.45 23Q46.45 23.5 46.35 24.025Q46.25 24.55 46.05 24.95Q44.7 27.6 42.875 29.85Q41.05 32.1 38.85 33.8ZM38.95 43.65 32.65 37.4Q30.95 38.1 28.675 38.525Q26.4 38.95 24 38.95Q17.05 38.95 11.175 35.25Q5.3 31.55 1.95 24.9Q1.75 24.45 1.675 23.975Q1.6 23.5 1.6 23Q1.6 22.5 1.7 21.925Q1.8 21.35 2 20.95Q3.05 18.9 4.6 16.875Q6.15 14.85 8.15 12.9L3.3 8Q2.8 7.55 2.8 6.85Q2.8 6.15 3.3 5.65Q3.8 5.15 4.525 5.15Q5.25 5.15 5.75 5.7L41.4 41.3Q41.9 41.8 41.825 42.475Q41.75 43.15 41.4 43.6Q40.9 44.2 40.175 44.2Q39.45 44.2 38.95 43.65ZM11 15.65Q9.2 17.1 7.675 19.1Q6.15 21.1 5.35 23Q7.95 28.5 12.95 31.7Q17.95 34.9 24.4 34.9Q25.8 34.9 27.275 34.75Q28.75 34.6 29.5 34.2L26.25 30.95Q25.85 31.15 25.2 31.25Q24.55 31.35 24 31.35Q20.55 31.35 18.1 28.925Q15.65 26.5 15.65 23Q15.65 22.45 15.725 21.825Q15.8 21.2 15.95 20.75ZM26.9 22.15Q26.9 22.15 26.9 22.15Q26.9 22.15 26.9 22.15Q26.9 22.15 26.9 22.15Q26.9 22.15 26.9 22.15Q26.9 22.15 26.9 22.15Q26.9 22.15 26.9 22.15ZM20.25 25.45Q20.25 25.45 20.25 25.45Q20.25 25.45 20.25 25.45Q20.25 25.45 20.25 25.45Q20.25 25.45 20.25 25.45Q20.25 25.45 20.25 25.45Q20.25 25.45 20.25 25.45Z"
    />
  </Svg>
);

export default VisibleOffEye;
