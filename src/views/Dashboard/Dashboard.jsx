import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import Admin from "./Role/Admin.jsx";
import Vendor from "./Role/Vendor.jsx";
import Iac from "./Role/Iac.jsx";
import Procurement from "./Role/Procurement.jsx";
import Staff from "./Role/Staff.jsx";
import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {

  render() {
    if (this.props.user.role === "vendor"){
      return <Vendor />
    } else {
      return (<Admin />);
    }
    
    /* } else if (this.props.user.role === "vendor"){
      return <Vendor />
    } else if (this.props.user.role === "iac"){
      return <Iac />
    } */
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, null)(withStyles(dashboardStyle)(Dashboard));
