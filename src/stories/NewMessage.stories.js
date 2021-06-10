import NewMessage from './Form/NewMessage/NewMessage';
import React from 'react';

export default {
    title: 'Form/New Message',
    component: NewMessage,
};

const Template = (args) => <NewMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: "Username",
    disabled: false,
};
