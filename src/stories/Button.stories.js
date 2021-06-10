import { Button } from './Button/Button';
import React from 'react';

export default {
  title: 'Component/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};
