import React from "react";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Next from "@material-ui/icons/ChevronRight";
import Previous from "@material-ui/icons/ChevronLeft";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import purple from "@material-ui/core/colors/purple";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Language from "@material-ui/icons/Language";
import { connect } from "react-redux";
import * as poActions from "../../actions/purchaseorder";
import * as riActions from "../../actions/receivingandinspection";
import Notification from '../Notifications/Index.jsx'
import generalStyle from "../../assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { GridList } from "@material-ui/core";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class View extends React.Component {
  state = {
    doc: {
      po: {
        vendor: {
          general_info: {}
        },
        types: [],
        requestor: {},
        vat: "",
        discount: "",
        servicecharge: "",
        freightcharges: ""
      },
      items: {
        requester: ""
      }
    },
    vendors: [],
    quotes: [],
    requesters: [],
    productsData: [],
    table_data: [],
    showRejectionLog: false,
    inspection_parameters: {
      identification: false,
      quantity: false,
      damages	: false,
      goodCondition: false,
      requiredMarkings : false,
      documentation: false, 
      incorrectSpecification: "",
      expiredGoods:	"",
      numberOfDamaged: "",
      poorFinishing:"",
      functionality: "",
      SupplyCompliancePecentage: ""
    },
    on_time_delivery: false,
    comment: "",
    inspection_stage: {
      inspected: false,
      reviewed: false,
      approved: false,
      inspectedDate: "",
      reviewedDate: "",
      approvedDate: "",
      inspectedBy: "",
      reviewedBy: "",
      approvedBy: ""
    },
    responseMessage: {},
    productsInspected: false,
    productsInspectedID: ""
  };

  parseRow() {
    let productItems = this.state.doc.items.filter(function(productItem) {
      return productItem.service_type.toLowerCase() == "product";
    });

    let requesters = [];
    let productsData = [];
    let table_data = productItems.map((prop, key) => {
      let productData = {
        description: prop.description,
        orderedQuantity: prop.quantity,
        deliveredQuantity: "",
        receivedQuantity: "",
        inspectedQuantity: "",
        acceptedQuantity: "",
        rejectedQuantity: 0
      };
      productsData.push(productData);
      requesters.push(prop.requester);
      let uniqueRequesters = [...new Set(requesters)];
      this.setState({
        requesters: uniqueRequesters,
        productsData: (this.state.productsInspected == true)? this.state.productsData : productsData
      });
      return (
        <tr>
          <td
            style={generalStyle.eth}
            onChange={this.handledChange}
            name="description"
          >
            {prop.description}
          </td>
          <td
            style={generalStyle.etd}
            onChange={this.handledChange}
            name="orderedQuantity"
          >
            {prop.quantity}
          </td>
          <td style={generalStyle.etd}>
            <input
              onChange={this.handledChange}
              data-tag={key}
              type="text"
              name="deliveredQuantity"
              style={generalStyle.iw}
              defaultValue={this.state.productsData[key].deliveredQuantity}
            />
          </td>
          <td style={generalStyle.etd}>
            <input
              onChange={this.handledChange}
              data-tag={key}
              type="text"
              name="receivedQuantity"
              style={generalStyle.iw}
              defaultValue={this.state.productsData[key].receivedQuantity}
            />
          </td>
          <td style={generalStyle.etd}>
            <input
              onChange={this.handledChange}
              data-tag={key}
              type="text"
              name="inspectedQuantity"
              style={generalStyle.iw}
              defaultValue={this.state.productsData[key].inspectedQuantity}

            />
          </td>
          <td style={generalStyle.etd}>
            <input
              onChange={this.handledChange}
              data-tag={key}
              type="text"
              name="acceptedQuantity"
              style={generalStyle.iw}
              defaultValue={this.state.productsData[key].acceptedQuantity}

            />
          </td>
          <td style={generalStyle.etd}>
            <input
              onChange={this.handledChange}
              data-tag={key}
              type="text"
              name="rejectedQuantity"
              style={generalStyle.iw}
              defaultValue={this.state.productsData[key].rejectedQuantity}
            />
          </td>
        </tr>
      );
    });
    this.setState({ table_data });
  }

  approvalCheck = e => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "/" + dd + "/" + yyyy;
    this.setApprover(e.target.name, today);
  };

  setApprover(name, date ) {
    const inspection_stage = { ...this.state.inspection_stage };
    const user = this.props.user.lastname +" "+this.props.user.firstname;
    switch (name) {
      case "inspected":
      inspection_stage.inspectedBy = user;
      inspection_stage[[name]] = !this.state.inspection_stage[[name]];
      inspection_stage.inspectedDate = date
      this.setState({
        inspection_stage    
      });
      break;
      case "reviewed":
      inspection_stage.reviewedBy = user;
      inspection_stage[[name]] = !this.state.inspection_stage[[name]];
      inspection_stage.reviewedDate = date
      this.setState({
        inspection_stage    
      });
      break;
    case "approved":
    inspection_stage.approvedBy = user;
    inspection_stage[[name]] = !this.state.inspection_stage[[name]];
    inspection_stage.approvedDate = date
    this.setState({
      inspection_stage    
    });
    break;  
     }
  }

  CheckOnTimeDelivery = () => {
    this.setState({ on_time_delivery: !this.state.on_time_delivery });
  };

  handleChecked =  e => {
    let inspection_parameters = { ...this.state.inspection_parameters };
    inspection_parameters[[e.target.name]] = !this.state.inspection_parameters[
      [e.target.name]
    ];
    this.setState({ inspection_parameters });
    };

  handleSpecChange = e => {
    let inspection_parameters = this.state.inspection_parameters;
    inspection_parameters[[e.target.name]] = e.target.value;
    this.setState({ inspection_parameters: inspection_parameters });
  };
  getComment =(e) => {
    this.setState({comment: e.target.value});
  };

  handledChange = e => {
    let newState = Object.assign({}, this.state);
    let productsData = this.state.productsData;
    productsData[e.target.getAttribute("data-tag")][e.target.name] =
      e.target.value;
    this.setState(newState);
    if (productsData[e.target.getAttribute("data-tag")].rejectedQuantity != 0 ||"") {
      this.setState({ showRejectionLog: true });
    } else {
      this.setState({ showRejectionLog: false });
    }
  };

  handleSubmit = () => {
    let data = this.state;
    riActions.submitRIF(this.props.user.token, data, (json)=>{
      this.setState({
          responseMessage:json,
      });
    });
  };

  handleUpdate = () => {
    let data = this.state;
    riActions.updateRIF(this.props.user.token, this.props.match.params.id, data, (json)=>{
      this.setState({
          responseMessage:json,
      });
    });
  };

  componentDidMount() {
    poActions.fetchPurchaseOrderById(
      this.props.user.token,
      this.props.match.params.id,
      doc => {
        this.setState({ doc });
        this.parseRow();
      }
    );
    riActions.getInspectedProduct(
      this.props.user.token,
      this.props.match.params.id,
      (json) => {
        if(json.result != "nothing") {
          this.setState({ 
            inspection_stage: json.result.inspection_stage, 
            inspection_parameters: json.result.inspection_parameters,
            on_time_delivery: json.result.on_time_delivery,
            productsData: json.result.productsData,
            productsInspected: true,
            productsInspectedID: json.result._id
          });
        }
      }
    );
  }

  render() {
    const { classes } = this.props;
    if (this.props.loader.loading) {
      return (
        <div>
          <Grid container>

            <GridItem xs={12} sm={6} md={3} style={{ margin: "20% auto" }}>
              <CircularProgress
                className={classes.progress}
                size={70}
                style={{ color: purple[500] }}
                thickness={10}
              />
            </GridItem>
          </Grid>
        </div>
      );
    } else {
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Receiving and Inspection Form
                </h4>
              </CardHeader>
              <CardBody>
                <div>
                  <Grid container style={generalStyle.wik4b}>
                  {(this.state.responseMessage.success == true)?<Notification error={false} message={this.state.responseMessage.message} />: ""}
                    <GridItem xs={12} sm={4} md={4} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="Vendor/Supplier/Sub-contractor"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:
                            " " +
                            this.state.doc.po.vendor.general_info.company_name,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="Supplier I.D"
                        id="vendor_id"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:
                            " " + this.state.doc.po.vendor.general_info.reg_no,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="Date"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        onFocus={this.toggleCalendar}
                        inputProps={{
                          value: "",
                          onFocus: this.toggleCalendar
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="P.O/Contract No"
                        id="P.O"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: " " + this.state.doc.po.no,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="Delivery Location"
                        id="delivery_location"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: " " + this.state.doc.po.shipto,
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="Cost Center"
                        id="cost_center"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: "",
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3} style={generalStyle.wik4c}>
                      <CustomInput
                        labelText="RAIF No"
                        id="cost_center"
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: "",
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={generalStyle.wik4c}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        On-time Delivery
                      </InputLabel>
                      <Checkbox
                        checked={this.state.on_time_delivery}
                        onChange={this.CheckOnTimeDelivery}
                        name="on_time_delivery"
                      />
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <table style={generalStyle.wik4}>
                    <thead style={generalStyle.tableTop2}>
                      <tr>
                        <th colSpan="10" style={generalStyle.tpc3}>
                          Receiving Report Table
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th style={generalStyle.eth}>Description </th>
                        <th style={generalStyle.eth}>Ordered Quantity</th>
                        <th style={generalStyle.eth}>Delivered Quantity</th>
                        <th style={generalStyle.eth}>Received Quantity</th>
                        <th style={generalStyle.eth}>Inspected Quantity</th>
                        <th style={generalStyle.eth}>Accepted Quantity</th>
                        <th style={generalStyle.eth}>Rejected Quantity</th>
                      </tr>
                    </thead>
                    <tbody>{this.state.table_data}</tbody>
                  </table>
                </div>
                <div style={generalStyle.space50} />
                <Grid container>
                  <GridItem xs={6} style={generalStyle.wik1}>
                    <table style={generalStyle.wik4}>
                      <tr>
                        <th style={generalStyle.wik2}>Identification</th>
                        <td style={generalStyle.wik3}>
                          <Checkbox
                            checked={this.state.inspection_parameters.identification}
                            onChange={this.handleChecked}
                            name="identification"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>Quantity</th>
                        <td style={generalStyle.wik3}>
                          <Checkbox
                            checked={this.state.inspection_parameters.quantity}
                            onChange={this.handleChecked}
                            name="quantity"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>Damages</th>
                        <td style={generalStyle.wik3}>
                          <Checkbox
                            checked={this.state.inspection_parameters.damages}
                            onChange={this.handleChecked}
                            name="damages"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>Required Markings</th>
                        <td style={generalStyle.wik3}>
                          <Checkbox
                            checked={this.state.inspection_parameters.requiredMarkings}
                            onChange={this.handleChecked}
                            name="requiredMarkings"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Cleanliness/Good Condition
                        </th>
                        <td style={generalStyle.wik3}>
                          <Checkbox
                            checked={this.state.inspection_parameters.goodCondition}
                            onChange={this.handleChecked}
                            name="goodCondition"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>Documentation</th>
                        <td style={generalStyle.wik3}>
                          <Checkbox
                            checked={this.state.inspection_parameters.documentation}
                            onChange={this.handleChecked}
                            name="documentation"
                          />
                        </td>
                      </tr>
                    </table>
                  </GridItem>
                  <GridItem xs={6} style={generalStyle.wik1}>
                    <table style={generalStyle.wik4}>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Incorrect Specification
                        </th>
                        <td style={generalStyle.wik3}>
                          <input
                            onChange={this.handleSpecChange}
                            type="text"
                            name="incorrectSpecification"
                            value= {this.state.inspection_parameters.incorrectSpecification}
                            style={generalStyle.iw}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Expired Goods from Inspection
                        </th>
                        <td style={generalStyle.wik3}>
                          <input
                            onChange={this.handleSpecChange}
                            type="text"
                            name="expiredGoods"
                            value= {this.state.inspection_parameters.expiredGoods}
                            style={generalStyle.iw}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Number of Damaged Goods/Parts
                        </th>
                        <td style={generalStyle.wik3}>
                          <input
                            onChange={this.handleSpecChange}
                            type="text"
                            name="numberOfDamaged"
                            value= {this.state.inspection_parameters.numberOfDamaged}
                            style={generalStyle.iw}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Goods with Poor Finishing
                        </th>
                        <td style={generalStyle.wik3}>
                          <input
                            onChange={this.handleSpecChange}
                            type="text"
                            name="poorFinishing"
                            value= {this.state.inspection_parameters.poorFinishing}
                            style={generalStyle.iw}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Operability/Functionality
                        </th>
                        <td style={generalStyle.wik3}>
                          <input
                            onChange={this.handleSpecChange}
                            type="text"
                            name="functionality"
                            value= {this.state.inspection_parameters.functionality}
                            style={generalStyle.iw}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th style={generalStyle.wik2}>
                          Percentage Supply Compliance
                        </th>
                        <td style={generalStyle.wik3}>
                          <input
                            onChange={this.handleSpecChange}
                            type="text"
                            name="SupplyCompliancePecentage"
                            value= {this.state.inspection_parameters.SupplyCompliancePecentage}
                            style={generalStyle.iw}
                          />
                        </td>
                      </tr>
                    </table>
                  </GridItem>
                </Grid>
                <div style={generalStyle.space50} />
                <Grid container>
                  <GridItem xs={12} sm={6} md={6}>
                    <CustomInput
                      labelText="Vendor Payment Term:	"
                      id="payment_term"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: " 30 days",
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  {this.state.showRejectionLog == true ? ( <CustomInput
                      labelText="Reason for Rejection/Comment:	"
                      id="comment"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.getComment,
                        value: this.state.comment
                      }}
                  />) : "" }
                  </GridItem>
                </Grid>
                <div style={generalStyle.space50} />

                <Grid container>
                  <GridItem xs={12} sm={7} md={7}>
                    <CustomInput
                      labelText="Requester(s)"
                      id="delivery_location"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: " " + this.state.requesters.join(),
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2} />
                  <GridItem xs={12} sm={3} md={3} />
                  <GridItem xs={12} sm={7} md={7}>
                    <CustomInput
                      labelText="QA Inspected By:	"
                      id="inspected_by"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.inspection_stage.inspectedBy,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Confirm Inspected
                    </InputLabel>
                    <Checkbox
                      checked={this.state.inspection_stage.inspected}
                      onChange={this.approvalCheck}
                      name="inspected"
                      id="inspectedDate"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2}>
                  <CustomInput
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.inspection_stage.inspectedDate
                        }}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CustomInput
                      labelText="Reviewed By:	
                        "
                      id="reviewed_by"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.inspection_stage.reviewedBy,

                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Confirm Reviewed
                    </InputLabel>
                    <Checkbox
                      checked={this.state.inspection_stage.reviewed}
                      onChange={this.approvalCheck}
                      name="reviewed"
                      id="reviewedDate"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2}>
                  <CustomInput
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.inspection_stage.reviewedDate
                        }}
                      />
                  </GridItem>
                  </Grid> 
                  { this.props.user.eid == "701000104"  ? ( <Grid container><GridItem xs={12} sm={8} md={8}>
                    <CustomInput
                      labelText="Approved By:	"
                      id="approved_by"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.inspection_stage.approvedBy,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2}>
                  <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Approve
                    </InputLabel>
                    <Checkbox
                      checked={this.state.inspection_stage.approved}
                      onChange={this.approvalCheck}
                      name="approved"
                      id="approvedDate"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={2}>
                  <CustomInput
                        required
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          value: this.state.inspection_stage.approvedDate
                        }}
                      />
                     
                  </GridItem></Grid>) : ""}
                 
                <Grid container>
                  <GridItem xs={12}>
                    <div style={generalStyle.space50} />
                    {(this.state.productsInspected == true)?<a style={generalStyle.qe_btn3} onClick={this.handleUpdate}>Update Form</a>: <a style={generalStyle.qe_btn3} onClick={this.handleSubmit}>Submit Form</a>}
                    <div style={generalStyle.space10} />
                  </GridItem>
                  <GridItem xs={12}>
                    <div style={generalStyle.space10} />
                    {this.state.showRejectionLog == true ? (
                      <Link
                        style={generalStyle.qe_btn4}
                        to={`/log/` + this.state.doc.po._id}
                      >
                        Fill Rejection Log
                      </Link>
                    ) : (
                      ""
                    )}
                    <div style={generalStyle.space10} />
                  </GridItem>
                  <GridItem xs={12}>
                    <div style={generalStyle.space10} />

                    {this.state.doc.po.types.includes("Service") ? (
                      <Link
                        style={generalStyle.qe_btn2}
                        to={`/work/completion/` + this.state.doc.po._id}
                      >
                        Issue Work Completion Cert
                      </Link>
                    ) : (
                      ""
                    )}

                    <div style={generalStyle.space10} />
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader,
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(View));
