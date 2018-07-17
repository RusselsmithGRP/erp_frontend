import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import Progress from "../../../components/Progress/Progress.jsx";
import MiddleWare from "../../../middleware/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
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
 
  state ={
      data: {
        company_name:'',
        reg_no:'',
        office_address:'',
        city: '',
        state: '',
        country:'',
        coy_phone:'',
        coy_email:'',
        website:'',
        contact_name:'',
        designation: '',
        contact_phone: '',
        contact_email:''
      },
      loading:false,
      showMsg: false 
  };


  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value; 
    this.setState({ 
      data : data,
    });
  };

  componentDidMount(){
    this.setState({data:this.props.data.general_info});
  }

  handleSave = e=>{
      e.preventDefault();
      let data = {};
      let middleware = new MiddleWare();
      data.payload = { general_info:this.state.data};
      data.key = "user_id";
      data.value = this.props.user.id;
      middleware.makeConnection('/vendors','PUT', data).then(
        (result)=>{
          if(!result.ok || result.statusText != "OK" && result.status != 200 ) {
            
          }
          this.setState({loading:false});
        }
      ).catch((e)=>{
        console.log(e);
      })
      
  }
  render() {
    const { classes, data } = this.props;
    //console.log(this.props);
    if(this.props.loader.loading){
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
                  <CustomInput labelText="Company Name"
                    formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.company_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Registration Number" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.reg_no
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput labelText="Office Address" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.office_address
                    }}
                  />                    
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="City" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="State" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.state
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Country" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.country
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Telephone" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.coy_phone
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Email" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.coy_email
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Website" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.website
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Person" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.contact_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Designation" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: this.state.data.designation
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Telephone" id="contact_phone" required formControlProps={{
                      fullWidth: true
                    }} inputProps={{disabled: true,
                      value: this.state.data.contact_phone}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Email" id="contact_email" required formControlProps={{
                      fullWidth: true }} inputProps={{ disabled: true,
                        value: this.state.data.contact_email}}
                  />
                </GridItem>
              </Grid>
              </CardBody>
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
};

GeneralInfo.defaultProps = {
  data:{general_info:{}}
}
function mapStateToProps(state) {
  return {
    data: state.vendor.datum,
    loader: state.loader,
    user: state.auth.user
  };
}
export default  connect(mapStateToProps, null)(withStyles(styles)(GeneralInfo));