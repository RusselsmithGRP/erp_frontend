import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Plus from "@material-ui/icons/Add";
import Print from "@material-ui/icons/Print";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import { connect } from "react-redux";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import * as poActions from "../../actions/purchaseorder";
import * as rfqActions from "../../actions/requestforquotation";
import * as locationAction from "../../actions/location";
import Notification from "views/Notifications/Index.jsx";
import * as Util from "../../utility/Util";
import * as currencies from "../../utility/Currencies.js";
import * as companyName from "../../utility/companyName";
import * as vendorActions from "actions/vendor.js";

const styles = theme => ({
  ...tableStyle,
  ...regularFormsStyle,
  td: {
    border: "none",
    margin: "0 10px",
    padding: "0 10px",
    fontWeight: "700",
    fontSize: "15px"
  },

  removeDivPadding: { maxWidth: "12%" }
});

class Add extends React.Component {
  state = {
    data: {
      vendor: "",
      grand_total: 0,
      vat: 5,
      lineitems: []
    },
    vendors: [],
    allVendors: [],
    quotes: [],
    table_data: [],
    checkeditems: [],
    locations: [],
    types: [],
    address: "",
    checkeditemsprice: {},
    cummulativeprice: 0,
    isvatable: false,
    redirect: ""
  };

  renderRedirect = () => {
    if (this.state.redirect == "yes") {
      setTimeout(function() {
        window.location.href = "/order";
      }, 3000);
    }
    isvatable: true;
  };

  handleChange = event => {
    let data = this.state.data;
    data[[event.target.name]] = event.target.value;
    this.setState({
      data: data
    });
  };

  handleSubmit = event => {
    let data = this.state.data;
    data.lineitems = this.state.checkeditems;
    data.types = this.state.types;
    // console.log(data);
    if (data.creditterms) {
      poActions.submitPO(this.props.user.token, data, isOk => {
        if (isOk) {
          this.setState({
            message: "Purchase Order created succesfully",
            error: false,
            redirect: "yes"
          });
        } else
          this.setState({
            message: "Error creating purchase order.",
            error: true
          });
      });
    } else {
      alert("please select credit terms");
    }
  };

  handleCheckedItems = (i, k) => {
    let checkeditems = this.state.checkeditems;
    let types = this.state.types;
    let index = checkeditems.indexOf(i);
    let cummulativeprice = 0;
    if (index > -1) {
      checkeditems.splice(index, 1);
      types.splice(index, 1);
      cummulativeprice =
        this.state.cummulativeprice - parseInt(this.state.checkeditemsprice[i]);
    } else {
      checkeditems.push(i);
      types.push(k);
      cummulativeprice =
        this.state.cummulativeprice + parseInt(this.state.checkeditemsprice[i]);
    }
    this.setState({
      checkeditems,
      cummulativeprice,
      types
    });
    this.calcPrice("", cummulativeprice);
  };

  handleItemChange = event => {
    const { classes } = this.props;
    this.handleChange(event);
    let itemsprice = this.state.checkeditemsprice;
    rfqActions.fetchAllQuoteforVendor(
      this.props.user.token,
      event.target.value,
      quotes => {
        this.setState({ quotes });
        let grandTotal = this.state.data.grand_total;
        const table_data = this.state.quotes.map((prop, key) => {
          itemsprice[prop._id] = ((prop.price * prop.quantity) / 100).toFixed(
            2
          );
          return (
            <TableRow key={key}>
              <TableCell
                component="th"
                style={{
                  border: "none",
                  padding: "0",
                  width: "20px",
                  textAlign: "center"
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => this.handleCheckedItems(prop._id)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    />
                  }
                  classes={{
                    label: classes.label
                  }}
                />
                {key + 1}
              </TableCell>
              <TableCell className={classes.td}>{prop.description}</TableCell>
              <TableCell className={classes.td}>{prop.quantity}</TableCell>
              <TableCell className={classes.td}>{prop.unit}</TableCell>
              <TableCell className={classes.td}>
                {(prop.price / 100).toFixed(2)}
              </TableCell>
              <TableCell className={classes.td}>
                {((prop.price * prop.quantity) / 100).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        });

        let data = this.state.data;
        this.setState({ data, table_data, itemsprice });
      }
    );
  };

  selectedLocation(e) {
    locationAction.getAddress(this.props, e.target.value, json => {
      this.setState({ address: json });
    });
  }

  formulatePricing = event => {
    const name = event.target.name;
    this.calcPrice(name, this.state.cummulativeprice);
  };

  calcPrice = (name, currentPrice) => {
    const grandTotal = currentPrice;
    let data = this.state.data;
    if (this.state.isvatable) {
      //const vat = event.target.value? event.target.values: this.state.data.vat;
      data.grand_total = parseInt(grandTotal) + grandTotal * (5 / 100);
    } else {
      data.grand_total = parseInt(grandTotal);
    }
    switch (name) {
      case "discount":
        const discount = event.target.value
          ? event.target.value
          : this.state.data.discount;
        data.grand_total = grandTotal - parseInt(discount);
        // data.discount = discount;
        data.discount = event.target.value;
        break;
      case "freightcharges":
        const freightcharges = event.target.value
          ? event.target.value
          : this.state.data.freightcharges;
        data.grand_total = parseInt(grandTotal) + parseInt(freightcharges);
        data.freightcharges = event.target.value;
        break;
      case "servicecharge":
        const servicecharge = event.target.value
          ? event.target.value
          : this.state.data.servicecharge;
        data.grand_total = parseInt(grandTotal) + parseInt(servicecharge);
        data.servicecharge = event.target.value;
        break;
    }
    this.setState({ data });
  };

  componentDidMount() {
    // rfqActions.fetchUniqueVendorFromQuote(this.props, vendors => {
    //   //this.setState({ vendors });

    // });
    locationAction.getLocation(this.props, json => {
      this.setState({ locations: json });
    });
    rfqActions.searchVendor(this.props.user.token, vendors => {
      this.setState({ vendors });
    });

    vendorActions.searchVendor(this.props.user.token, "", allVendors => {
      this.setState({ allVendors });
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.isvatable != this.state.isvatable) {
  //     this.calcPrice("isvatable", this.state.cummulativeprice);
  //   }
  // }
  render() {
    // console.log(this.state.data.discount);

    const { classes, tableHeaderColor } = this.props;

    const creditTerms = [
      { value: "0", label: "Advance" },
      { value: "1", label: "30 days" },
      { value: "2", label: "45 days" },
      { value: "3", label: "60 days" }
    ];
    return (
      <div>
        {this.renderRedirect()}
        <Notification error={this.state.error} message={this.state.message} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <form className={classes.container} noValidate autoComplete="off">
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Purchase Order</h4>
                </CardHeader>
                <CardBody>
                  <Grid container>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={8}
                      style={generalStyle.positionRelative}
                    >
                      <Print style={generalStyle.printIcon} />
                      <span style={generalStyle.fs1}> Print</span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} style={generalStyle.text2}>
                      Purchase Order No:
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomSelect
                        labelText="Vendor:"
                        name="vendor"
                        id="vendor"
                        onChange={e => this.handleItemChange(e)}
                        value={this.state.data.vendor}
                        formControlProps={{
                          style: {
                            width: "100%",
                            padding: "0",
                            marginTop: "14px"
                          }
                        }}
                        inputProps={{ margin: "normal" }}
                        style={{ marginTop: "-3px", borderBottomWidth: " 1px" }}
                      >
                        {this.state.vendors.map(option => (
                          <MenuItem key={option.vendor} value={option.vendor}>
                            {option.vendor && this.state.allVendors
                              ? companyName.getVendor(
                                  option.vendor,
                                  this.state.allVendors
                                )
                              : ""}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="employeeid"
                        labelText="Employee ID: "
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.props.user.eid
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomSelect
                        labelText="Ship To"
                        name="shipto"
                        id="shipto"
                        required
                        onChange={e => {
                          this.handleChange(e);
                          this.selectedLocation(e);
                        }}
                        formControlProps={{
                          style: { width: "130px", padding: "0", margin: "0" }
                        }}
                        value={this.state.data.shipto}
                        inputProps={{ margin: "normal", id: "shipto" }}
                        style={{ marginTop: "-3px", borderBottomWidth: " 1px" }}
                      >
                        {this.state.locations.map(option => (
                          <MenuItem key={option.slug} value={option.slug}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomInput
                        labelText="Status"
                        id="status"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: "Pending Submission",
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomInput
                        labelText="Address"
                        id="address"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.address,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomSelect
                        labelText="Select Credit Terms"
                        id="creditterms"
                        name="creditterms"
                        required
                        formControlProps={{
                          style: {
                            padding: "0",
                            margin: "0",
                            width: "300px"
                          }
                        }}
                        onChange={this.handleChange}
                        inputProps={{
                          margin: "normal",
                          value: this.state.data.creditterms
                        }}
                        style={{
                          marginTop: "-3px",
                          borderBottomWidth: " 1px"
                        }}
                      >
                        {creditTerms.map(option => (
                          <MenuItem key={option.value} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Additional Terms"
                        name="additional_terms"
                        id="additional_terms"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: e => this.handleChange(e),
                          name: "additional_terms",
                          value: this.state.data.additional_terms
                        }}
                      />
                    </GridItem>
                  </Grid>
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isvatable}
                        onChange={e => {
                          this.setState({ isvatable: !this.state.isvatable });
                        }}
                      />
                    }
                    label="Check if VAT apply"
                  />
                  <div style={{ overflowX: "scroll" }}>
                    <Table>
                      <TableHead
                        className={classes[tableHeaderColor + "TableHeader"]}
                        style={{
                          marginTop: "10px",
                          color: "#1b4aa5",
                          borderBottomColor: "#333",
                          borderBottomStyle: "solid",
                          borderBottomWidth: "1px"
                        }}
                      >
                        <TableRow>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "#1b4aa5", width: "55px" }}
                          >
                            Item No
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "#1b4aa5" }}
                          >
                            Item Description
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "#1b4aa5", width: "70px" }}
                          >
                            Qty
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "#1b4aa5" }}
                          >
                            UOM
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "#1b4aa5" }}
                          >
                            Unit
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "#1b4aa5" }}
                          >
                            Total
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <div />

                      <TableBody>{this.state.table_data}</TableBody>
                    </Table>
                  </div>
                  <div />
                  <Grid container>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="Discount"
                        id="discount"
                        formControlProps={{
                          style: { width: "100%" }
                        }}
                        inputProps={{
                          name: "discount",
                          onBlur: this.formulatePricing
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      {this.state.isvatable && (
                        <CustomInput
                          labelText="VAT Applies"
                          id="vat"
                          formControlProps={{
                            style: { width: "100%" },
                            disabled: true
                          }}
                          inputProps={{
                            name: "vat",
                            onBlur: this.formulatePricing,
                            disabled: true
                          }}
                        />
                      )}
                    </GridItem>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="Freight Charges"
                        id="freightcharges"
                        formControlProps={{
                          style: { width: "100%" }
                        }}
                        inputProps={{
                          name: "freightcharges",
                          onBlur: this.formulatePricing
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="Service Charges"
                        id="servicecharge"
                        formControlProps={{
                          style: { width: "100%" }
                        }}
                        inputProps={{
                          name: "servicecharge",
                          onBlur: this.formulatePricing
                        }}
                      />
                    </GridItem>
                  </Grid>
                  <div style={generalStyle.resultSection}>
                    <span
                      style={{
                        color: "#1b4aa5",
                        fontWeight: "700",
                        margin: "7px"
                      }}
                    >
                      Total:
                    </span>
                    <span
                      style={{
                        float: "right",
                        color: "#1b4aa5",
                        fontWeight: "700"
                      }}
                    >
                      {this.state.data.grand_total}
                    </span>
                  </div>
                </CardBody>
                <CardFooter>
                  {this.state.data.vendor ? (
                    <Grid container>
                      <GridItem
                        xs={12}
                        sm={6}
                        md={2}
                        additionalclass={classes.removeDivPadding}
                      >
                        <Button color="primary" onClick={this.handleSave}>
                          Save
                        </Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <Button color="yellowgreen" onClick={this.handleSubmit}>
                          Submit
                        </Button>
                      </GridItem>
                    </Grid>
                  ) : (
                    ""
                  )}
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </Grid>
      </div>
    );
  }
}
Add.defaultProps = {
  tableHeaderColor: "gray"
};

Add.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.loader.loading,
    loader: state.loader
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Add));
