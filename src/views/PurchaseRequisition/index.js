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
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as prActions from "../../actions/purchaserequisition";
import { Redirect } from "react-router";
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
    this.handler = this.handler.bind(this);
    this.state = {
      data: []
    };
  }

  handler(type, id) {
    console.log(type, id);
  }

  /**
   * @author Idowu
   * @summary Modified prActions.fetchAllRequisition by returning docs
   * @summary then update the state within the `.then` call
   */
  componentDidMount() {
    prActions
      .fetchAllRequistion(this.props.user.token, docs => {
        // this.setState({ data: docs });
        // console.log(docs);
        return docs;
      })
      .then(data => {
        let newData = data.filter(doc => {
          if (doc.status === "011" && doc.purchaseType === "Open Market") {
            return;
          } else if (doc.status === "013") {
            return;
          } else {
            return doc;
          }
        });
        this.setState({ data: newData });
        console.log("newData:", newData);
        console.log(typeof newData);
        console.log("Data:", data);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      // vendorActions.findAllVendors(this.props, this.props.match.params.type);
    }
  }

  processJson(responseJson) {
    let datas = [];
    responseJson.map(row => {
      {
        {
          debugger;
        }
      }
      let arry = [];
      arry.push(
        row._id,
        row.requisitionno,
        row.requestor != null ? row.requestor.firstname : "",
        row.requestor != null ? row.requestor.lastname : "",
        row.department.name,
        row.status
      );
      datas.push(arry);
    });
    const dataTable = {
      headerRow: ["#", "Requestor Name", "Department", "Status", "Actions"],
      footerRow: ["#", "Requestor Name", "Department", "Status", "Actions"],
      dataRows: datas
    };
    return dataTable;
  }

  render() {
    console.log(this.state, "hello");
    // console.log(this.props.user);

    const { classes } = this.props;
    let prs = { dataRows: [] };
    if (this.state.data.length > 0) {
      prs = this.processJson(this.state.data);
    }

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
      let mappedData = prs.dataRows.map((prop, key) => {
        // console.log(prop[2], "", prop[3]);
        return {
          id: prop[1],
          requestor: prop[2] + " " + prop[3],
          department: prop[4],
          status: Status.getStatus(prop[5]),
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              <Link to={"/requisition/view/" + prop[0]}>View</Link>
            </div>
          )
        };
      });
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h3 className={classes.cardIconTitle}>
                  Purchase Requisition Records
                </h3>
              </CardHeader>
              <CardBody>
                <div>
                  <Button
                    color="twitter"
                    to="/requisition/add"
                    component={Link}
                  >
                    Add New Requisition
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
                      Header: "Requestor",
                      accessor: "requestor"
                    },
                    {
                      Header: "Department",
                      accessor: "department"
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
