import React from "react";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Funnel from "@material-ui/icons/FilterList";
import DatePicker from "react-datepicker";

import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as rfqActions from "../../actions/requestforquotation";
import * as vendorActions from "../../actions/vendor";
import * as Status from "utility/Status";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Language from "@material-ui/icons/Language";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import { connect } from "react-redux";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle.jsx";
import * as Uom from "utility/Uom";
import moment from "moment";
import Notification from "views/Notifications/Index.jsx";
import { CURRENCIES } from "../../utility/Currencies.js";

const styles = {
  ...generalStyle,
  ...tableStyle,
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
  }
};

const availability = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];
const creditTerms = [
  { value: "0", label: "Advance" },
  { value: "1", label: "30 days" },
  { value: "2", label: "45 days" },
  { value: "3", label: "60 days" }
];
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        items: {},
        creditterms: "",
        currency: "₦",
        availability: true,
        availableDate: ""
      },
      vendor: {},
      multipleSelect: [],
      showForm: false,
      submitRfq: true,
      quote: { lineitems: [] },
      docs: [],
      startDate: moment(),
      expenseheaders: [],
      showNotification: false
    };
  }

  /**
   * @author Idowu
   * @summary Changed componentWillMount to UNSAFE_componentWillMount
   */
  UNSAFE_componentWillMount() {
    console.log(this.props.user._id, "before")
    const userId = this.props.user._id;
    // vendorActions.findVendorByUserId(this.props, userId);
    vendorActions.findVendorById(this.props, vendorId, (vendor) => {
      this.setState({vendor})
    });
  }

  componentDidMount() {
    rfqActions.fetchVendorsQuotes(
      this.props.user.token,
      this.state.vendor._id,
      docs => {
        this.setState({ docs: docs });
      }
    );
  }

  fetchQuotes(quote) {
    let items = [];
    let data = this.state.data;
    quote.lineitems.map((it, i) => {
      var item = {};
      item = {
        price: "",
        currency: "",
        availability: true,
        availableDate: "",
        description: it.itemdescription,
        uom: it.uom,
        category: it.category,
        quantity: it.quantity
      };
      items.push(item);
    });
    data.items = items;
    this.setState({ quote: quote, showRfq: true, data });
  }

  toggleCalendar = e => {
    e && e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  submitQuote = () => {
    let data = this.state.data;
    rfqActions.submitVendorQuote(
      this.props.user.token,
      this.state.quote._id,
      data,
      docs => {
        if (docs) {
          this.setState({
            showNotification: true
          });
        }
      }
    );
  };

  handleSelect = event => {
    let data = this.state.data;
    data[[event.target.name]] = event.target.value;
    this.setState({
      data: data
    });
  };

  setItem = i => event => {
    let items = this.state.data.items;
    if (event._d) {
      this.toggleCalendar();
      this.setState({ startDate: event });
      items[[i]]["availableDate"] = event.format("MM/DD/YYYY");
    } else {
      items[[i]][[event.target.name]] = event.target.value;
    }
    let data = this.state.data;
    data.items = items;
    this.setState({
      data: data
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      //vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }

  render() {
   console.log(this.props, "vendor");
    const { classes, tableHeaderColor } = this.props;
    let mappedData = this.state.docs.map((prop, key) => {
      let date = new Date(prop.created);
      return (
        <div className={classes.boxRow} onClick={() => this.fetchQuotes(prop)}>
          <div className={classes.box}>{prop.no}</div>
          <div className={classes.box}>{date.toISOString().split("T")[0]}</div>
        </div>
      );
    });

    const tableData = this.state.quote.lineitems.map((prop, key) => {
      const uom = Uom.getUom(prop.uom);
      return (
        <TableRow key={key}>
          <TableCell className={classes.td}>
            {prop.description ? prop.description : prop.itemdescription}
          </TableCell>
          <TableCell className={classes.td}>{prop.quantity}</TableCell>
          <TableCell className={classes.td}>{uom.name}</TableCell>
          <TableCell className={classes.td}>
            <CustomInput
              name="price"
              id="price"
              type="number"
              required
              formControlProps={{
                style: { width: "60px", padding: "0", margin: "0" },
                name: "unit"
              }}
              inputProps={{
                name: "price",
                onChange: this.setItem(key),
                style: { fontSize: "11px" },
                value: this.state.data.items[key]["price"]
              }}
            />
          </TableCell>
          <TableCell className={classes.td}>
            <CustomSelect
              id="currency"
              name="currency"
              options={this.state.data.currency}
              required
              formControlProps={{
                style: { padding: "0", margin: "0", width: "5px" }
              }}
              onChange={this.setItem(key)}
              inputProps={{
                margin: "normal",
                style: { fontSize: "11px" },
                value: this.state.data.items[key]["currency"]
              }}
              style={{
                marginTop: "-3px",
                borderBottomWidth: " 1px"
              }}
            >
              {CURRENCIES.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </TableCell>
          <TableCell className={classes.td}>
            {this.state.data.items[key]["availability"] == true ? (
              <CustomSelect
                id="availability"
                name="availability"
                required
                formControlProps={{
                  style: { padding: "0", margin: "0", width: "auto" }
                }}
                onChange={this.setItem(key)}
                inputProps={{
                  margin: "normal",
                  value: this.state.data.items[key]["availability"]
                }}
                style={{
                  marginTop: "-3px",
                  borderBottomWidth: " 1px"
                }}
              >
                {availability.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
            ) : (
              <span>
                <CustomInput
                  labelText="Date Available"
                  name="availabilityDate"
                  required
                  formControlProps={{
                    fullWidth: true
                  }}
                  onFocus={this.toggleCalendar}
                  inputProps={{
                    value: this.state.startDate.format("MM/DD/YYYY"),
                    onFocus: this.toggleCalendar
                  }}
                />
                {this.state.isOpen && (
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.setItem(key)}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    withPortal
                    inline
                  />
                )}
              </span>
            )}
          </TableCell>
        </TableRow>
      );
    });

    return (
      <GridContainer>
        {this.state.showNotification == true ? (
          <Notification error={false} message={"Quote submitted succesfully"} />
        ) : (
          ""
        )}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Language />
              </CardIcon>
              <h2 className={classes.cardIconTitle}>My Quotes</h2>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={4} md={4}>
                  <GridContainer justify="space-between">
                    <GridItem xs={3}>
                      <Funnel style={{ marginTop: "25px" }} />
                    </GridItem>

                    <GridItem xs={9} style={{ marginBottom: "13px" }}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="multiple-select"
                          className={classes.selectLabel}
                        >
                          Sort By
                        </InputLabel>
                        <Select
                          multiple
                          value={this.state.multipleSelect}
                          onChange={this.handleMultiple}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "multipleSelect",
                            id: "multiple-select"
                          }}
                        >
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Department
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                          >
                            Date
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="4"
                          >
                            RFQ
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>

                  <div className={classes.sidebar}>
                    <div className={classes.boxer}>
                      <div className={classes.boxHeader}>
                        <div className={classes.box}>RFQ</div>
                        <div className={classes.box}>DATE</div>
                      </div>
                      {mappedData}
                    </div>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={8} md={8}>
                  {this.state.quote.lineitems.length > 0 ? (
                    <div
                      className={classes.tableResponsive}
                      style={{ overflowX: "scroll" }}
                    >
                      <Card style={{ width: "750px" }}>
                        <CardBody>
                          <Table className={classes.table}>
                            <TableHead
                              className={
                                classes[tableHeaderColor + "TableHeader"]
                              }
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
                                  style={{ color: "blue" }}
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
                                  Currency
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
                                  Availability
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>{tableData}</TableBody>
                          </Table>
                        </CardBody>
                        <CardFooter>
                          <Grid container>
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
                                onChange={this.handleSelect}
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
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </CustomSelect>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <Button
                                color="yellowgreen"
                                onClick={this.submitQuote}
                              >
                                Submit
                              </Button>
                            </GridItem>
                          </Grid>
                        </CardFooter>
                      </Card>
                    </div>
                  ) : (
                    ""
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Index.propTypes = {
  vendorActions: PropTypes.object,
  data: PropTypes.object
};

Index.defaultProps = {
  data: { dataRows: {} }
};
function mapStateToProps(state) {
  return {
    loader: state.loader,
    user: state.auth.user,
    vendor: state.vendor
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Index));
