import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import * as genericActions from "../../actions/generic.js";
import { Redirect } from "react-router";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
class ListCrud extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { data: {} };
  }

  componentDidMount() {
    genericActions.fetchAll(
      this.props.match.params.type,
      this.props.user.token,
      items => {
        this.setState({ data: items });
      }
    );
  }

  parseJsonTotableData(responseJson) {
    let datas = [];
    responseJson.map(row => {
      let arry = [];
      arry.push(row._id, row.name);
      datas.push(arry);
    });
    const dataTable = {
      headerRow: ["#", "Name", "Actions"],
      footerRow: ["#", "Name", "Actions"],
      dataRows: datas
    };
    return dataTable;
  }

  render() {
    const { classes } = this.props;
    let data = { dataRows: [] };
    if (this.state.data.length > 0) {
      data = this.parseJsonTotableData(this.state.data);
    }

    let mappedData = data.dataRows.map((prop, key) => {
      return {
        id: key,
        name: prop[1],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find(o => o.id === key);
                this.setState({ redirectTo: data.dataRows[[obj.id]][0] });
              }}
              color="warning"
              className="edit"
            >
              {this.props.match.params.type == "departments" ? (
                <Link to={"/departments/edit/" + prop[0]}>
                  <Dvr />
                </Link>
              ) : (
                <Link to={"/crud/edit/"+this.props.match.params.type +"/" + prop[0]}>edit</Link>
              )}
            </Button>
            <Button
              justIcon
              round
              simple
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                ) {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (i === key) {
                      genericActions.deleteItem(
                        this.props.match.params.type,
                        this.props.user.token,
                        o._id
                      );
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }
              }}
              color="danger"
              className="edit"
            >
              <Close />
            </Button>
           
            {this.props.match.params.type == "roles" ? (
              <Link to={"/roles/permission/" + prop[0]}>Permission</Link>
            ) : (
              ""
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
    } else {
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  {this.props.match.params.type}
                </h4>
                <Link to={"/crud/add/" + this.props.match.params.type}>
                  Create New
                </Link>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={mappedData}
                  filterable
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name"
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

ListCrud.propTypes = {
  data: PropTypes.object
};

ListCrud.defaultProps = {
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
)(withStyles(styles)(ListCrud));
