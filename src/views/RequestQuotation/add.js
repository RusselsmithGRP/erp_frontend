import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";
//import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';

import Check from "@material-ui/icons/Check";
import {connect} from 'react-redux';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import { getCurves } from 'crypto';
import CardText from "components/Card/CardText.jsx";
import * as rfqActions from '../../actions/requestforquotation';
import * as genericActions from 'actions/generic.js';
import * as vendorActions from 'actions/vendor.js';
import Notification from 'views/Notifications/Index.jsx';
import * as Uom from "utility/Uom";

const styles = theme => ({
  ...tableStyle,
  ...regularFormsStyle,
  td:{
    border: 'none',
    margin: '0 10px',
    padding: '0',
    fontWeight: '700',
    fontSize: '15px',
  },
   removeDivPadding:{ maxWidth: "12%"}
});
 

const categories = [
  {value: '0', label:'Select',},
  {value: '1',label: 'Category 1',},
  {value: '2',label: 'Category 2',},
  {value: '3',label: 'Category 3',}
];

class Add extends React.Component {
  state = {
    simpleSelect: "",
    type: '',
    rowArray:[],
    checkedLineItems:[],
    selectedOption:[],
    lineItems:[],
    alert: null,
    show: false
  };

  componentDidMount(){
    let rowArray = [];
    for(var i = 0; i < this.props.pr.lineitems.length; i++){
      rowArray.push(i);
    }
    this.setState({rowArray:rowArray, lineItems : this.props.pr.lineitems});
    genericActions.fetchAll("departments", this.props.user.token, (items)=>{
      this.setState({departments : items});
    });
    vendorActions.searchVendor(this.props.user.token,"", (vendors)=>{
      let filtered_options = vendors.filter(v=> typeof v.general_info !== "undefined");
      const options = filtered_options.map(f=>{
        return {value:f._id, label: f.general_info.company_name}
      });
      this.setState({options});
    })
  }

  handleLineItems = i =>{
    let checkedItems = this.state.checkedLineItems;
    let index = checkedItems.indexOf(i);
    if(index > -1){
      checkedItems.splice(index, 1);
    }else{
      checkedItems.push(i);
    }
    this.setState({
      checkedLineItems:checkedItems
    });
  }
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }


  submitQuote= ()=>{
      let items = this.props.pr.lineitems.filter((prop, key)=> {
          if(this.state.checkedLineItems.indexOf(key) > -1){
            return prop;
          }
      });
      rfqActions.submitQuotation(this.props.user.token, 
        {items: items, vendors:  this.state.selectedOption, 
          pr:this.props.pr}, (isOk)=>{
            if(isOk){
              this.setState({message:"RFQ succesfully sent to vendor", error:false });
            } 
            else this.setState({message:"An error occur while sending RFQ.", error:true });
        });
  }

  render() {
    const { classes, tableHeaderColor } = this.props;
    const tableData = this.props.pr.lineitems.map((prop, key)=> {
    const category = categories.map(option => {
        if(prop.category == option.value){
          return option.label
        } 
    });
    const uom = Uom.getUom(prop.uom);
      return (
        <TableRow key={key}> 
          <TableCell component="th" style={{border: "none", padding: "0", width: "20px", textAlign: "center"}}>               
            <FormControlLabel
                control={
                  <Checkbox
                      tabIndex={-1}
                      onClick={() => this.handleLineItems(key)}
                      checkedIcon={
                        <Check className={classes.checkedIcon} />
                      }
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                  />
                }
                classes={{
                  label: classes.label
                }}
            />
          </TableCell>
          <TableCell className={classes.td}>
                {prop.itemdescription}
          </TableCell>
          <TableCell className={classes.td}>
                {prop.quantity}
          </TableCell>
          <TableCell className={classes.td}>
                {uom.name}
          </TableCell>      
        </TableRow>
        )}
    );


  	return (
        <div>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>
                <Notification error={this.state.error} message={this.state.message} />
                  <form>
                      <Grid container>
                        <GridItem xs={12} sm={12} md={11} lg={11}>
                          <Select
                              isMulti
                              value={this.state.selectedOption}
                              onChange={this.handleChange}
                              options={this.state.options}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3} lg={3}>
                        <CustomInput labelText="Vendors" id="vendors" name="vendors"
                          formControlProps={{
                            fullWidth: true
                          }} inputProps={{             
                          }}
                        />
                        </GridItem>
                      </Grid>
                    <Grid container>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                          <div className={classes.tableResponsive} style ={{ overflowX: "scroll"}}>
                          <Table className={classes.table} > 
                            <TableHead  className={classes[tableHeaderColor + "TableHeader"]} style={{marginTop:"10px", color:"blue", borderBottomColor:"#333",borderBottomStyle:"solid", borderBottomWidth:"1px"}}>
                              <TableRow>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue", width:"55px"}}>Item No</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Item Description</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue", width: "70px"}}>Quantity</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Unit</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {tableData}
                            </TableBody>
                          </Table> 
                        </div>
                      </GridItem>
                    </Grid>
              </form>
              </CardBody>
              <CardFooter>
              <Grid container>
                <GridItem xs={12} sm={12} md={2}>
                  <Button color="yellowgreen"  onClick={this.submitQuote}>Submit</Button>
                </GridItem>
              </Grid>              
              </CardFooter>
              </Card>
            </GridItem>
        </div>
      );
  }
}
Add.defaultProps = {
  tableHeaderColor: "gray"
};

Add.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.loader.loading,
    loader : state.loader
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Add));

