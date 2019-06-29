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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Language from "@material-ui/icons/Language";
import { connect } from "react-redux";
import * as poActions from "../../actions/purchaseorder";
import * as riActions from "../../actions/receivingandinspection";
import generalStyle from "../../assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Notification from '../Notifications/Index.jsx'

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class WorkCompletion extends React.Component {
  state = {
    doc: {
      po: {
        vendor: {
          general_info: {}
        },
        requestor: {},
        vat: "",
        discount: "",
        servicecharge: "",
        freightcharges: ""
      },
      items: []
    },
    vendors: [],
    quotes: [],
    table_data: [],
    requesters: [],
    work_completion: {
      inspected: false,
      reviewed: false,
      approved: false,
      inspectedDate: "",
      reviewedDate: "",
      approvedDate: "",
      preparedBy: "",
      reviewedBy: "",
      approvedBy: ""
    },
    services: "",
    servicesInspectedID: "",
    serviceInspected: false,
    responseMessage: {},

  };

  parseRow() {
    let services = this.state.doc.items.filter(function(productItem) {
      return productItem.service_type.toLowerCase() == "service";
    });
    let requesters = [];
    let i = 0;
    const table_data = services.map((prop, key) => {
      requesters.push(prop.requester);
      let uniqueRequesters = [...new Set(requesters)];
      this.setState({
        requesters: uniqueRequesters,
        services: services
      });
      return (
        <tr>
          <td style={generalStyle.wik8}>{++i}</td>
          <td style={generalStyle.wik7}>{prop.description}</td>
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

  handleSubmit = () => {
    let data = this.state;
    riActions.submitWCF(this.props.user.token, data, (json)=>{
      this.setState({
          responseMessage:json,
      });
    });
  };

  handleUpdate = () => {
    let data = this.state;
    riActions.updateWCF(this.props.user.token, this.props.match.params.id, data, (json)=>{
      this.setState({
          responseMessage:json,
      });
    });
  };

  setApprover(name, date ) {
    const work_completion = { ...this.state.work_completion };
    const user = this.props.user.lastname +" "+this.props.user.firstname;
    switch (name) {
      case "inspected":
      work_completion.preparedBy = user;
      work_completion[[name]] = !this.state.work_completion[[name]];
      work_completion.inspectedDate = date
      this.setState({
        work_completion    
      });
      break;
      case "reviewed":
      work_completion.reviewedBy = user;
      work_completion[[name]] = !this.state.work_completion[[name]];
      work_completion.reviewedDate = date
      this.setState({
        work_completion    
      });
      break;
    case "approved":
    work_completion.approvedBy = user;
    work_completion[[name]] = !this.state.work_completion[[name]];
    work_completion.approvedDate = date
    this.setState({
      work_completion    
    });
    break;  
     }
  }

  componentDidMount() {
    poActions.fetchPurchaseOrderById(
      this.props.user.token,
      this.props.match.params.id,
      doc => {
        this.setState({ doc });
        this.parseRow();
      }
    );

    riActions.getIssuedWorkCompletion(
      this.props.user.token,
      this.props.match.params.id,
      (json) => {
        console.log(json);
        if(json.result != "nothing") {
          this.setState({ 
            work_completion: json.result.work_completion, 
            serviceInspected: true,
            servicesInspectedID: json.result._id
          });
        }
      }
    );
  }
  render() {
   
    console.log(this.state);
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
                  Work Completion Certificate
                </h4>
              </CardHeader>
              <CardBody style={generalStyle.container2}>
              {(this.state.responseMessage.success == true)?<Notification error={false} message={this.state.responseMessage.message} />: ""}

                <table style={generalStyle.wik4}>
                  <tr>
                    <th style={generalStyle.wik5}>Project Description:</th>
                    <td style={generalStyle.wik6} />
                  </tr>
                  <tr>
                    <th style={generalStyle.wik5}>PO No:</th>
                    <td style={generalStyle.wik6}> {this.state.doc.po.no}</td>
                  </tr>
                  <tr>
                    <th style={generalStyle.wik5}>Vendor Name:</th>
                    <td style={generalStyle.wik6}>
                      {this.state.doc.po.vendor.general_info.company_name}
                    </td>
                  </tr>
                  <tr>
                    <th style={generalStyle.wik5}>Vendor Contact Name:</th>
                    <td style={generalStyle.wik6}>
                      {this.state.doc.po.vendor.general_info.contact_name}
                    </td>
                  </tr>
                  <tr>
                    <th style={generalStyle.wik5}>Vendor Phone:</th>
                    <td style={generalStyle.wik6}>
                      {this.state.doc.po.vendor.general_info.coy_phone}
                    </td>
                  </tr>
                </table>
                <table style={generalStyle.wik4}>
                  <tr>
                    <th style={generalStyle.wik8}>S/N0</th>
                    <th style={generalStyle.wik7}>Work Completion Details</th>
                  </tr>
                  {this.state.table_data}
                </table>
                <div style={generalStyle.wik9}>
                  <div style={generalStyle.wik10}>
                    <p>
                      In respect of the above, RUSSELSMITH hereby issues to the
                      VENDOR this certificate of work completion.
                    </p>
                    <p>
                      On receipt of this certificate the VENDOR shall invoice
                      RUSSELSMITH for release of the retention monies in
                      accordance RusselSmith PURCHASE ORDER TERMS AND CONDITIONS
                      as stated in RS-PMG-PUR-P-1016-4 PURCHASE ORDER FORM.
                    </p>
                    <p>
                      This certificate does not relieve the VENDOR of any
                      continuing obligation to RUSSELSMITH under the CONTRACT,
                      nor does it affect any statutory or common-law rights held
                      by RUSSELSMITH
                    </p>
                  </div>
                </div>
                <Grid container style={generalStyle.wik4}>
                  <GridItem xs={12} sm={7} md={7}>
                    <CustomInput
                      labelText="Requested By:"
                      id="requester"
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
                      labelText="Prepared By:	"
                      id="inspected_by"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.work_completion.preparedBy,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Confirm Prepared
                    </InputLabel>
                    <Checkbox
                      checked={this.state.work_completion.inspected}
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
                          value: this.state.work_completion.inspectedDate
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
                        value:this.state.work_completion.reviewedBy,
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
                      checked={this.state.work_completion.reviewed}
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
                          value: this.state.work_completion.reviewedDate
                        }}
                      />
                  </GridItem>
                  </Grid> 
                  { this.props.user.eid == "701000104"  ? ( <Grid container style={generalStyle.wik4}>
                  <GridItem xs={12} sm={8} md={8}>
                    <CustomInput
                      labelText="Approved By:	"
                      id="approved_by"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.work_completion.approvedBy,
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
                      checked={this.state.work_completion.approved}
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
                          value: this.state.work_completion.approvedDate
                        }}
                      />
                  </GridItem>
                  </Grid>) : ""}
                <Grid container>
                  <GridItem xs={12}>
                    <div style={generalStyle.space50} />
                      {(this.state.serviceInspected == true)?<a style={generalStyle.qe_btn3} onClick={this.handleUpdate}>Update Form</a>: <a style={generalStyle.qe_btn3}  onClick={this.handleSubmit}>Submit Form</a> }
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
)(withStyles(styles)(WorkCompletion));
