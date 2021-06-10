import InputText from './Input/InputText';
import React from 'react';

export default {
    title: 'Component/InputText',
    component: InputText,
};

const Template = (args) => <InputText {...args} />;

export const Username = Template.bind({});
export const RoomID = Template.bind({});

Username.args = {
    placeholder: 'Username',
    label: 'Username',
};

RoomID.args = {
    placeholder: 'Room ID',
    label: 'Room ID',
};
