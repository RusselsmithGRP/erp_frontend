import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as poActions from "../../actions/purchaseorder";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import * as Status from "utility/Status";
import { connect } from "react-redux";
import * as riActions from "../../actions/receivingandinspection";


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
class RejectionLogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      vendors: [],
      docs: []
    };
  }

  getVendorName(poID) {
  poActions.fetchPurchaseOrderById(
      this.props.user.token,
      poID,
      (doc) => {
        console.log("doc")
      })  
    }

  getOrderedSum(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum +=  parseInt(arr[i].orderedQuantity);
    }
    return sum;
  }

  getrejectedSum(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum +=  parseInt(arr[i].rejectedQuantity);
    }
    return sum;
  }

  componentDidMount() {
    riActions.fetchAllRejectionLogs(this.props.user.token, docs => {
      this.setState({ data: docs });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      //vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }



  processJson(responseJson) {
    return responseJson.map((prop, key) => {
      let date = new Date(prop.created);
      let vendor_name = this.getVendorName(prop.purchaseOrder)
      return {
        id: prop.purchaseOrder,
        vendor: "Robson Nig Ltd" + vendor_name,
        date: date.toISOString().split("T")[0],
        no_purchased: this.getOrderedSum(prop.productsData),
        no_rejected: this.getrejectedSum(prop.productsData),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
              <Link to={"/rejection/log/" + prop._id}>
                View Log
              </Link>
          
          </div>
        )
      };
    });
  }

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
                <h3 className={classes.cardIconTitle}>
                Rejection Logs
                </h3>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={mappedData}
                  filterable
                  columns={[
                    {
                      Header: "PO No",
                      accessor: "id"
                    },
                    {
                      Header: "Vendor",
                      accessor: "vendor"
                    },
                    {
                      Header: "Date",
                      accessor: "date"
                    },
                    {
                      Header: "No of Items Purchased",
                      accessor: "no_purchased"
                    },
                    {
                        Header: "No of Items Rejected",
                        accessor: "no_rejected"
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

RejectionLogIndex.propTypes = {
  vendorActions: PropTypes.object,
  data: PropTypes.object
};

RejectionLogIndex.defaultProps = {
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
)(withStyles(styles)(RejectionLogIndex));