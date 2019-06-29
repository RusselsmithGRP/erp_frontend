import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Progress from "../../components/Progress/Progress.jsx";
import * as vendorActions from "../../actions/vendor";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Notification from "views/Notifications/Index.jsx";

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

class WorkReferences extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    data: {
      coy_name: props.data.coy_name,
      coy_address: props.data.coy_address,
      contact_person: props.data.contact_person,
      contact_designation: props.data.contact_designation,
      contact_email: props.data.contact_email,
      contact_phone: props.data.contact_phone,
      name: props.data.name,
      phone:props.data.phone,
      address: props.data.address,
      email: props.data.email
    },
    redirect: false,
    errorLog: "",
    error_string: ""
  };
}
  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  isPhoneNumber(input) {
    let re = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    return re.test(input);
  }

  isNumber(input) {
    let re = /^[0-9]+$/;
    return re.test(input);
  }
  isEmail(input) {
    let re = /\S+@\S+\.\S+/;
    return re.test(input);
  }
  isEmpty(input) {
    if (input != "") {
      return true;
    }
  }
  ValidURL(input) {
    let re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    return re.test(input);
  }

  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value;
    this.props.addDispatch(data);
  };
  handleSave = e => {
    e.preventDefault();
    this.props.updateVendor(this);
  };

  submitDetails = e => {
    e.preventDefault();
    let errorState = false;
    let general_info_error_array = ["General Info Errors"];
    let business_info_error_array = ["Business Info Errors"];
    let bank_details_error_array = ["Bank Details Errors"];
    let work_reference_error_array = ["Work Reference Errors"];
    let error_string = "";
    this.props.vendor;
    //validate general_info
    if (this.props.vendor.general_info === undefined) {
      var generalInfo = {};
    } else {
      var generalInfo = this.props.vendor.general_info;
    }
    if (!generalInfo.company_name) {
      general_info_error_array.push("Company name is invalid");
    }
    if (!generalInfo.reg_no) {
      general_info_error_array.push("reg number is invalid");
    }
    if (!generalInfo.office_address) {
      general_info_error_array.push("office address is invalid");
    }
    if (!generalInfo.city) {
      general_info_error_array.push("city is invalid");
    }
    if (!generalInfo.state) {
      general_info_error_array.push("state is invalid");
    }
    if (!generalInfo.country) {
      general_info_error_array.push("country is invalid");
    }
    if (!this.isPhoneNumber(generalInfo.coy_phone)) {
      general_info_error_array.push("company telephone is invalid");
    }
    if (!this.isEmail(generalInfo.coy_email)) {
      general_info_error_array.push("company email is invalid");
    }
    if (!this.ValidURL(generalInfo.website)) {
      general_info_error_array.push("website is invalid");
    }
    if (!generalInfo.contact_name) {
      general_info_error_array.push("contact name is invalid");
    }
    if (!generalInfo.designation) {
      general_info_error_array.push("designation is invalid");
    }
    if (!this.isPhoneNumber(generalInfo.contact_phone)) {
      general_info_error_array.push("contact telephone is invalid");
    }
    if (!this.isEmail(generalInfo.contact_email)) {
      general_info_error_array.push("contact email is invalid");
    }

    //validate business_info
    if (this.props.vendor.business_info === undefined) {
      var businessInfo = {};
    } else {
      var businessInfo = this.props.vendor.business_info;
    }
    if (!businessInfo.business_type) {
      business_info_error_array.push("business type is invalid");
    }
    if (!this.isNumber(businessInfo.year_established)) {
      business_info_error_array.push("year established is invalid");
    }
    if (!businessInfo.employee_no) {
      business_info_error_array.push("number of employee is invalid");
    }
    if (!businessInfo.vat_no) {
      business_info_error_array.push("VAT number is invalid");
    }
    if (!businessInfo.tax_no) {
      business_info_error_array.push("tax number is invalid");
    }
    if (!businessInfo.product_related) {
      business_info_error_array.push("product related is invalid");
    }
    if (!businessInfo.service_related) {
      business_info_error_array.push("service related is invalid");
    }

    //validate bank details
    if (this.props.vendor.bank_detail === undefined) {
      var bankDetail = {};
    } else {
      var bankDetail = this.props.vendor.bank_detail;
    }
    if (!bankDetail.account_name) {
      bank_details_error_array.push("account name is invalid");
    }
    if (!this.isNumber(bankDetail.account_number)) {
      bank_details_error_array.push("account number is invalid");
    }
    if (!bankDetail.bank) {
      bank_details_error_array.push("bank is invalid");
    }
    if (!this.isNumber(bankDetail.sort_code)) {
      bank_details_error_array.push("sort code is invalid");
    }
    if (!bankDetail.branch) {
      bank_details_error_array.push("branch is invalid");
    }
    if (!this.isPhoneNumber(bankDetail.contact_phone)) {
      bank_details_error_array.push("contact telephone is invalid");
    }

    //validate for workreference
    const workReference = this.state.data;
    if (!workReference.coy_name) {
      work_reference_error_array.push("company name is invalid");
    }
    if (!workReference.coy_address) {
      work_reference_error_array.push("company address is invalid");
    }
    if (!workReference.contact_person) {
      work_reference_error_array.push("contact person is invalid");
    }
    if (!workReference.contact_designation) {
      work_reference_error_array.push("contact designation is invalid");
    }
    if (!this.isEmail(workReference.contact_email)) {
      work_reference_error_array.push("contact email is invalid");
    }
    if (!this.isPhoneNumber(workReference.contact_phone)) {
      work_reference_error_array.push("contact telephone is invalid");
    }
    if (!workReference.name) {
      work_reference_error_array.push("name is invalid");
    }
    if (!workReference.address) {
      work_reference_error_array.push("address is invalid");
    }
    if (!this.isEmail(workReference.email)) {
      work_reference_error_array.push("email is invalid");
    }
    if (!this.isPhoneNumber(workReference.phone)){
      work_reference_error_array.push("phone is invalid");
    }
    function addErrors(value, key) {
      if (key == 0) {
        error_string += "<h4>" + value + "</h4>";
      }
      if (key >= 1) error_string += "<p>" + value + "</p>";
    }

    if (general_info_error_array.length > 1) {
      errorState = true;
      general_info_error_array.forEach(addErrors);
    }
    if (business_info_error_array.length > 1) {
      errorState = true;
      business_info_error_array.forEach(addErrors);
    }
    if (bank_details_error_array.length > 1) {
      errorState = true;
      bank_details_error_array.forEach(addErrors);
    }
    if (work_reference_error_array.length > 1) {
      errorState = true;
      work_reference_error_array.forEach(addErrors);
    }

    if (error_string === "") {
      this.props.submitVendor(this);
    } else {
      this.setState({
        errorLog: <div dangerouslySetInnerHTML={{ __html: error_string }} />
      });
    }
  };

  render() {
    console.log(this.props.vendor);

    const { classes } = this.props;
    return this.state.redirect ? (
      <Redirect to="/dashboard" />
    ) : (
      <Grid container id="mainGrid">
        <GridItem xs={12} sm={12} md={12}>
          <form className={classes.container} noValidate autoComplete="off">
            <Notification error={true} message={this.state.errorLog} />
            <Progress loading={this.state.loading} />
            <Card>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company Name"
                      id="coy_name"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.coy_name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company Address"
                      id="coy_address"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.coy_address
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Person"
                      id="contact_person"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.contact_person
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Designation"
                      id="contact_designation"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.contact_designation
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Email"
                      id="contact_email"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.contact_email
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Phone"
                      id="contact_phone"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.contact_phone
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <h4 style={{ marginLeft: "20px" }}>Individual Reference.</h4>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.address
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.email
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone"
                      id="phone"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.phone
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Grid container>
                  <GridItem xs={12} sm={6} md={2}>
                    <Button color="primary" onClick={this.handleSave}>
                      Save
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={2}>
                    <Button
                      color="info"
                      onClick={this.submitDetails}
                      id="button-submit"
                    >
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </Grid>
    );
  }
}

WorkReferences.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    data:
      typeof state.vendor.work_references != "undefined"
        ? state.vendor.work_references
        : {},
    user: state.auth.user,
    vendor: state.vendor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateVendor(e) {
      let d = {};
      d.work_reference = e.state.data;
      vendorActions.submitVendorDetailsViaUserId(dispatch, e.props.user._id, d);
    },
    addDispatch(data){
      vendorActions.getWorkReferenceInputs(dispatch, data);
    },
    submitVendor(e) {
      let d = {};
      d.work_reference = e.state.data;
      d.status = "PENDING";
      vendorActions.submitVendorDetailsViaUserId(dispatch, e.props.user._id, d);
    },
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkReferences));
