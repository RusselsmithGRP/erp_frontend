import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import moment from "moment";
import DatePicker from "react-datepicker";

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomSelect from "../../components/CustomInput/CustomSelect.jsx";
import * as vendorActions from "../../actions/vendor";
import * as genericActions from "../../actions/generic.js";
import * as userAction from "../../actions/user";
import { connect } from "react-redux";
import Notification from "../Notifications/Index.jsx";
import helpers from "../helpers";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const durations = [
  { name: "1 month", slug: "1 month" },
  { name: "2 months", slug: "2 months" },
  { name: "3 months", slug: "3 months" },
  { name: "4 months", slug: "4 months" },
  { name: "5 months", slug: "5 months" },
  { name: "6 months", slug: "6 months" },
  { name: "7 months", slug: "7 months" },
  { name: "8 months", slug: "8 months" },
  { name: "9 months", slug: "9 months" },
  { name: "10 months", slug: "10 months" },
  { name: "11 months", slug: "11 months" },
  { name: "1 year", slug: "1 year" },
  { name: "2 years", slug: "2 years" },
  { name: "3 years", slug: "3 years" }
];

const minTerminationLeadTimes = [
  { name: "Immediate", slug: "Immediate" },
  { name: "48 hours", slug: "48 hours" },
  { name: "1 month", slug: "1 month" },
  { name: "3 months", slug: "3 months" },
  { name: "6 months", slug: "6 months" }
];
export class updateVendorType extends Component {
  state = {
    vendors: [],
    vendor: {},
    durations: [],
    duration: "",
    startDate: moment(),
    endDate: moment(),
    departments: [],
    minTerminationLeadTimes: [],
    minTerminationLeadTime: "",
    signedBy: "",
    users: [],
    associatedDept: "",
    isOpen1: false,
    isOpen2: false,
    isValidated: false,
    validationState: {
      minTerminationLeadTime: "",
      signedBy: "",
      associatedDept: "",
      duration: "",
      vendor: "",
      endDate: ""
    },
    responseMessage: ""
  };

  componentDidMount() {
    genericActions.fetchAll("vendors", this.props.user.token, vendors => {
      this.setState({ vendors, durations, minTerminationLeadTimes });
    });
    genericActions.fetchAll(
      "departments",
      this.props.user.token,
      departments => {
        this.setState({ departments });
      }
    );
    userAction.findAllStaff(this.props, users => {
      this.setState({ users });
    });
  }

  handleStartDate = date => {
    this.setState({ startDate: date });
    this.toggleCalender();
  };

  handleEndDate = date => {
    this.setState({ endDate: date });
    this.toggleCalender2();
  };

  toggleCalender = e => {
    e && e.preventDefault();
    this.setState({ isOpen1: !this.state.isOpen1 });
  };

  toggleCalender2 = e => {
    e && e.preventDefault();
    this.setState({ isOpen2: !this.state.isOpen2 });
  };

  handleChange = e => {
    if (this.validateFields() === true) {
      this.setState({
        isValidated: true
      });
    }
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateFields = () => {
    const {
      duration,
      endDate,
      minTerminationLeadTime,
      signedBy,
      associatedDept,
      vendor
    } = this.state;
    return (
      !!duration &&
      !!endDate &&
      !!minTerminationLeadTime &&
      !!signedBy &&
      !!associatedDept &&
      !!vendor
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    const _id = this.state.vendor;
    const {
      duration,
      startDate,
      endDate,
      minTerminationLeadTime,
      signedBy,
      associatedDept
    } = this.state;

    const data = {
      _id,
      duration,
      startDate,
      endDate,
      minTerminationLeadTime,
      signedBy,
      associatedDept
    };

    vendorActions.updateVendorType(this.props, data, result => {
      if (result) {
        this.setState({
          duration: "",
          startDate: moment(),
          endDate: moment(),
          minTerminationLeadTime: "",
          signedBy: "",
          associatedDept: "",
          vendor: {}
        });
      }
      console.log(result);
      this.setState({
        responseMessage: result.message
      });
    });
  };

  render() {
    return (
      <div style={{ fontFamily: styles.cardTitleWhite.fontFamily }}>
        <Grid container>
          {this.state.responseMessage ? (
            <Notification error={false} message={this.state.responseMessage} />
          ) : (
            ""
          )}
          <GridItem xs={12} sm={12} md={8}>
            <form>
              <Card>
                <CardHeader color="primary">
                  <h4 className={{ color: styles.cardTitleWhite.color }}>
                    Vendor Contract Management
                  </h4>
                </CardHeader>
                <CardBody>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Vendor"
                        name="vendor"
                        required
                        value={this.state.vendor}
                        onChange={e => this.handleChange(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                        // error={
                        //   this.state.validationState.vendor !== ""
                        //     ? this.state.validationState.vendor
                        //     : ""
                        // }
                        // success={
                        //   this.state.validationState.vendor === ""
                        //     ? ""
                        //     : !this.state.validationState.vendor
                        // }
                      >
                        {this.state.vendors.map(function(data, key) {
                          return (
                            <MenuItem name="vendor" key={key} value={data._id}>
                              {data.general_info.company_name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Contract Duration"
                        name="duration"
                        required
                        value={this.state.duration}
                        onChange={e => this.handleChange(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                      >
                        {this.state.durations.map(function(data, key) {
                          return (
                            <MenuItem
                              name="duration"
                              key={key}
                              value={data.name}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Start Date"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        // error={error.dateneeded ? true : false}
                        onFocus={this.toggleCalender}
                        inputProps={{
                          value: this.state.startDate.format("MM/DD/YYYY"),
                          onFocus: this.toggleCalender,
                          margin: "normal"
                        }}
                      />
                      {this.state.isOpen1 && (
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleStartDate}
                          selectsStart
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          withPortal
                          inline
                        />
                      )}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="End Date"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        // error={error.dateneeded ? true : false}
                        onFocus={this.toggleCalender2}
                        inputProps={{
                          value: this.state.endDate.format("MM/DD/YYYY"),
                          onFocus: this.toggleCalender2,
                          margin: "normal"
                        }}
                      />
                      {this.state.isOpen2 && (
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={this.handleEndDate}
                          selectsEnd
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          withPortal
                          inline
                        />
                      )}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Min Termination Lead Time"
                        name="minTerminationLeadTime"
                        required
                        value={this.state.minTerminationLeadTime}
                        onChange={e => this.handleChange(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                        // error={
                        //   this.state.validationState.department === ""
                        //     ? ""
                        //     : this.state.validationState.email
                        // }
                        // success={
                        //   this.state.validationState.email === ""
                        //     ? ""
                        //     : !this.state.validationState.email
                        // }
                      >
                        {this.state.minTerminationLeadTimes.map(function(
                          data,
                          key
                        ) {
                          return (
                            <MenuItem
                              name="minTerminationLeadTime"
                              key={key}
                              value={data.name}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Signed By"
                        name="signedBy"
                        required
                        value={this.state.signedBy}
                        onChange={e => this.handleChange(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                        // error={
                        //   this.state.validationState.department === ""
                        //     ? ""
                        //     : this.state.validationState.email
                        // }
                        // success={
                        //   this.state.validationState.email === ""
                        //     ? ""
                        //     : !this.state.validationState.email
                        // }
                      >
                        {this.state.users.map(function(data, key) {
                          return (
                            <MenuItem
                              name="signedBy"
                              key={key}
                              value={data._id}
                            >
                              {data.firstname + " " + data.lastname}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Associated Department"
                        name="associatedDept"
                        required
                        value={this.state.associatedDept}
                        onChange={e => this.handleChange(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                        // error={
                        //   this.state.validationState.department === ""
                        //     ? ""
                        //     : this.state.validationState.email
                        // }
                        // success={
                        //   this.state.validationState.email === ""
                        //     ? ""
                        //     : !this.state.validationState.email
                        // }
                      >
                        {this.state.departments.map(function(data, key) {
                          return (
                            <MenuItem
                              name="associatedDept"
                              key={key}
                              value={data._id}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                  </Grid>
                </CardBody>
                <CardFooter>
                  <Button
                    color="primary"
                    onClick={this.handleSubmit}
                    disabled={!this.validateFields()}
                  >
                    Update
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(updateVendorType);