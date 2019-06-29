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
import purple from "@material-ui/core/colors/purple";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Language from "@material-ui/icons/Language";
import Paper from "@material-ui/core/Paper";
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

class RejectionLog extends React.Component {
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
    productsData: [],
    rejectionID: "",
    responseMessage: {},
    rejectionlogged: false

  };

  handledChange = e => {
    let newState = Object.assign({}, this.state);
    let productsData = this.state.productsData;
    productsData[e.target.getAttribute("data-tag")][e.target.name] =
      e.target.value;
    this.setState(newState);

  }
  renderRedirect = () => {
    if (this.state.responseMessage.success == true) {
      setTimeout(function() {
        window.location.href = "/rejection/log/index";
      }, 3000);
    }
  };

  submitRejectionLog= () => {
    let data = this.state;
    riActions.submitRL(this.props.user.token, data, (json)=>{
      this.setState({
          responseMessage:json,
          rejectionlogged: json.result.success
      });
    });
  };

  parseRow() {
    
    const table_data = this.state.productsData.map((prop, key) => {
      return (
        <tr>
          <td style={generalStyle.eth3}>{prop.description}</td>
          <td style={generalStyle.etd3}>{prop.orderedQuantity}</td>
          <td style={generalStyle.etd3}>{prop.rejectedQuantity}</td>
          <td style={generalStyle.etd3}>
            <input type="text" name="productRejectionReason" data-tag={key} style={generalStyle.iw2} onChange={this.handledChange}
/>
          </td>
        </tr>
      );
    });
    this.setState({ table_data });
  }
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
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
        if(json.result != "nothing")
        {
          let rejectedProducts =json.result.productsData.filter(function(productItem) {
            return productItem.rejectedQuantity !=  0;
          });
          this.setState({ 
            productsData: rejectedProducts,
            productsInspectedID: json.result._id
          });
        }
      }
    );

    // riActions.getRejectionLog(
    //   this.props.user.token,
    //   this.props.match.params.id,
    //   (json) => {
    //     if(json.result) {
    //       this.setState({ 
    //         productsData: json.result.productsData,
    //         RejectionLog2: true,
    //       });
    //     }
    //   }
    // );
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
          {this.renderRedirect()}
          <Paper style={{ width: "100%" }}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Rejection Log</h4>
                {(this.state.responseMessage.success == true)?<Notification error={false} message={this.state.responseMessage.message} />: ""}

              </CardHeader>
            </Card>
            <CardBody>
              <table style={generalStyle.wik4}>
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
                  <th style={generalStyle.wik5}>Item</th>
                  <th style={generalStyle.wik8}>No. of Items Purchased</th>
                  <th style={generalStyle.wik8}>No. of items rejected</th>
                  <th style={generalStyle.wik8b}>Description</th>
                </tr>
                {this.state.table_data}
              </table>
              <GridItem xs={12}>
                <div style={generalStyle.space50} />
                <a style={generalStyle.qe_btn2} onClick={this.submitRejectionLog}>Submit</a>
                <div style={generalStyle.space50} />
              </GridItem>
            </CardBody>
          </Paper>
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
)(withStyles(styles)(RejectionLog));
