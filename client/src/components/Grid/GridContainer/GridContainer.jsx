import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import "./GridContainer.scss";

export default function GridContainer(props) {
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className="gridContainer">
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node
};
