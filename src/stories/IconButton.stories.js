import { IconButton } from "./IconButton/IconButton";
import React from "react";

export default {
  title: "Component/IconButton",
  component: IconButton,
};

const Template = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
