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

Badge.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string
};
