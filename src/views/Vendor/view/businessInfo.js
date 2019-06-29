import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomSelect from "../../../components/CustomInput/CustomSelect.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import CustomCheck from "../../../components/CustomInput/CustomCheck.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import Progress from "../../../components/Progress/Progress.jsx";
import MiddleWare from "../../../middleware/api";
import {Services, Products} from "../params.js";
import FormLabel from '@material-ui/core/FormLabel';
import {connect} from 'react-redux';

const styles = theme => ({

});

const biz_types = [
  {value: '0', label:'Select Business Class',},
  {value: '1',label: 'Corporate/Limited',},
  {value: '2',label: 'Partnership',},
  {value: '3',label: 'Other',}
];
class BusinessInfo extends React.Component {
  state = {
    business_nature: {},
    data: {
    employee_no:'',
    business_type: 0,
    year_established:'',
    vat_no: '',
    tax_no: '',
    product_related: {},
    service_related: {}
    }
  };
  biz_nature_state = {};
  
  componentDidMount(){
    this.setState({ data: this.props.data})
  }

  handleBizTypeChange = event => {
    let data = this.state.data;
    data['business_type'] = event.target.value; 
    this.setState({ 
      data : data,
    });
  };
  
  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value; 
    this.setState({ 
      data : data,
    });
  };

  checkChecked = event=>{
    this.biz_nature_state.map(v=>{
      return v = event.target.name;
    })
    return false;
  };
  
  handleBizNatureChange = event =>{
    if( this.biz_nature_state[event.target.name] === "" || this.biz_nature_state[event.target.name] == undefined){
      this.biz_nature_state[event.target.name] = event.target.value; 
    }else{
      this.biz_nature_state[event.target.name] = "";
    }
    let data = this.state.data;
    data[[event.target.id]] = this.biz_nature_state; 
    this.setState({data : data});
    //console.log(this.state);
  };

  handleSave = e=>{
    e.preventDefault();
    this.setState({loading:true});
    let data = {};
    let middleware = new MiddleWare();
    data.payload = { business_info:this.state.data};
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
    const { classes } = this.props;
  
    return (
      <Grid container>
      <GridItem xs={12} sm={12} md={12}>
        <form className={classes.container} noValidate autoComplete="off">
          <Progress loading={this.state.loading}/>
          <Card>
            <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={6}>
                <CustomSelect labelText="Corporate/Limited Liability" name="business_type" required
                                value={this.state.data.business_type} onChange={(e)=>this.handleBizTypeChange(e)}
                                formControlProps={{
                                  fullWidth: true
                                }} 
                                inputProps={{margin:"normal",disabled: true}}
                    >
                    {biz_types.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput labelText="Year Established" id="year_established" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        disabled: true,
                        value: this.state.data.year_established,
                      }}
                    />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput labelText="No of Employee" id="employee_no" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        disabled: true,
                        value: this.state.data.employee_no,
                      }}
                    />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" >Area(s) of Business that you wish to Register For : </FormLabel> 
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomSelect labelText="Product Related" name="product_related" required
                                value={this.state.data.product_related} 
                                formControlProps={{
                                  fullWidth: true
                                }} 
                                inputProps={{margin:"normal",
                                disabled: true}}
                    >
                    {Products.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomSelect labelText="Service Related" name="service_related" required
                                value={this.state.data.service_related} 
                                formControlProps={{
                                  fullWidth: true
                                }} 
                                inputProps={{margin:"normal",
                                disabled: true}}
                    >
                    {Services.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput id="tax_no" required labelText="Tax Identification No (TIN)" formControlProps={{
                  fullWidth: true
                }} inputProps={{
                  disabled: true,value: this.state.data.tax_no,
                }}
              />  
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput id="vat_no" required labelText="VAT Registration No (VAT)" formControlProps={{
                  fullWidth: true
                }} inputProps={{
                  disabled: true,
                  value: this.state.data.vat_no,
                }}
              /> 
              </GridItem>
            </Grid>
            </CardBody>
          </Card>
        </form>
        </GridItem>

      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: (typeof(state.vendor.business_info) != 'undefined')?state.vendor.business_info: {},
    user: state.auth.user
  };
}
export default connect(mapStateToProps, null)(withStyles(styles)(BusinessInfo));
