import './header.scss';

import { MdContentCopy } from "react-icons/md"
import PropTypes from 'prop-types';
import React from 'react';
import { RiLogoutCircleLine } from "react-icons/ri"

export const Header = ({ username, roomID, onLogout, onCopy }) => {
  return (<header>
    <div className="wrapper">
      {roomID !== undefined && roomID !== null &&
        <div><span><MdContentCopy onClick={onCopy} /></span></div>}
      <h2>Chatbox</h2>
      {roomID !== undefined && roomID !== null && username !== undefined && username !== null &&
        <div><span><RiLogoutCircleLine onClick={onLogout} /></span></div>}
    </div>
  </header>)
};

Header.propTypes = {
  username: PropTypes.string,
  roomID: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

Header.defaultProps = {
  username: null,
};
