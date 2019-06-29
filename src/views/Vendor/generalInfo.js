import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import CustomSelect from "../../components/CustomInput/CustomSelect.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Progress from "../../components/Progress/Progress.jsx";
import * as vendorActions from '../../actions/vendor';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import countries from "../countries";
import MenuItem from '@material-ui/core/MenuItem';

import {connect} from 'react-redux';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class GeneralInfo extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state ={
        data: {
          company_name: props.data.company_name,
          reg_no: props.data.reg_no,
          office_address: props.data.office_address,
          city: props.data.city,
          state: props.data.state,
          country: props.data.country,
          coy_phone: props.data.coy_phone,
          coy_email: props.data.coy_email,
          website: props.data.website,
          contact_name: props.data.contact_name,
          designation: props.data.designation,
          contact_phone: props.data.contact_phone,
          contact_email: props.data.contact_email
        },
    };
  }

  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value; 
    this.props.addDispatch(data);
  };
  handleCountryChange = event => {
    let data = this.state.data;
    data['country'] = event.target.value; 
    this.props.addDispatch(data);
  };
  handleSave = e =>{
      e.preventDefault();
      this.props.updateVendor(this); 
  }
  render() {
    const { classes, data } = this.props;
    if(this.state.loading){
      return (
        <div>
          <Grid container>
            <GridItem xs={12} sm={6} md={3} style={{ margin:'20% auto'}}>
              <CircularProgress className={classes.progress} size={70} style={{ color: purple[500]}} thickness={10} />
            </GridItem>
          </Grid>
        </div>)
    }else{
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
          <form className={classes.container} noValidate autoComplete="off">
            <Progress loading={this.state.loading}/>
            <Card>
              <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Name *" id="company_name" required
                    formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.company_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="CAC Registration Number *" id="reg_no" required formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.handleChange} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.reg_no
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput labelText="Office Address" helperText="Full business address" id="office_address" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.office_address
                    }}
                  />                    
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="City" id="city" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="State" id="state" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.state
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                   <CustomSelect labelText="Country"  id="country" name="country" required
                                value={this.state.data.country} onChange={(e)=>this.handleCountryChange(e)}
                                formControlProps={{
                                  fullWidth: true
                                }} 
                    >
                    {countries.map(option => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Telephone" id="coy_phone" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.coy_phone
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Email" id="coy_email" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.coy_email
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Website" id="website" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.website
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <div className={classes.typo}>
                  <h3>Company Contact Person Details</h3>
                </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Person" id="contact_name" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.contact_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Designation" id="designation" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      onChange: this.handleChange,
                      value: this.state.data.designation
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Telephone" id="contact_phone" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{onChange: this.handleChange,
                      value: this.state.data.contact_phone}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Email" id="contact_email" required formControlProps={{
                      fullWidth: true }} inputProps={{ onChange: this.handleChange,
                        value: this.state.data.contact_email}}
                  />
                </GridItem>
              </Grid>
              </CardBody>
              <CardFooter>
              <Grid container>
                <GridItem xs={12} sm={6} md={2}>
                  <Button color="primary" onClick={this.handleSave}>Save</Button>
                </GridItem>
              </Grid>
            </CardFooter>
            </Card>
            </form>
          </GridItem>
        </Grid>
      </div>
    );}
  }
}


GeneralInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

GeneralInfo.defaultProps = {
  data: {}
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    vendor: state.vendor,
    loading: state.loader.loading,
    loader : state.loader
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateVendor(e){
      let d = {};
      d.general_info = e.state.data;
      vendorActions.submitVendorDetailsViaUserId(dispatch, e.props.user._id, d);
       // dispatch({type: 'UPDATE_VENDOR', data:d});
    },
    addDispatch(data){
      vendorActions.getGeneralInfoInputs(dispatch, data);
    }
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GeneralInfo));
