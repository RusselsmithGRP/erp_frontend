import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GeneralInfo from './generalInfo';
import BusinessInfo from './businessInfo';
import WorkReference from './workReferences';
import TechnicalCapabilities from './technicalCapabilities';
import BankDetails from './bankDetails';
import Typography from '@material-ui/core/Typography';
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import BugReport from "@material-ui/icons/BugReport";
import Work from "@material-ui/icons/list";
import Payment from "@material-ui/icons/payment";
import DNS from "@material-ui/icons/dns";
import Business from "@material-ui/icons/businessCenter";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import Notification from 'views/Notifications/Index.jsx'
import * as vendorActions from '../../actions/vendor';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class AddTabs extends React.Component {

  componentDidMount(){
    const userId = this.props.user._id;
    vendorActions.findVendorByUserId(this.props, userId);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    //console.log(this.props);
    const { classes } = this.props;
    if(this.props.loading){
      return (
        <div>
          <Grid container>
            <GridItem xs={12} sm={6} md={3} style={{ margin:'20% auto'}}>
              <CircularProgress className={classes.progress} size={70} style={{ color: purple[500]}} thickness={10} />
            </GridItem>
          </Grid>
        </div>)
    }
    else if(this.props.user.role ==='vendor' && this.props.vendor.status === "PENDING"){
      return  (<Redirect to="/dashboard" />);
    }else
    return (
    <Grid container>
    <Notification error={this.props.loader.error} message={this.props.loader.message} />
           <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title=""
              headerColor="primary"
              tabs={[
                {
                  tabName: "General Information",
                  tabIcon: DNS,
                  tabContent: (
                    <GeneralInfo data={this.props.vendor.general_info} />
                  ),
                },
                {
                  tabName: "Business Information",
                  tabIcon: Business,
                  tabContent: (
                    <BusinessInfo />
                  )
                },
                {
                  tabName: "Bank Details",
                  tabIcon: Payment,
                  tabContent: (
                    <BankDetails />
                  )
                },
               /*  {
                  tabName: "Technical Capabilities",
                  tabIcon: Cloud,
                  tabContent: (
                    <TechnicalCapabilities  />
                  )
                }, */
                {
                  tabName: "Work Reference",
                  tabIcon: Work,
                  tabContent: (
                    <WorkReference />
                  )
                }
              ]}
            />
          </GridItem>
      </Grid>
    );
  }
}

AddTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  vendorActions:PropTypes.object,
  vendor: PropTypes.object
}

AddTabs.defaultProps = {
  vendor:{},
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    vendor: state.vendor,
    loading: state.loader.loading,
    loader : state.loader
  };
}

export default  connect(mapStateToProps, null)(withStyles(styles)(AddTabs));
