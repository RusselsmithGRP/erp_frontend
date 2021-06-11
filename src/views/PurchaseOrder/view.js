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
import Close from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Modal from "@material-ui/core/Modal";

import Print from "@material-ui/icons/Print";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import * as poActions from "../../actions/purchaseorder";
import * as rfqActions from "../../actions/requestforquotation";
import Notification from "views/Notifications/Index.jsx";
import * as Uom from "utility/Uom";
import * as Status from "utility/Status";
import * as currencies from "../../utility/Currencies.js";

const shipto = [
  { slug: "lagos", name: "Lagos Office" },
  { slug: "portharcourt", name: "Port-Harcourt Office" },
];

const styles = (theme) => ({
  ...tableStyle,
  ...regularFormsStyle,
  td: {
    border: "none",
    margin: "0 10px",
    padding: "0 10px",
    fontWeight: "700",
    fontSize: "15px",
  },
  removeDivPadding: { maxWidth: "12%" },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  ulStyle: {
    listStyleType: "none",
    overflow: "auto",
    padding: "0",
    borderBottom: "1px solid #000",
  },
  liStyle: {
    float: "left",
    paddingBottom: "15px",
    fontWeight: "700",
    lineHeight: "2",
    width: "25%",
  },
  paper: {
    position: "fixed",
    minWidth: "600px",
    minHeight: "200px",
    left: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
  },
  closeButtonSetting: {
    position: "absolute",
    top: " 10px",
    right: "30px",
  },
  ap: {
    fontWeight: "500",
  },
  shadow: {
    boxShadow: "rgba(0, 0, 0, 0.085) 0.1px 0.125rem 0.25rem",
    padding: "15px",
  },
  space1: {
    height: "10px",
  },
  boxer: {
    display: "table",
    borderCollapse: "collapse",
    width: "100%",
  },
  boxRow: {
    display: "table-row",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#fff",
      borderLeft: "5px solid #3393FF",
    },
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  box: {
    display: "table-cell",
    verticalAlign: " top",
    borderBottom: " 1px solid #ddd",
    padding: "15px",
  },
  sidebar: {
    minHeight: "70vh",
    backgroundColor: "#f5f5f5",
  },
  boxHeader: {
    fontWeight: "700",
    backgroundColor: "#D3D3D3",
    display: "table-row",
  },
});

class View extends React.Component {
  state = {
    doc: {
      po: {
        vendor: {
          general_info: {},
        },
        requestor: {},
        vat: "",
        discount: "",
        servicecharge: "",
        freightcharges: "",
      },
      items: [],
    },
    vendors: [],
    quotes: [],
    table_data: [],
    checkeditems: [],
    showReason: "",
    reason: "",
    action: "",
    open: false,
    additional_terms: "",
    currency: "",
    disabled: false,
  };

  renderRedirect = () => {
    if (this.state.error) {
      this.setState({ disabled: false });
    }
    if (this.state.error === false) {
      setTimeout(function () {
        window.location.href = "/order";
      }, 3000);
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose() {
    this.setState({ open: false });
  }

  handleChange = (e) => {
    const action = e.target.value;
    let showReason = action == "disapprove" ? true : false;
    this.setState({ showReason, action });
  };
  handleTerms = (e) => {
    this.setState({
      additional_terms: e.target.value,
    });
  };

  handleFormChange = (e) => {
    const reason = e.target.value;
    this.setState({ reason });
  };
  submitTerms = () => {
    const data = {};
    data.id = this.state.doc.po._id;
    data.additional_terms = this.state.additional_terms;
    poActions.submitTerms(this.props.user.token, data, (result) => {
      if (result) {
        alert("Addititional terms added");
      }
    });
  };

  submitForm = (e) => {
    this.setState({ disabled: true });
    let data = {};
    let message = "";
    if (this.state.action == "approve") {
      data.type = this.state.action;
      message = "Purchase Order approved.";
    } else {
      data.reason = this.state.reason;
      data.type = this.state.action;
      message = "Purchase Order has been disapproved.";
    }
    poActions.editPurchaseOrder(
      this.props.user.token,
      this.props.match.params.id,
      data,
      (isOk) => {
        if (isOk) this.setState({ message: message, error: false });
        else
          this.setState({ message: "Error processing request.", error: true });
      }
    );
  };

  openPDF = (e) => {
    var win = window.open("/pdf/" + this.props.match.params.id, "_blank");
    win.focus();
  };

  // parseRow() {
  //   const { classes } = this.props;
  //   let currency = "";
  // );
  //   this.setState({ table_data, currency });
  // }

  componentDidMount() {
    poActions.fetchPurchaseOrderById(
      this.props.user.token,
      this.props.match.params.id,
      (doc) => {
        this.setState({ doc });
        this.parseRow();
      }
    );
  }

  render() {
    const { classes, tableHeaderColor } = this.props;
    const table_data = this.state.doc.items.length ? (
      this.state.doc.items.map((prop, key) => {
        const uom = Uom.getUom(prop.uom);
        return (
          <TableRow key={key}>
            <TableCell
              component="th"
              style={{
                border: "none",
                padding: "0",
                width: "20px",
                textAlign: "center",
              }}
            >
              {key + 1}
            </TableCell>
            <TableCell className={classes.td}>{prop.description}</TableCell>
            <TableCell className={classes.td}>{prop.quantity}</TableCell>
            <TableCell className={classes.td}>{uom.name}</TableCell>
            <TableCell className={classes.td}>
              {currencies.getCurrencyCode(prop.currency)}
              {prop.price / 100}
            </TableCell>
            <TableCell className={classes.td}>
              {currencies.getCurrencyCode(prop.currency)}
              {(prop.price * prop.quantity) / 100}
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <div>No Items!</div>
    );

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
                  <div>
                    <ul className={classes.ulStyle}>
                      <li
                        className={classes.liStyle}
                        onClick={this.openPDF}
                        style={{ cursor: "pointer" }}
                      >
                        <Print style={generalStyle.printIcon} />
                        <span style={generalStyle.fs1}> Print</span>
                      </li>
                    </ul>
                    <ul className={classes.ulStyle}>
                      <li className={classes.liStyle}>
                        EID: <br />
                        <span className={classes.ap}>
                          {this.state.doc.po.requestor != null
                            ? this.state.doc.po.requestor.eid
                            : ""}
                        </span>
                      </li>
                      <li className={classes.liStyle}>
                        Purchase Order No: <br />
                        <span className={classes.ap}>
                          {this.state.doc.po.no}
                        </span>
                      </li>
                      <li className={classes.liStyle}>
                        Ship To: <br />
                        <span className={classes.ap}>
                          {this.state.doc.po.shipto}
                        </span>
                      </li>
                      <li className={classes.liStyle}>
                        Address: <br />
                        <span className={classes.ap}> </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className={classes.ulStyle}>
                      <li className={classes.liStyle}>
                        Vendor: <br />
                        <span className={classes.ap}>
                          {this.state.doc.po.vendor
                            ? this.state.doc.po.vendor.general_info.company_name
                            : ""}
                        </span>
                      </li>
                      <li className={classes.liStyle}>
                        Date Needed: <br />
                        <span className={classes.ap}>{}</span>
                      </li>
                      <li className={classes.liStyle}>
                        Date Delivered: <br />
                        <span className={classes.ap}>{}</span>
                      </li>
                      <li className={classes.liStyle}>
                        Status: <br />
                        <span className={classes.ap}>
                          {Status.getStatus(this.state.doc.po.status)}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <div style={{ overflowX: "scroll" }}>
                    <Table>
                      <TableHead
                        className={classes[tableHeaderColor + "TableHeader"]}
                        style={{
                          marginTop: "10px",
                          color: "#1b4aa5",
                          borderBottomColor: "#333",
                          borderBottomStyle: "solid",
                          borderBottomWidth: "1px",
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
                            Quantity
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

                      <TableBody>{table_data}</TableBody>
                    </Table>
                  </div>
                  <div />
                  <Grid container>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="Discount"
                        id="discount"
                        formControlProps={{
                          style: { width: "100%" },
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.doc.po.discount,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="VAT"
                        id="vat"
                        formControlProps={{
                          style: { width: "100%" },
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.doc.po.vat,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="Freight Charges"
                        id="freightcharges"
                        formControlProps={{
                          style: { width: "100%" },
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.doc.po.freightcharges,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <CustomInput
                        labelText="Service Charges"
                        id="servicecharge"
                        formControlProps={{
                          style: { width: "100%" },
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.doc.po.servicecharge,
                        }}
                      />
                    </GridItem>
                  </Grid>
                  <div style={generalStyle.resultSection}>
                    <span
                      style={{
                        color: "#1b4aa5",
                        fontWeight: "700",
                        margin: "7px",
                      }}
                    >
                      Total:
                    </span>
                    <span
                      style={{
                        float: "right",
                        color: "#1b4aa5",
                        fontWeight: "700",
                      }}
                    >
                      {currencies.getCurrencyCode(this.state.currency)}
                      {this.state.doc.po.grand_total}
                    </span>
                  </div>
                  {/* <Button onClick={this.handleOpen} color="yellowgreen">
                    Add Additional Terms
                  </Button> */}
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <div className={classes.paper}>
                      <Card>
                        <CardHeader>
                          <Close
                            onClick={() => this.handleClose()}
                            className={classes.closeButtonSetting}
                          />
                        </CardHeader>
                        <CardBody>
                          <CustomInput
                            labelText="Additional Terms"
                            id="additional_terms"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              onChange: (e) => this.handleTerms(e),
                              value: this.state.additional_terms,
                            }}
                          />
                          <Button
                            color="yellowgreen"
                            onClick={this.submitTerms}
                          >
                            submit
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  </Modal>
                </CardBody>

                {this.props.user._id !=
                (this.state.doc.po.requestor
                  ? this.state.doc.po.requestor._id
                  : "") ? (
                  <CardFooter>
                    <Grid container>
                      {this.state.showReason ? (
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Reason"
                            id="reason"
                            required
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              name: "reason",
                              value: this.state.reason,
                              onChange: this.handleFormChange,
                            }}
                          />
                        </GridItem>
                      ) : (
                        ""
                      )}
                      {Status.getStatus(this.state.doc.po.status) ===
                      "CEO Approved" ? (
                        <Button color="yellowgreen">Mark as closed</Button>
                      ) : Status.getStatus(this.state.doc.po.status) ===
                        "PO Closed" ? null : (
                        <>
                          <GridItem xs={12} sm={6} md={6}>
                            <h4>Choose Action &darr;</h4>
                            <FormControl
                              fullWidth
                              className={classes.selectFormControl}
                            >
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu,
                                }}
                                classes={{
                                  select: classes.select,
                                }}
                                value={this.state.action}
                                inputProps={{
                                  name: "simpleSelect",
                                  id: "type",
                                }}
                                onChange={this.handleChange}
                              >
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                  }}
                                  value="approve"
                                >
                                  Approve
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                  }}
                                  value="disapprove"
                                >
                                  Reject
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button
                              color="yellowgreen"
                              onClick={this.submitForm}
                              disabled={this.state.disabled}
                            >
                              Submit
                            </Button>
                          </GridItem>
                        </>
                      )}
                    </Grid>
                  </CardFooter>
                ) : (
                  ""
                )}
              </Card>
            </form>
          </GridItem>
        </Grid>
      </div>
    );
  }
}
View.defaultProps = {
  tableHeaderColor: "gray",
};

View.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.loader.loading,
    loader: state.loader,
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(View));
