import { View } from 'react-native';
import { Meta, Story as StoryType } from '@storybook/react-native';

import { MoneySummaryProps } from './types';
import { MoneySummary } from '.';

const moneySummaryMeta: Meta<typeof MoneySummary> = {
  title: 'MoneySummary',
  component: MoneySummary,
  args: {
    money: 300,
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

export const Base: StoryType<MoneySummaryProps> = args => <MoneySummary {...args} />;
