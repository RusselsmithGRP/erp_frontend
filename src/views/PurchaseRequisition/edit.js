import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Add from "@material-ui/icons/Add";
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from 'react-redux';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import DatePicker from 'react-datepicker';
import * as prActions from '../../actions/purchaserequisition';
import * as genericActions from 'actions/generic.js';
import Notification from 'views/Notifications/Index.jsx'
import moment from 'moment';
import * as Status from 'utility/Status'; 
import * as Uom from "utility/Uom";

import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
  ...tableStyle,
  ...regularFormsStyle,

  td:{
    border: 'none',
    margin: '0 10px',
    padding: '4px',
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

const shipvia = [
  {slug: 'digital', name:'Digital (Download)'},
  {slug: 'vendor', name:'Vendor Delivery'},
  {slug: 'dhl', name:'DHL'},
]

class Edit extends React.Component {
  state = {
    simpleSelect: "",
    type: '',
    rowArray:[1,2],
    data:{
      type:'',
      requestedby: '',
      eid: "",
      departmentname: "",
      chargeto: "",
      dateneeded: "",
      status: "01",
      requestor:{},
      department:{}
    },
    lineItems:[],
    startDate : moment(),
    departments: [],
    action: '',
    reason:"",
    expenseheaders:[],
  };

  handleChange= e =>{
    const action = e.target.value;
    let showReason = (action == "disapprove")? true: false;
    this.setState({showReason, action});
  }

  handleFormChange= e=>{
    const reason = e.target.value;
    this.setState({reason});
  }


  submitForm= e=>{
    let data = {};
    let message = ""
    if(this.state.action == "approve"){
      data.status = "011";
      message = "Purchase requisition approved.";
    }else{
      data.status = "010";
      data.reason = this.state.reason;
      message = "Purchase requisition has been disapproved.";
    }
    prActions.editRequisition(this.props.user.token, this.state.data._id, data, (isOk)=>{
        if(isOk) this.setState({message: message, error:false });
        else this.setState({message:"Error processing request.", error:true });
    })
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    prActions.findRequisitionById(this.props.user.token, id, (data)=>{
        data.requestedby = data.requestor.firstname +" "+ data.requestor.lastname
        data.eid = data.requestor.eid ;
        data.dept = data.department._id;
        this.setState({ data : data});
        this.setState({ lineItems : data.lineitems});
    });
    genericActions.fetchAll("departments", this.props.user.token, (items)=>{
      this.setState({departments : items});
    });
    genericActions.fetchAll("expenseheader", this.props.user.token, (items)=>{
      this.setState({expenseheaders : items});
    });
  }



  render() {
    const { classes, tableHeaderColor } = this.props;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;
  	const tableData = this.state.rowArray.map((prop, key)=> {

      let value;
      if(this.state.lineItems[key]){
        value = this.state.lineItems[key];
      }
      else{
        value = {};
      }
      const uom = Uom.getUom(value.uom);

      return (
        <TableRow key={key}> 
          <TableCell component="th" style={{border: "none", padding: "0", width: "20px", textAlign: "center"}}>               
            {key+1}
          </TableCell>
          <TableCell style={generalStyle.removeBorder}>
              <CustomSelect labelText="Select" id="category" name="category" required
                     value={value.category}
                    formControlProps={{
                      style: {width:"130px",padding:"0", margin:"0"}              
                    }} 
                    inputProps={{disabled: true,margin:"normal" }}
                   style={{marginTop: "-3px",   borderBottomWidth:" 1px"
                  }}
                    >
                        {this.state.expenseheaders.map(option => (
                          <MenuItem key={option._id} value={option._id} >
                            {option.name}
                          </MenuItem>
                        ))}
              </CustomSelect>
          </TableCell>
          <TableCell className={classes.td}>
                <CustomInput id="itemdescription" 
                        required 
                    formControlProps={{  
                      style: {width:"300px", padding:"0", margin:"0"}
                      }} 
                    inputProps={{disabled: true, name:"itemdescription", value:value.itemdescription }}
                    />
          </TableCell>
          <TableCell className={classes.td}>
                <CustomInput  id="quantity" type="number" required formControlProps={{  
                      style: {width:"100px", padding:"0", margin:"0"}              
                    }}  inputProps={{disabled: true,name:"quantity",value:value.quantity}}
                    />
          </TableCell>
          <TableCell className={classes.td}>
                <CustomInput name="unit" id="unit" required 
                    formControlProps={{  
                      style: {width:"100px", padding:"0", margin:"0"},  
       
                    }}  
                    inputProps={{disabled: true, 
                      value: uom.name, name:"uom" }}
                  />
                  
          </TableCell>      
        </TableRow>
        )}
    );
    
    return (
	<div>
	<Grid container>
    <Notification error={this.state.error} message={this.state.message} />
    <GridItem xs={12} sm={12} md={12}>
      <form className={classes.container} noValidate autoComplete="off">
	        <Card>
          <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Purchase Requisition</h4>
              </CardHeader>
              <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <p style={generalStyle.text2}>Type of Requisition:</p>
                </GridItem>	
                <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                          >
                            Choose Requisition
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.data.type}
                            inputProps={{
                              name: "simpleSelect",
                              id: "type",
                              disabled: true,
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Requisition Type
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Service"
                            >
                              Service
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Product"
                            >
                             Product
                            </MenuItem>                                                      
                          </Select>
                        </FormControl>
                  </GridItem>	
                  <GridItem xs={12} sm={12} md={4}/>
                  <GridItem xs={12} sm={12} md={4}style={generalStyle.text2}>
                      Requisition No: {this.state.data.requisitionno}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomInput labelText="Required By" id="requestedby"
                  formControlProps={{
                      fullWidth: true
                        }}
                    inputProps={{ 
                      disabled: true,
                      value:"Required: "+ this.props.user.firstname +" "+ this.props.user.lastname                 
                        }}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}> 
                      <CustomInput labelText="Employee ID" id="eid"
                        formControlProps={{
                          fullWidth: true
                        }} inputProps={{
                          disabled: true, value: "Employee ID: " +this.props.user.eid                
                        }}
                      />
                  </GridItem>   
                  <GridItem xs={12} sm={12} md={4}>
                      <CustomInput required formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value:today                 
                        }}
                      />
                  </GridItem>                   
                  <GridItem xs={12} sm={4} md={4}>
                      <CustomSelect labelText="Select" id="department" name="department" required
                            formControlProps={{
                              style: {width:"130px",padding:"0", margin:"0"}              
                            }} 
                            value={this.state.data.dept}
                            inputProps={{margin:"normal",disabled: true, }}
                          style={{marginTop: "-3px",   borderBottomWidth:" 1px"
                          }}
                            >
                                {this.state.departments.map(option => (
                                  <MenuItem key={option._id} value={option._id} >
                                    {option.name}
                                  </MenuItem>
                                ))}
                      </CustomSelect>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                      <CustomInput labelText="Charge To" id="chargeto" required formControlProps={{
                        fullWidth: true, }} inputProps={{
                            value: this.state.data.chargeto,
                            disabled: true
                        }}
                      />
                  </GridItem>   
                  <GridItem xs={12} sm={4} md={4}>
                  <CustomInput labelText="Date Needed" required formControlProps={{
                        fullWidth: true, }} 
                        onFocus={this.toggleCalendar}
                        inputProps={{
                            value: this.state.startDate.format("DD-MM-YYYY"),
                            disabled: true,
                        }}
                      />
                  </GridItem>              
                  	{/* <GridItem xs={12} sm={8} md={8}>
                      <CustomInput labelText="Purpose Of Use" id="purpose" required formControlProps={{
                      fullWidth: true
                        }}
                        multiline={true} rows={3}
                    inputProps={{                      
                        }}
                      />
                  </GridItem>  */}          
            
                  <GridItem xs={12} sm={4} md={4}>
                      <CustomSelect labelText="Ship Via" name="shipvia" required
                            formControlProps={{
                              style: {width:"130px",padding:"0", margin:"0"}              
                            }} 
                            value={this.state.data.shipvia}
                            inputProps={{margin:"normal",  id:"shipvia", disabled: true, }}
                          style={{marginTop: "-3px",   borderBottomWidth:" 1px"
                          }}
                            >
                                {shipvia.map(option => (
                                  <MenuItem key={option.slug} value={option.slug} >
                                    {option.name}
                                  </MenuItem>
                                ))}
                      </CustomSelect>
                  </GridItem> 
                  <GridItem xs={12} sm={4} md={4}>
                      <CustomInput labelText="Status" id="status" required formControlProps={{
                        fullWidth: true
                        }} inputProps={{  
                          value: Status.getStatus(this.state.data.status),
                          disabled:true                  
                        }}
                      />
                  </GridItem> 
              </Grid>
                  <br />  
                  <div style={generalStyle.aboveTable}>
                  <div style={generalStyle.aboveTableIcon}><span></span>
                  <span><Checkbox checked={(this.state.data.isextrabudget)? true : false } disabled="true" />Extra Budgetary</span>
                  </div>
                  

                  </div>
                  <div className={classes.tableResponsive} style ={{ overflowX: "scroll"}}>
                  <Table className={classes.table} > 
                    <TableHead  className={classes[tableHeaderColor + "TableHeader"]} style={{marginTop:"10px", color:"blue", borderBottomColor:"#333",borderBottomStyle:"solid", borderBottomWidth:"1px"}}>
                      <TableRow>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue", width:"55px"}}>Item No</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Category</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Item Description</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue", width: "70px"}}>Quantity</TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Unit</TableCell>
                      </TableRow>
                    </TableHead>
                    <div ></div>

                    <TableBody>
                      {tableData}
                    </TableBody>
                  </Table> 
                </div>
              </CardBody>
              {
                  (this.props.user._id == this.state.data.department.hod)? 
                  <CardFooter>
                  <Grid container>
                  {
                    (this.state.showReason)?
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput labelText="Reason" id="reason" required formControlProps={{
                          fullWidth: true
                          }} inputProps={{  
                            name: "reason",
                            value: this.state.data.reason,
                            onChange:  this.handleFormChange             
                          }}
                        />
                    </GridItem>
                    : ""
                    }
                    <GridItem xs={12} sm={6} md={6}>
                    <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                    <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.action}
                            inputProps={{
                              name: "simpleSelect",
                              id: "type",
                            }}
                            onChange={this.handleChange}
                          >
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Action
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="approve"
                            >
                              Approve
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="disapprove"
                            >
                             Reject
                            </MenuItem>                                                      
                          </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <Button color="yellowgreen"  onClick={this.submitForm}>Submit</Button>
                    </GridItem>
                  </Grid>
                </CardFooter>
                :
                ""
              }
	  		</Card>
      </form>
	</GridItem>
</Grid>
</div>
    );
  }
}

Edit.defaultProps = {
  tableHeaderColor: "gray"
};

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.loader.loading,
    loader : state.loader
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Edit));

