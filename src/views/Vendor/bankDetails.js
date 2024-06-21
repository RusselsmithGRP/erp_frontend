import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Progress from "../../components/Progress/Progress.jsx";
import * as vendorActions from '../../actions/vendor';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";

const styles = {}

class BankDetails extends React.Component {
  state = {
    data:{
      account_name:'',
      account_number:'',
      bank:'',
      sort_code:'',
      branch:'',
      contact_phone:''
    },
    redirect: false
  };
 
  componentDidMount(){
    this.setState({data:this.props.data});
  }

  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value; 
    this.props.addDispatch(data);
  };

  handleSave = e=>{
    e.preventDefault();
    this.props.updateVendor(this); 
  }

  render() {
    const { classes } = this.props;
    return  (this.state.redirect)? 
    <Redirect to="/dashboard" /> 
    : 
    (
      <Grid container>
      <GridItem xs={12} sm={12} md={12}>
      <form className={classes.container} noValidate autoComplete="off">
        <Progress loading={this.state.loading}/>
        <Card>
            <CardBody>
            <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Account Name" id="account_name" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.account_name
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Account Number" id="account_number" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.account_number
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Bank" id="bank" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.bank
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Sort Code" id="sort_code" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.sort_code
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Branch" id="branch" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.branch
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Phone" id="contact_phone" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.state.data.contact_phone
                      }}
                    />
                </GridItem>
            </Grid>
            </CardBody>  
              <CardFooter>
              <Grid container>
                {/* <GridItem xs={12} sm={6} md={2}>
                  <Button color="primary" onClick={this.handleSave}>Save</Button>
                </GridItem> */}
              </Grid>
            </CardFooter>
            </Card>
            </form>
          </GridItem>
        </Grid>
    )
  }
}

BankDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: (typeof(state.vendor.bank_detail) != 'undefined')?state.vendor.bank_detail: {},
    user: state.auth.user,
    vendor: state.vendor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateVendor(e){
      let d = {};
      d.bank_detail = e.state.data
      vendorActions.submitVendorDetailsViaUserId(dispatch, e.props.user._id, d);
    },
    addDispatch(data){
      vendorActions.getBankDetailInputs(dispatch, data); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BankDetails));
