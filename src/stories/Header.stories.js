import { Header } from "./Header/Header";
import React from "react";

export default {
  title: "Chatbox/Header",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
export const LoggedOut = Template.bind({});
export const roomWithoutUser = Template.bind({});

LoggedIn.args = {
  username: "1234",
  roomID: "1234",
};

roomWithoutUser.args = {
  roomID: "1234",
};

LoggedOut.args = {};
