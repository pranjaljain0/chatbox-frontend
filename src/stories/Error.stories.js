import Error from './pages/error/Error';
import React from 'react';

export default {
    title: 'Page/Error',
    component: Error,
};

const Template = (args) => <Error {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
