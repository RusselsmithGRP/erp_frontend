import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import ContentPaste from "@material-ui/icons/ContentPaste";
import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import AccessAlarms  from "@material-ui/icons/AccessAlarms";
import Accessible from "@material-ui/icons/Accessible";
import Person from "@material-ui/icons/Person";
import DataUsage from "@material-ui/icons/DataUsage";
import Cancel from "@material-ui/icons/Cancel";
// core components
import GridItem from "../../../components/Grid/GridItem.jsx";
import ReactTable from "react-table";
import 'react-table/react-table.css'

import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import * as vendorActions from 'actions/vendor';
import {connect} from 'react-redux';

import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

class Staff extends React.Component {
  state = {
    value: 0
  };

  componentDidMount(){
    vendorActions.findAllVendors(this.props, "pending");
  }
  render() {
    const { classes } = this.props;
    let data = this.props.data.dataRows.map((prop, key) => {
      return {
        id: key,
        companyname: prop[1],
        contactperson: prop[2],
        contacttelephone: prop[3],
        contactemail: prop[4],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            <Button
              /* justIcon */
              round
              simple
              onClick={() => {
                let obj = data.find(o => o.id === key);
                this.setState({redirectTo:this.props.data.dataRows[[obj.id]][0]})
                }}
              color="warning"
              className="edit"
            >
               view
            </Button>{" "}
          </div>
        )
      };
    });
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <ContentPaste />
                </CardIcon>
                <p className={classes.cardCategory}><h1>36</h1></p>
                </CardHeader>
              <CardFooter stats>Pending Approvals</CardFooter>
            </Card>
          </GridItem>

		  <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="warning">
                  <Person />
                </CardIcon>
                <p className={classes.cardCategory}><h1>620</h1></p>
                </CardHeader>
              <CardFooter stats>Active Vendors</CardFooter>
            </Card>
          </GridItem>

		 <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="warning">
                  <Cancel />
                </CardIcon>
                <p className={classes.cardCategory}><h1>15</h1></p>
                </CardHeader>
              <CardFooter stats>Blacklisted Vendors</CardFooter>
            </Card>
          </GridItem>

		 <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="rose">
                  <DataUsage />
                </CardIcon>
                <p className={classes.cardCategory}><h1>87%</h1></p>
                </CardHeader>
              <CardFooter stats>Overall Vendor Performance</CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Warning />
		        </CardIcon>
                <p className={classes.cardCategory}><h1>20%</h1></p>
                </CardHeader>
              <CardFooter stats>Defect Rate</CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                 <AccessAlarms />
                </CardIcon>
               <p className={classes.cardCategory}><h1>85%</h1></p>
               </CardHeader>
              <CardFooter stats>On-time Supplies</CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Accessible />
                </CardIcon>
                <p className={classes.cardCategory}><h1>93%</h1></p>
                </CardHeader>
              <CardFooter stats>Supplier Availability</CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Pending Vendor Approvals</h4>
              </CardHeader>
              <CardBody>
              <ReactTable
                data={data}
                filterable={false}
                columns={[
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
                defaultPageSize={5}
                showPaginationTop={false}
                showPaginationBottom={false}
                className="-striped -highlight"
              />
              </CardBody>
		          <CardFooter>
                <Grid container justify="center">
                  <GridItem xs={12} sm={6} md={6} >
                    <Button color="gray">View All Pending Approvals</Button>
                  </GridItem>
		            </Grid>
              </CardFooter>
            </Card>
          </GridItem>

        </Grid>
      </div>
    );
  }
}
Staff.defaultProps = {
  data: {dataRows:[],headerRow:[],footerRow:[]}
}
function mapStateToProps(state) {
  return {
    data: state.vendor.data,
    loader: state.loader,
    user: state.auth.user,
  };
}


export default connect(
  mapStateToProps,
  null
)(withStyles(dashboardStyle)(Staff));
