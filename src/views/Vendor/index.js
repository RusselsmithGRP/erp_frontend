import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as vendorActions from "../../actions/vendor";
import { Redirect } from "react-router";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { connect } from "react-redux";

const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  positionCenter: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none"
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
  }
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    /// this.handler = this.handler.bind(this);
    this.state = {
      redirectTo: false,
      data: [],
      status: "",
      showMessageBox: false,
      open: false
    };
  }
  hideAlert() {
    this.setState({ open: false });
  }
  componentDidMount() {
    this.props.match.params.type
      ? vendorActions.findAllVendors(this.props, this.props.match.params.type)
      : vendorActions.findAllVendors(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }

  filterVendor = e => {
    vendorActions.findAllVendors(this.props, e.target.value);
    this.setState({ status: e.target.value });
  };

  processJson(responseJson) {
    let datas = [];
    responseJson.map(row => {
      if (typeof row.general_info !== "undefined") {
        let arry = [];
        arry.push(
          row._id,
          row.general_info.company_name,
          row.general_info.contact_name,
          row.general_info.contact_phone,
          row.general_info.contact_email,
          row.status,
          row.classes
        );
        datas.push(arry);
      }
    });
    const dataTable = {
      headerRow: [
        "Class",
        "Company Name",
        "Contact Person",
        "Contact Telephone",
        "Contact Email",
        "Actions"
      ],
      footerRow: [
        "Class",
        "Company Name",
        "Contact Person",
        "Contact Telephone",
        "Contact Email",
        "Actions"
      ],
      dataRows: datas
    };
    return dataTable;
  }

  render() {
    const { classes } = this.props;
    let vendors = { dataRows: [] };

    if (this.state.data.length == 0 && this.props.data.length > 0) {
      vendors = this.processJson(this.props.data);
    } else if (this.state.data.length > 0) {
      vendors = this.processJson(this.state.data);
    }
    let data = vendors.dataRows.map((prop, key) => {
      return {
        id: key,
        class: prop[6],
        companyname: prop[1],
        contactperson: prop[2],
        contacttelephone: prop[3],
        contactemail: prop[4],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            {/* <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = this.state.data.find(o => o.id === key);

                  }}
                  color="info"
                  className="like"
                >
                  <Approve />
                </Button>{""} */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find(o => o.id === key);
                this.setState({ redirectTo: vendors.dataRows[[obj.id]][0] });
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>
            {/* use this button to remove the data row */}

            {this.props.user.role != "procurement" ? (
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  if (window.confirm("Delete this Vendor?")) {
                    let datum = this.props.data[key];
                    let data = this.props.data;
                    //vendorActions.deleteVendor(this.props, datum.user);
                    delete data[key];
                    this.setState({ data: data });
                  }
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>
            ) : (
              " "
            )}
          </div>
        )
      };
    });
    if (this.props.loader.loading) {
      return (
        <div>
          <Grid container>
            <GridItem xs={12} sm={6} md={3} style={{ margin: "20% auto" }}>
              <CircularProgress
                className={classes.progress}
                size={70}
                style={{ color: purple[500] }}
                thickness={10}
              />
            </GridItem>
          </Grid>
        </div>
      );
    } else if (this.state.redirectTo) {
      return <Redirect to={"/vendor/view/" + this.state.redirectTo} />;
    } else {
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Vendors</h4>
              </CardHeader>
              <CardBody>
                {this.props.user.role == "iac" ||
                this.props.user.role == "admin" ? (
                  <Card>
                    <CardBody>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="simple-select"
                          className={classes.selectLabel}
                        >
                          Filter by Status
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={this.state.status}
                          onChange={this.filterVendor}
                          inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                          }}
                        >
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Status
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="approved"
                          >
                            Approved
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="new"
                          >
                            Just Registered
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="unapproved"
                          >
                            Pending Approval
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="blacklisted"
                          >
                            Blacklisted
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        additionalclass={classes.removeDivPadding}
                      >
                        <Button
                          color="primary"
                          onClick={() => {
                            this.setState({ open: true });
                          }}
                        >
                          Click to Send Message
                        </Button>
                      </GridItem>
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}

                <ReactTable
                  data={data}
                  filterable
                  columns={[
                    {
                      Header: "Class",
                      accessor: "class"
                    },
                    {
                      Header: "Company Name",
                      accessor: "companyname"
                    },
                    {
                      Header: "Contact Person",
                      accessor: "contactperson"
                    },
                    {
                      Header: "Contact Telephone",
                      accessor: "contacttelephone"
                    },
                    {
                      Header: "Contact Email",
                      accessor: "contactemail"
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
                <Modal
                  className={this.props.classes.pr}
                  open={this.state.open}
                  style={{ width: "80%" }}
                >
                  <div className={classes.positionCenter}>
                    <Card>
                      <CardHeader>
                        <h3>Complete form to send message</h3>
                        <Close
                          onClick={() => this.hideAlert()}
                          className={classes.closeButtonSetting}
                        />
                      </CardHeader>
                      <CardBody>
                        <Grid container>
                          <GridItem xs={12} sm={12} md={12}>
                            <textarea onChange={{}} />
                          </GridItem>
                        </Grid>
                      </CardBody>
                    </Card>
                  </div>
                </Modal>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }
  }
}

Index.propTypes = {
  vendorActions: PropTypes.object,
  data: PropTypes.array
};

Index.defaultProps = {
  data: { dataRows: {} }
};
function mapStateToProps(state) {
  return {
    data: state.vendors,
    loader: state.loader,
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Index));
