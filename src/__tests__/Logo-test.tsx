import renderer from 'react-test-renderer';
import { Logo } from '@app/components/Logo';

import 'react-native';

test('renders correctly the Logo component', () => {
  const tree = renderer.create(<Logo />).toJSON();
  expect(tree).toMatchSnapshot();
});
