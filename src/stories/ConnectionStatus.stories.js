import ConnectionStatus from './connetionStatus/ConnectionStatus';
import React from 'react';

export default {
    title: 'Component/ConnectionStatus',
    component: ConnectionStatus,
};

const Template = (args) => <ConnectionStatus {...args} />;

export const Connected = Template.bind({});
export const Disconnected = Template.bind({});

Connected.args = {
    connection: true,
};

Disconnected.args = {
    connection: false,
};
