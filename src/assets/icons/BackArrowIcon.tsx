import Svg, { SvgProps, G, Path, Rect } from 'react-native-svg';

interface Props {
  size?: string | number;
  fill?: string;
}

export const BackArrowIcon = ({ fill = '#000', size = '24', ...restProps }: SvgProps & Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...restProps}>
      <G id="BackArrowIcon" data-name="BackArrowIcon" transform="translate(-16 -16)">
        <Path
          id="Path_493"
          data-name="Path 493"
          d="M20.166,39.536a1.534,1.534,0,0,0-.266-.02H4.764l.33-.154a3.07,3.07,0,0,0,.867-.614L10.206,34.5a1.589,1.589,0,0,0,.223-2.034,1.535,1.535,0,0,0-2.3-.2L.45,39.946a1.535,1.535,0,0,0,0,2.171h0l7.676,7.676a1.535,1.535,0,0,0,2.3-.154,1.589,1.589,0,0,0-.223-2.034L5.969,43.354a3.07,3.07,0,0,0-.768-.56l-.461-.207H19.816a1.589,1.589,0,0,0,1.62-1.29A1.535,1.535,0,0,0,20.166,39.536Z"
          transform="translate(17 -12.842)"
          fill={fill}
        />
        <Rect
          id="Rectangle_2980"
          data-name="Rectangle 2980"
          width="24"
          height="24"
          transform="translate(16 16)"
          fill="none"
        />
      </G>
    </Svg>
  );
};
