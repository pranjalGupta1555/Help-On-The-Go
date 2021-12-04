import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import "./GridItem.scss"

export default function GridItem(props) {
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={"gridItem" + " " + className}>
      {children}
    </Grid>
  );
}

GridItem.defaultProps = {
  className: "",
};

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
