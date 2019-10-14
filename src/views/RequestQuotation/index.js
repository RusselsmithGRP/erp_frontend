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
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Funnel from "@material-ui/icons/FilterList";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as rfqActions from "../../actions/requestforquotation";
import * as prActions from "../../actions/purchaserequisition";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import Language from "@material-ui/icons/Language";
import AddComponent from "./add";
import QuotesComponent from "./quotes";
import { connect } from "react-redux";

const styles = {
  ...sweetAlertStyle,
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
    "&:focus": {
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
const sortParams = [
  { value: "0", label: "Date" },
  { value: "1", label: "Department" },
  { value: "2", label: "RFQ" }
];
class Index extends React.Component {
  constructor(props) {
    super(props);
    // this.handler = this.handler.bind(this);
    this.state = {
      data: [],
      multipleSelect: [],
      showForm: false,
      submitRfq: true,
      sortByType: "default"
    };
  }

  handler(type, id) {
    console.log(type, id);
  }

  componentDidMount() {
    prActions.fetchAllRequistion(this.props.user.token, docs => {
      this.setState({ data: docs });
    });
  }

  fetchQuotes = pr => {
    this.setState({ selectedPr: pr, showRfq: true });
    rfqActions.fetchQuotesByRequisitionId(
      this.props.user.token,
      pr._id,
      quotes => {
        this.setState({ quotes: quotes, pr: pr });
      }
    );
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
    this.fetchQuotes(this.state.selectedPr);
  };

  addActiveClass = name => {
    this.setState({
      active: name
    });
  };

  sortBy = type => {
    switch (type) {
      case "date": {
        const mappedData = []
          .concat(this.state.data)
          .sort((a, b) => a.created > b.created)
          .map((prop, key) => {
            const date = new Date(prop.created);
            return (
              <a
                className={
                  this.props.classes.boxRow +
                  "  " +
                  (this.state.active === key ? "active" : "")
                }
                onClick={() => this.fetchQuotes(prop)}
                key={key}
              >
                <div className={this.props.classes.box}>
                  {prop.requisitionno}
                </div>
                <div className={this.props.classes.box}>
                  {date.toISOString().split("T")[0]}
                </div>
              </a>
            );
          });

        return mappedData;
      }
      case "department": {
        const mappedData = []
          .concat(this.state.data)
          .sort((a, b) => a.department > b.department)
          .map((prop, key) => {
            const date = new Date(prop.created);
            return (
              <a
                className={
                  this.props.classes.boxRow +
                  "  " +
                  (this.state.active === key ? "active" : "")
                }
                onClick={() => this.fetchQuotes(prop)}
                key={key}
              >
                <div className={this.props.classes.box}>
                  {prop.requisitionno}
                </div>
                <div className={this.props.classes.box}>
                  {date.toISOString().split("T")[0]}
                </div>
              </a>
            );
          });
        return mappedData;
      }
      case "rfq": {
        const mappedData = []
          .concat(this.state.data)
          .sort((a, b) => a.requisitionno > b.requisitionno)
          .map((prop, key) => {
            const date = new Date(prop.created);
            return (
              <a
                className={
                  this.props.classes.boxRow +
                  "  " +
                  (this.state.active === key ? "active" : "")
                }
                onClick={() => this.fetchQuotes(prop)}
                key={key}
              >
                <div className={this.props.classes.box}>
                  {prop.requisitionno}
                </div>
                <div className={this.props.classes.box}>
                  {date.toISOString().split("T")[0]}
                </div>
              </a>
            );
          });
        return mappedData;
      }
      case "default": {
        const mappedData = this.state.data.map((prop, key) => {
          const date = new Date(prop.created);
          return (
            <a
              className={
                this.props.classes.boxRow +
                "  " +
                (this.state.active === key ? "active" : "")
              }
              onClick={() => {
                this.fetchQuotes(prop);
                this.addActiveClass(key);
              }}
              key={key}
            >
              <div className={this.props.classes.box}>{prop.requisitionno}</div>
              <div className={this.props.classes.box}>
                {date.toISOString().split("T")[0]}
              </div>
            </a>
          );
        });
        return mappedData;
      }
    }
  };

  getValue(e) {
    const type = e.target.value;
    switch (type) {
      case "0": {
        this.setState({ sortByType: "date" });
        break;
      }
      case "1": {
        this.setState({ sortByType: "department" });
        break;
      }
      case "2": {
        this.setState({ sortByType: "rfq" });
        break;
      }
    }
  }

  showQuoteForm = () => {
    this.setState({
      alert: (
        <SweetAlert
          style={{
            display: "block",
            marginTop: "-30%",
            marginLeft: "-30%",
            width: "65%"
          }}
          title="Request For Quote"
          onConfirm={() => this.hideAlert()}
          confirmBtnText="Click to Close"
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.info
          }
        >
          <AddComponent
            pr={this.state.selectedPr}
            submit={this.state.submitRfq}
          />
        </SweetAlert>
      )
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      //vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }

  processJson(responseJson) {
    let datas = [];
    responseJson.map(row => {
      datas.push(row);
    });
    return datas;
  }

  render() {
    const { classes } = this.props;
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
    } else {
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="success" icon>
                <CardIcon color="success">
                  <Language />
                </CardIcon>
                <h2 className={classes.cardIconTitle}>Request for Quotes</h2>
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
                          <CustomSelect
                            labelText="Sort By"
                            name="sortby"
                            id="sortby"
                            onChange={e => {
                              this.getValue(e);
                            }}
                            formControlProps={{
                              style: {
                                width: "100%",
                                padding: "0",
                                margin: "0"
                              }
                            }}
                            value={this.state.sortByType}
                            inputProps={{ margin: "normal", id: "shipto" }}
                            style={{
                              marginTop: "-3px",
                              borderBottomWidth: " 1px"
                            }}
                          >
                            {sortParams.map((option, i) => (
                              <MenuItem key={i} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <span style={{fontSize: "11px", color: "red", fontStyle:"oblique"}}>Please select a Purchase requisition before requesting for Qoute</span>

                    <div className={classes.sidebar}>
                      <div className={classes.boxer}>
                        <div className={classes.boxHeader}>
                          <div className={classes.box}>My RFQ</div>
                          <div className={classes.box}>DATE</div>
                        </div>
                        {this.sortBy(this.state.sortByType)}
                      </div>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={8}>
                    <div>
                      <Button
                        color="twitter"
                        size="sm"
                        onClick={this.showQuoteForm}
                        disabled={(!this.state.selectedPr)? true: false}
                      >
                        Request For Quote
                      </Button>
                    </div>
                    {this.state.alert}
                    {this.state.showRfq ? (
                      <QuotesComponent
                        pr={this.state.selectedPr}
                        quotes={this.state.quotes}
                      />
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
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Index));
