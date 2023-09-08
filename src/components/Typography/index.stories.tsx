import { View } from 'react-native';
import { Meta, Story as StoryType } from '@storybook/react-native';

import { TypographyProps } from './types';
import { Typography } from '.';

const moneySummaryMeta: Meta<typeof Typography> = {
  title: 'Typeography',
  component: Typography,
  args: {
    type: 'normal',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
    },
  },
  decorators: [
    Story => (
      <View style={{ padding: 40 }}>
        <Story />
      </View>
    ),
  ],
};

export default moneySummaryMeta;

export const Base: StoryType<TypographyProps> = args => <Typography {...args} />;
