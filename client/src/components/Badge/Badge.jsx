import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import "./Badge.scss"

export default function Badge(props) {
  const { classes, children } = props;
  return (
    <span className={"badge" + " " + classes}>{children}</span>
  );
}

// propTypes to define what all types of props are accepted by this component
Badge.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string
};
