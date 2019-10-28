import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
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
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "react-select";

import Check from "@material-ui/icons/Check";
import { connect } from "react-redux";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle.jsx";
import generalStyle from "assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import { getCurves } from "crypto";
import CardText from "components/Card/CardText.jsx";
import * as rfqActions from "../../actions/requestforquotation";
import * as genericActions from "actions/generic.js";
import * as vendorActions from "actions/vendor.js";
import Notification from "views/Notifications/Index.jsx";
import * as Uom from "utility/Uom";

const styles = theme => ({
  ...tableStyle,
  ...regularFormsStyle,
  td: {
    border: "none",
    margin: "0 10px",
    padding: "0",
    fontWeight: "700",
    fontSize: "15px"
  },
  removeDivPadding: { maxWidth: "12%" }
});

const categories = [
  { value: "0", label: "Select" },
  { value: "1", label: "Category 1" },
  { value: "2", label: "Category 2" },
  { value: "3", label: "Category 3" }
];

const currencies = [
  { value: "0", label: " ₦ ", code: "NGN "},
  { value: "1", label: " $ ", code:"USD " },
  { value: "2", label: " £ ", code: "GBP " },
  { value: "3", label: " € ", code: "EUR " }
]

class Add extends React.Component {
  state = {
    simpleSelect: "",
    type: "",
    rowArray: [],
    checkedLineItems: [],
    selectedOption: [],
    lineItems: [],
    alert: null,
    show: false,
    price: "",
    contractedVendor: "",
    submitState: false
  };

  componentDidMount() {
    let rowArray = [];
    for (var i = 0; i < this.props.pr.lineitems.length; i++) {
      rowArray.push(i);
    }
    let vendorID = this.props.pr.vendor;
    let lineItems = this.props.pr.lineitems;
    //lineItems['New key'] = lineItems['old key'];

    this.setState({ rowArray: rowArray, lineItems: this.props.pr.lineitems });
    genericActions.fetchAll("departments", this.props.user.token, items => {
      this.setState({ departments: items });
    });
    vendorActions.searchVendor(this.props.user.token, "", vendors => {
      let myVendors = vendors.filter(t => t._id == vendorID);
      this.setState({
        contractedVendor: myVendors[0].general_info.company_name
      });

      let options = vendors
        .filter(v => {
          return typeof v.general_info !== "undefined";
        })
        .map(f => {
          return { value: f._id, label: f.general_info.company_name };
        });
      this.setState({ options });
    });
  }

  handleLineItems = i => {
    let checkedItems = this.state.checkedLineItems;
    let index = checkedItems.indexOf(i);
    if (index > -1) {
      checkedItems.splice(index, 1);
    } else {
      checkedItems.push(i);
    }
    this.setState({
      checkedLineItems: checkedItems
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  getPrice = e => {
    this.setState({ price: e.target.value });
  };
  setItem = i => event => {
    let items = this.state.lineItems;
    items[[i]][[event.target.name]] = event.target.value;
    this.setState({
      lineItems: items
    });
  };

  submitQuote = () => {
    this.setState({ submitState: true });
    let items = this.props.pr.lineitems.filter((prop, key) => {
      if (this.state.checkedLineItems.indexOf(key) > -1) {
        return prop;
      }
    });
    if (
      this.props.pr.purchaseType === "Contract" ||
      this.props.pr.purchaseType === "Sole Source"
    ) {
      let vendor = [
        {
          value: this.props.pr.vendor
        }
      ];

        let newData = [];
        items.map((k) => {
          let myData = {}
          myData.category = k.category;
          myData.itemdescription = k.itemdescription;
          myData.description = k.itemdescription;
          myData.quantity = k.quantity;
          myData.uom = k.uom;
          myData.currency = k.currency;
          myData.price = k.price;
          newData.push(myData)
        })

      //let items = [];
      //let item = this.props.pr.lineitems[0];
      //item.price = this.state.price;
      //item.description = item.itemdescription;
      //item.currency = "0";
      //items.push(item);
      let data = {
        items: newData,
        currency: "0"
      };
      // if (this.state.price){
      rfqActions.submitQuotation(
        this.props.user.token,
        {
          items: data.items,
          vendors: vendor,
          type: "contract",
          price: this.state.price,
          pr: this.props.pr
        },
        quote => {
          if (quote) {
            rfqActions.submitVendorQuote(
              this.props.user.token,
              quote._id,
              data,
              docs => {
                if (docs) {
                  this.setState({
                    message: "Price entered successfully.",
                    error: false
                  });
                }
              }
            );
          } else
            this.setState({
              message: "An error occur while sending RFQ.",
              error: true
            });
        }
      );
      // }
      // else alert("Please Enter Price")
    } else {
      rfqActions.submitQuotation(
        this.props.user.token,
        { items: items, vendors: this.state.selectedOption, pr: this.props.pr },
        isOk => {
          if (isOk) {
            this.setState({
              message: "RFQ succesfully sent to vendor",
              error: false
            });
          } else
            this.setState({
              message: "An error occur while sending RFQ.",
              error: true
            });
        }
      );
    }
  };

  render() {
    const { classes, tableHeaderColor } = this.props;
    const tableData = this.props.pr.lineitems.map((prop, key)=> {
    const category = categories.map(option => {
        if(prop.category == option.value){
          return option.label
        } 
    });
    const _currencies = currencies.map((k) =>
    <option key={k.value} value={k.value}>{k.code}</option>
  );
    const uom = Uom.getUom(prop.uom);
      return (
        <TableRow key={key}>
          <TableCell
            component="th"
            style={{
              border: "none",
              padding: "0",
              width: "20px",
              textAlign: "center"
            }}
          >
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

          {(this.props.pr.purchaseType === "Contract" || this.props.pr.purchaseType === "Sole Source")? <TableCell className={classes.td}>
                  <CustomInput
                name="price"
                id="price"
                type="number"
                labelText="Enter Price"
                required
                formControlProps={{
                  style: { width: "130px", padding: "0", margin: "0" },
                  name: "unit"
                }}
                inputProps={{
                  name: "price",
                  onChange: this.setItem(key),
                  style: { fontSize: "11px" }
                  //value: (this.state.lineItems[key]["price"])? this.state.lineItems[key]["price"]: ""
                }}
              />
          </TableCell> : ""} 

          {(this.props.pr.purchaseType === "Contract" || this.props.pr.purchaseType === "Sole Source")? <TableCell className={classes.td}>
            <select 
              onChange={this.setItem(key)}
              //value={data.teamMembers}
              id="currency"
              name="currency"                
              className="browser-default custom-select custom-select-md mb-3">
              <option>--none--</option>
                 {_currencies}
              </select>
          </TableCell> : ""}   
        </TableRow>
      );
    });


  	return (
        <div>
            <GridItem xs={12} sm={12} md={12} style={{ overflowY: "scroll", height: "50vh" }}>
              <Card>
                <CardBody>
                <Notification error={this.state.error} message={this.state.message} />
                  <form>
                      <Grid container>
                        <GridItem xs={12} sm={12} md={11} lg={11}>
                        { (this.props.pr.purchaseType === "Contract"|| this.props.pr.purchaseType === "Sole Source")? ` ` : <Select
                              isMulti
                              value={this.state.selectedOption}
                              onChange={this.handleChange}
                              options={this.state.options}
                          /> }
                        </GridItem>
                         {/* 
                        <CustomInput labelText="Vendors" id="vendors" name="vendors"
                          formControlProps={{
                            fullWidth: true
                          }} inputProps={{    
         
                          }}
                        />
                         */}

                   { (this.props.pr.purchaseType === "Contract"|| this.props.pr.purchaseType === "Sole Source")?
                         <GridItem xs={12} sm={12} md={12} lg={12}>
                       
                        <span style={generalStyle.textLabel}>
                        Vendor:
                      </span>
                      <span style={generalStyle.text}>{this.state.contractedVendor} </span>
                     
                        </GridItem> : ""}
                      </Grid>
                    <Grid container>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                          <div className={classes.tableResponsive} style ={{ overflowX: "scroll"}}>
                          <Table className={classes.table} > 
                            <TableHead  className={classes[tableHeaderColor + "TableHeader"]} style={{marginTop:"10px", color:"blue", borderBottomColor:"#333",borderBottomStyle:"solid", borderBottomWidth:"1px"}}>
                              <TableRow>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+ " " +classes.td} style={{color: "blue", width:"55px"}}>Item No</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+ " " +classes.td} style={{color: "blue"}}>Item Description</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue", width: "70px"}}>Quantity</TableCell>
                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Unit</TableCell>
                                { (this.props.pr.purchaseType === "Contract" || this.props.pr.purchaseType === "Sole Source")?   <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Enter Price</TableCell>: ""}
                                { (this.props.pr.purchaseType === "Contract" || this.props.pr.purchaseType === "Sole Source")?   <TableCell className={classes.tableCell + " " + classes.tableHeadCell+" "+classes.td} style={{color: "blue"}}>Currency</TableCell>: ""}

                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {tableData}
                            </TableBody>
                          </Table> 
                          {/* { (this.props.pr.purchaseType === "Contract" || this.props.pr.purchaseType === "Sole Source")?<CustomInput
                        labelText="Enter Price"
                        id="price"
                        formControlProps={{
                           fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.getPrice,
                          value: this.state.price
                        }}
                      />: ""} */}
                    </div>
                  </GridItem>
                </Grid>
              </form>
            </CardBody>
            <CardFooter>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color="yellowgreen"
                    onClick={this.submitQuote}
                    style={{ float: "right" }}
                    disabled={this.state.submitState}
                  >
                    Submit
                  </Button>
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
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.loader.loading,
    loader: state.loader
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Add));
