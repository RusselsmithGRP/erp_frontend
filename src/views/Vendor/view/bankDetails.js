import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import * as vendorActions from 'actions/vendor';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";

const styles = {}

class BankDetails extends React.Component {
 
  componentDidMount(){
    this.setState({data:this.props.data});
  }

  render() {
    const { classes } = this.props;
    return  (
      <Grid container>
      <GridItem xs={12} sm={12} md={12}>
      <form className={classes.container} noValidate autoComplete="off">
        <Card>
            <CardBody>
            <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Account Name" id="account_name" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.props.data.account_name,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Account Number" id="account_number" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.props.data.account_number,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Bank" id="bank" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.props.data.bank,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Sort Code" id="sort_code" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.props.data.sort_code,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Branch" id="branch" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.props.data.branch,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Phone" id="contact_phone" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        onChange: this.handleChange,
                        value: this.props.data.contact_phone,disabled: true
                      }}
                    />
                </GridItem>
            </Grid>
            </CardBody>  
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
    user: state.auth.user
  };
}


export default connect(mapStateToProps, null)(withStyles(styles)(BankDetails));
