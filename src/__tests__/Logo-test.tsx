import 'react-native';
import renderer from 'react-test-renderer';
import { Logo } from '@app/components/Logo';

test('renders correctly the Logo component', () => {
  const tree = renderer.create(<Logo />).toJSON();
  expect(tree).toMatchSnapshot();
});
