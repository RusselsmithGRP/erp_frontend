import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GeneralInfo from './view/generalInfoView';
import BusinessInfo from './view/businessInfo';
import WorkReference from './view/workReferences';
import TechnicalCapabilities from './view/technicalCapabilities';
import BankDetails from './view/bankDetails';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Approve from "@material-ui/icons/ThumbUp";
import Unapprove from "@material-ui/icons/ThumbDown";
import Button from '@material-ui/core/Button';
import Progress from "components/Progress/Progress.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import {connect} from 'react-redux';
import MiddleWare from "../../middleware/api";
import Notification from 'views/Notifications/Index.jsx'
import * as vendorActions from '../../actions/vendor';
import GeneralInfoView from './view/generalInfoView';

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
class View extends React.Component {
  state = {
    reason:"",
    vendor: {}
  }
  constructor(props){
    super(props)
    this.props = props;
  }

  componentDidMount(){
    const vendorId = this.props.match.params.id;
    vendorActions.findVendorById(this.props, vendorId, (vendor) => {
      this.setState({vendor})
    });
  }

  handleChange = event => {
    this.setState({ 
      [event.target.id] : event.target.value,
    });
  };
  updateStatus= (event, status)=>{
      let data = {};
      let middleware = new MiddleWare();
      data.key = this.props.data._id;
      data.value = status;
      data.message = this.state.reason;
      middleware.makeConnection('/vendors/updatestatus','PUT', data).then(
        (result)=>{
          if(!result.ok || result.statusText != "OK" && result.status != 200 ) {
            this.setState({error:true, message: "Error completing the request"})
          }else{
            this.setState({error:false, message: "Saved succesfully"})
          }
          this.setState({loading:false});
        }
      ).catch((e)=>{
        console.log(e);
      })

  }
  back = () => {
    //vendorActions.clearStore(this.props);
    this.props.history.push("/vendor");
  }

  render() {
    console.log(this.state.vendor, "data")
    const { classes } = this.props;
    return (
      <div>
      <Grid container>
      <Notification error={this.state.error} message={this.state.message} />
      <GridItem xs={12} sm={12} md={12}>
      <Button 
      color="secondary"
      onClick={this.back}>
          Back
        </Button>
      </GridItem>
      </Grid>
      <Grid container>

           <GridItem xs={12} sm={12} md={12}>
           <Progress loading={this.state.loading}/>
            <CustomTabs
              title=""
              headerColor="primary"
              tabs={[
                {
                  tabName: "General Information",
                  tabIcon: BugReport,
                  tabContent: (
                   (this.state.vendor.general_info)? <GeneralInfoView data={this.state.vendor.general_info}/>: ""
                  )
                },
                {
                  tabName: "Business Information",
                  tabIcon: Code,
                  tabContent: (
                    (this.state.vendor.business_info)? <BusinessInfo  data={this.state.vendor.business_info}/>: ""
                  )
                },
                {
                  tabName: "Bank Details",
                  tabIcon: Cloud,
                  tabContent: (
                    (this.state.vendor.bank_detail)? <BankDetails data={this.state.vendor.bank_detail}/>: ""
                  )
                },
                {
                  tabName: "Work Reference",
                  tabIcon: Cloud,
                  tabContent: (
                    (this.state.vendor.work_reference)? <WorkReference data={this.state.vendor.work_reference}/>: ""
                  )
                }
              ]}
            />
             { (this.state.showReason)?
              <Grid
                container
                spacing={16}
                alignItems="center"
                direction="row"
                justify="center"
              >
                <CustomInput
                    labelText="Kindly give a reason for the rejection"
                    id="reason"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2,
                      onChange: this.handleChange,
                    }}
                  />
                  <Button onClick={(e)=>this.updateStatus(e,"UPDATE")}>
                    submit
                  </Button>
              </Grid>
              : ""}
              {
            ((this.props.user.role == "iac") && (this.props.data.status == "PENDING"))?
            <Grid
                container
                spacing={16}
                alignItems="center"
                direction="row"
                justify="center"
              >
              <Button onClick={(e)=>this.updateStatus(e, "APPROVED")}>
              <Approve />
                Approve
              </Button>

              <Button onClick={()=>{(this.state.showReason)?this.setState({showReason:false}): this.setState({showReason:true})}}>
                <Unapprove />
                Reject
              </Button>
              </Grid> : ""
              }
          </GridItem>
      </Grid>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
  vendorActions:PropTypes.object,
  data: PropTypes.object
}

View.defaultProps = {
  data:{}
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    data: state.vendor
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     goBack(){
//       vendorActions.clearStore(dispatch)
//     }
//   }
// }

export default connect(mapStateToProps, null)(withStyles(styles)(View));
