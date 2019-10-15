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
import * as riActions from "../../actions/receivingandinspection";
import { Link } from "react-router-dom";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
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
 
  }

  state = {
    data: [],
    workCompletions: [],
    recievedItems: []
  };

// checkSetState = (data)=> {
//   if(data.every(x => x == true)){
//     return "completed"
//   }
//   else if(data.some(x => x == true)) {
//     return "in progress"
//   }
//   else {
//    return "pending"
// }
// }


  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      //vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }

 checKStatus = (poID) => {
    if(this.state.workCompletions && this.state.recievedItems){ 
      const data = [this.state.workCompletions, this.state.recievedItems];
      let products = data[1].find(x => x.purchaseOrder === poID) || "";
      let services = data[0].find(x => x.purchaseOrder === poID) || "";
      let arr;
      if(products._id && services._id) {
        arr = [services.work_completion.inspected, services.work_completion.reviewed, services.work_completion.approved];
        if(arr.every(x => x == true)){
          return "completed"
        }
        else if(arr.some(x => x == true)) {
          return "in progress"
        }
        else {
         return "pending"
      }
      }
      else if(!products._id && services._id) {
        arr = [services.work_completion.inspected, services.work_completion.reviewed, services.work_completion.approved];
        if(arr.every(x => x == true)){
          return "completed"
        }
        else if(arr.some(x => x == true)) {
          return "in progress"
        }
        else {
         return "pending"
      }
      }

      else if(products._id && !services._id) {
        arr = [products.inspection_stage.inspected, products.inspection_stage.reviewed, products.inspection_stage.approved];
        if(arr.every(x => x == true)){
          return "completed"
        }
        else if(arr.some(x => x == true)) {
          return "in progress"
        }
        else {
         return "pending"
      }
      }
   else {
     return "pending"
   }
  }
  }


  processJson = (responseJson) => {
    return responseJson.map((prop) => {
      let date = new Date(prop.created);
      let types = prop.types.map(v => v.toLowerCase());
      return {
        id: prop.no,
        vendor: prop.vendor.general_info.company_name,
        order_date: date.toISOString().split("T")[0],
        completion_rate: this.checKStatus(prop._id),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {types.includes("product") ? (
              <Link to={"/receiving/" + prop._id}>
                Receiving and Inspection Form
              </Link>
            ) : (
              <Link to={"/work/completion/" + prop._id}>
                Work Completion Certificate
              </Link>
            )}
          </div>
        )
      };
    });
  }

  componentDidMount() {
    poActions.fetchAllPurchaseOrder(this.props.user.token, docs => {
      this.setState({ data: docs });
    });
    riActions.fetchAllRecievedItems(this.props.user.token, docs => {
      this.setState({ recievedItems: docs });
    });
    riActions.fetchAllWorkCompletion(this.props.user.token, docs => {
      this.setState({ workCompletions: docs });
    });
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
                  Receiving and Inspection 
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
                      Header: "Order Date",
                      accessor: "order_date"
                    },
                    {
                      Header: "Completion Rate",
                      accessor: "completion_rate"
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
