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
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as poActions from "../../actions/purchaseorder";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import * as Status from "utility/Status";
import { connect } from "react-redux";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      doc: {}
    };
  }

  componentDidMount() {
    poActions.fetchAllPurchaseOrder(this.props.user.token, docs => {
      this.setState({ data: docs });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      //vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }

  deletePO = id => {
    if (window.confirm("Do you really want to delete?")) {
      poActions.deletePO(this.props.user.token, id, doc => {
        this.setState({
          doc
        });
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  /**
   * @author Idowu
   * @summary Changed processJson to arrow function
   * @summary Created a default empty string for `prop.vendor.general_info.company_name`
   * @summary which was throwing an error on my browser
   */
  processJson = responseJson => {
    return responseJson.map((prop, key) => {
      let date = new Date(prop.created);
      return {
        id: prop.no,
        vendor: prop.vendor ? prop.vendor.general_info.company_name : " ",
        order_date: date.toISOString().split("T")[0],
        credit_terms: prop.credit_terms,
        status: Status.getStatus(prop.status),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            <Link to={"/order/view/" + prop._id}>View</Link>
            {this.props.user.role === "admin" ? (
              <IconButton
                color={"secondary"}
                aria-label="delete"
                style={{ marginLeft: "10px", width: "30px", height: "30px" }}
                onClick={() => this.deletePO(prop._id)}
              >
                <DeleteIcon style={{ fontSize: "20px" }} />
              </IconButton>
            ) : (
              ""
            )}
          </div>
        )
      };
    });
  };

  render() {
    console.log(this.state.data);
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
      let mappedData = [];
      if (this.state.data.length > 0) {
        mappedData = this.processJson(this.state.data);
      }
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>Purchase Order</h3>
              </CardHeader>
              <CardBody>
                <div>
                  <Button color="twitter" to="/order/add" component={Link}>
                    New Purchase Order
                  </Button>
                </div>
                <ReactTable
                  data={mappedData}
                  filterable
                  columns={[
                    {
                      Header: "#",
                      accessor: "id"
                    },
                    {
                      Header: "Vendor",
                      accessor: "vendor"
                    },
                    {
                      Header: "Order Date",
                      accessor: "order_date"
                    },
                    {
                      Header: "Credit Terms",
                      accessor: "credit_terms"
                    },
                    {
                      Header: "Status",
                      accessor: "status"
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
