import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as genericActions from "../../actions/generic.js";
import { Redirect } from "react-router";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Link } from "react-router-dom";
import Table from "components/Table/Table.jsx";
import * as Status from "utility/Status";
import * as rfqActions from "../../actions/requestforquotation";
import * as vendorActions from "../../actions/vendor";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import TableCore from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import * as Uom from "utility/Uom";

const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  sweetAlert: {
    marginTop: "0"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
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
    width: "260px"
  },
  ulStyle: {
    listStyleType: "none",
    overflow: "auto",
    padding: "0",
    borderBottom: "1px solid #000"
  },
  liStyle: {
    float: "left",
    paddingBottom: "15px",
    fontWeight: "700",
    lineHeight: "2",
    width: "25%"
  },
  ap: {
    fontWeight: "500"
  },
  shadow: {
    boxShadow: "rgba(0, 0, 0, 0.085) 0.1px 0.125rem 0.25rem",
    padding: "15px"
  },
  space1: {
    height: "10px"
  },
  boxer: {
    display: "table",
    borderCollapse: "collapse",
    width: "100%"
  },
  boxRow: {
    display: "table-row",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#fff",
      borderLeft: "5px solid #3393FF"
    },
    "&:hover": {
      backgroundColor: "#fff"
    }
  },
  box: {
    display: "table-cell",
    verticalAlign: " top",
    borderBottom: " 1px solid #ddd",
    padding: "15px"
  },
  sidebar: {
    minHeight: "70vh",
    backgroundColor: "#f5f5f5"
  },
  boxHeader: {
    fontWeight: "700",
    backgroundColor: "#D3D3D3",
    display: "table-row"
  },
  hideElement: {
    display: "none"
  },
  pr: {
    position: "relative"
  },
  closeButtonSetting: {
    position: "absolute",
    top: " 10px",
    right: "30px"
  },
  select: {
    position: " relative",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #9e9e9e",
    outline: " none",
    height: " 3rem",
    lineHeight: "3rem",
    width: "100%",
    fontSize: "16px",
    margin: "0 0 8px 0",
    padding: "0",
    display: " block",
    userSelect: "none",
    zIndex: " 1"
  },
  option: {
    clear: "both",
    color: " rgba(0,0,0,0.87)",
    cursor: "pointer",
    minHeight: "50px",
    lineHeight: "1.5rem",
    width: "100%",
    textAlign: "left"
  },
  positionCenter: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none"
  }
};
const yesNo = [
  { value: true, label: "Accept" },
  { value: false, label: "Reject" }
];

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: {},
      accepted: true,
      rejection_reason: "",
      open: false,
      openkey: "",
      meetQuality: "",
      meetSpec: "",
      rfqTime: "",
      onTime: "",
      vendorRating: {}
    };
  }
  hideAlert() {
    this.setState({ open: false });
  }
  handleChangeSelect = e => {
    this.setState({
      accepted: e.target.value
    });
    this.forceUpdate();
  };
  handleChange = e => {
    this.setState({
      rejection_reason: e.target.value
    });
  };
  submitAccepted = () => {
    const vendorEmail = this.props.quotes.map(prop => {
      return prop.vendor.general_info.contact_email;
    });
    const data = {};
    data.accepted = this.state.accepted;
    data.id = this.props.quotes[0]._id;
    /*     data.meetDefineSpecification = this.state.meetDefineSpecification;
    data.meetQuality = this.state.meetQuality;
    data.meetRfqResponseTime = this.state.meetRfqResponseTime;
    data.onTimeDelivery = this.state.onTimeDelivery;
    data.adaptiveness = this.state.adaptiveness; */
    data.rejection_reason = this.state.rejection_reason;
    data.vendorEmail = vendorEmail;
    rfqActions.submitAcceptQuote(this.props.user.token, data, result => {
      if (result) {
        alert("Quote updated");
      }
    });
  };

  rejectionInputField = val => {
    if (val == "false") {
      return (
        <CustomInput
          labelText="Rejection Reason"
          id="rejection_reason"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: e => this.handleChange(e),
            value: this.state.data.rejection_reason
          }}
        />
      );
    }
  };

  showQuoteDetails = key => {
    this.props.quotes.map((prop, k) => {
      if (key == k) {
        this.setState({
          open: true,
          openkey: key
        });
      }
    });
    /*   vendorActions.getVendorEvaluation(this.props.user.token, this.props.quotes[0].vendor._id, (result)=>{
      this.setState({vendorRating: result});
    }) */
  };

  /*  componentDidUpdate(prevProps) {
    if (this.props.quotes.length !== prevProps.quotes.length) {
      console.log(this.props.quotes);
    }
  } */

  render() {
    const { classes } = this.props;
    let mappedData = this.props.quotes.map((prop, key) => {
      const dt = new Date(prop.created);
      const status = Status.getStatus(prop.status);
      let tableBody = "";
      tableBody = prop.lineitems.map((prop, k) => {
        const uom = Uom.getUom(prop.uom);
        let d = prop.availableDate ? new Date(prop.availableDate) : new Date();
        return (
          <TableRow key={k}>
            <TableCell className={classes.td}>
              {prop.description ? prop.description : prop.itemdescription}
            </TableCell>
            <TableCell className={classes.td}>{prop.quantity}</TableCell>
            <TableCell className={classes.td}>{uom.name}</TableCell>
            <TableCell className={classes.td}>{prop.price}</TableCell>
            <TableCell className={classes.td}>
              {prop.availability === true
                ? "In Stock"
                : "Out of Stock till - " + d.toISOString().split("T")[0]}
            </TableCell>
          </TableRow>
        );
      });
      return [
        prop.no,
        prop.vendor ? prop.vendor.general_info.company_name : "",
        dt.toISOString().split("T")[0],
        status,
        prop.quoteType === "contract" ? (
          " "
        ) : (
          <Button
            color="yellowgreen"
            onClick={() => {
              this.showQuoteDetails(key);
            }}
          >
            View
          </Button>
        ),
        this.state.openkey == key ? (
          <Modal className={this.props.classes.pr} open={this.state.open}>
            {prop.lineitems.length > 0 ? (
              <div className={classes.positionCenter}>
                <Card>
                  <CardHeader>
                    <h3>
                      Quote for
                      {prop.vendor ? prop.vendor.general_info.company_name : ""}
                    </h3>
                    <Close
                      onClick={() => this.hideAlert()}
                      className={classes.closeButtonSetting}
                    />
                  </CardHeader>
                  <CardBody>
                    <TableCore className={classes.table}>
                      <TableHead
                        className={classes.tableHeaderColor}
                        style={{
                          marginTop: "10px",
                          color: "blue",
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
                            style={{ color: "blue" }}
                          >
                            Description
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "blue", width: "70px" }}
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
                            style={{ color: "blue" }}
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
                            style={{ color: "blue" }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            className={
                              classes.tableCell +
                              " " +
                              classes.tableHeadCell +
                              " " +
                              classes.td
                            }
                            style={{ color: "blue" }}
                          >
                            Is Available
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{tableBody}</TableBody>
                    </TableCore>
                    <br />
                    <Grid container>
                      <GridItem xs={12} sm={3} md={3}>
                        <label>Accept or Reject</label>
                        <select
                          id="accepted"
                          name="accepted"
                          required
                          labelText="Accept / Reject"
                          className={this.props.classes.select}
                          onChange={this.handleChangeSelect}
                        >
                          {yesNo.map(option => (
                            <option
                              value={option.value}
                              key={option.value}
                              className={this.props.classes.option}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </GridItem>
                      <GridItem xs={12} sm={9} md={9}>
                        {this.rejectionInputField(this.state.accepted)}
                      </GridItem>
                    </Grid>
                  </CardBody>
                  <CardFooter>
                    <Button color="yellowgreen" onClick={this.submitAccepted}>
                      submit
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              ""
            )}
          </Modal>
        ) : (
          ""
        )
      ];
    });
    return (
      <div>
        <div>
          <ul className={classes.ulStyle}>
            <li className={classes.liStyle}>
              Requestor: <br />
              <span className={classes.ap}>
                {this.props.pr.requestor
                  ? this.props.pr.requestor.firstname +
                    " " +
                    this.props.pr.requestor.lastname
                  : " "}
              </span>
            </li>
            <li className={classes.liStyle}>
              Requestion No: <br />
              <span className={classes.ap}>{this.props.pr.requisitionno}</span>
            </li>
            <li className={classes.liStyle}>
              Date Needed: <br />
              <span className={classes.ap}>{this.props.pr.dateneeded}</span>
            </li>
            <li className={classes.liStyle}>
              Charge To: <br />
              <span className={classes.ap}> {this.props.pr.chargeto}</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.ulStyle}>
            <li className={classes.liStyle}>
              Department: <br />
              <span className={classes.ap}>
                {this.props.pr.department.code}
              </span>
            </li>
            <li className={classes.liStyle}>
              Delivery Mode: <br />
              <span className={classes.ap}>{this.props.pr.shipvia}</span>
            </li>
            <li className={classes.liStyle}>
              Status:
              <br />
              <span className={classes.ap}>
                {Status.getStatus(this.props.pr.status)}
              </span>
            </li>
            <li className={classes.liStyle}>
            Purchase Type:
              <br />
              <span className={classes.ap}>
                {this.props.pr.purchaseType}
              </span>
            </li>
          </ul>
        </div>
        <div className={classes.space1} />
        <h3>RFQ for this PR</h3>
        <div className={classes.shadow}>
          <Table
            tableHead={["#", "Vendor", "Created", "Status", ""]}
            tableData={mappedData}
            customCellClasses={[classes.center, classes.right, classes.right]}
            customClassesForCells={[0, 4, 5]}
            customHeadCellClasses={[
              classes.center,
              classes.right,
              classes.right
            ]}
            customHeadClassesForCells={[0, 4, 5]}
          />
        </div>
      </div>
    );
  }
}

Quote.propTypes = {
  data: PropTypes.object,
  quotes: PropTypes.object
};

Quote.defaultProps = {
  quotes: []
};
function mapStateToProps(state) {
  return {
    loader: state.loader,
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Quote));
