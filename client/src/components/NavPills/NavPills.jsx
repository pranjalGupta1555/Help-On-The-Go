import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// core components
import GridContainer from "../Grid/GridContainer/GridContainer";
import GridItem from "../Grid/GridItem/GridItem";

import "./NavPills.scss";

export default function NavPills(props) {

  // state variables
  const [active, setActive] = React.useState(props.active);


  const handleChange = (event, active) => {
    setActive(active);
  };

  // props from another component which is calling NavPills
  const { tabs, alignCenter } = props;

  const tabButtons = (
    <Tabs
      value={active}
      onChange={handleChange}
      centered={alignCenter}
    >
      {tabs.map((prop, key) => {
        var icon = {};
        if (prop.tabIcon !== undefined) {
          icon["icon"] = <prop.tabIcon className="tabIcon" />;
        }
        return (
          <Tab
            label={prop.tabButton}
            key={key}
            {...icon}
            classes={{
              selected: "tabColor",
            }}
          />
        );
      })}
    </Tabs>
  );
  const tabContent = (
    <div className="m-top50">
      {tabs.map((prop, key) => {
        if (key === active) {
          return (
            <div key={key}>
              {prop.tabContent}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
  return (
  <GridContainer>
      <GridItem >{tabButtons}</GridItem>
      <GridItem >{tabContent}</GridItem>
  </GridContainer>
  )
  
}

NavPills.defaultProps = {
  active: 0,
};

// propTypes to define what all types of props are accepted by this component
NavPills.propTypes = {
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node,
    })
  ).isRequired,
  alignCenter: PropTypes.bool,
};
