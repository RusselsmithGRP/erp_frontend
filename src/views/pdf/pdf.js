import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { PDFExport } from "@progress/kendo-react-pdf";
import ReactDOMServer from 'react-dom/server';
import canvg from 'canvg';
import generalStyle from "../../assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../components/Grid/GridItem.jsx";
import pdfTemplate from "./pdfTemplate";
import * as poActions from "../../actions/purchaseorder";
import * as Uom from "utility/Uom";
import * as Status from "utility/Status";
import * as Util from "utility/Util";
import moment from "moment";
import * as currencies from "../../utility/Currencies.js";
import logo from "../../assets/img/rs-logo.png"

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
    fontFamily: "'Arial', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Pdf extends Component {
  po_doc;

  constructor() {
    super();
    (this.state = {
      data: [],
      footerHeader: [],
      items: [],
      currency: "",
      po: {
        vendor: {
          general_info: []
        },
        requestor: {},
        reviewedBy: {},
        authorizedBy: {},
        approvedBy: {}
      }
    }),
      (this.canvLoaded = false);
      this.reviewedBy = null;

  }

  convertSVGToImage = () => {
    // if FontAwesome, run this next part
    let htmlString = ReactDOMServer.renderToStaticMarkup(
      this.state.po.reviewedBy.signature);
    // for both FontAwesome and regular SVG:
    canvg(this.refs.canvas, htmlString);
    this.reviewedBy = this.refs.canvas.toDataURL('image/png')
    console.log(this.reviewedBy)
}

  exportPDF = () => {
    this.po_doc.save();
  };

  getTotal(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += parseInt(arr[i].price * arr[i].quantity);
    }
    let realSum = Util.financial(sum);

    return realSum;
  }
  getVAT(vat, total) {
    let val = (total * vat) / 100;
    let realVat = parseInt(total) + parseInt(val);
    return realVat;
  }

  /**
   * @author Idowu
   * @summary Changed componentWillMount to UNSAFE_componentWillMount
   */
  UNSAFE_componentWillMount() {
    poActions.fetchPurchaseOrderById(
      this.props.user.token,
      this.props.match.params.id,
      doc => {
        this.setState({ po: doc.po, items: doc.items });
        sessionStorage.setItem('effectiveDate', doc.po.approvedByDate)
      }
    );
  }

  componentDidMount() {
    this.convertSVGToImage();
}

  render() {
    console.log( this.state.po, "HELLO")
    const { classes, data } = this.props;
    let currency = "";
    const numberWords = require("number-words");
    const tableData = this.state.items.map((prop, key) => {
      currency = prop.currency;
      return (
        <tr>
          <td style={generalStyle.tableTd}>{key + 1}</td>
          <td style={generalStyle.tableTd}>{"N/A"}</td>
          <td style={generalStyle.tableTd}>{prop.description}</td>
          <td style={generalStyle.tableTd}>{prop.quantity}</td>
          <td style={generalStyle.tableTd}>
            {currencies.getCurrencyCode(prop.currency)}
            {Util.financial(prop.price)}
          </td>
          <td style={generalStyle.tableTd}>
            {currencies.getCurrencyCode(prop.currency)}
            {Util.financial(prop.quantity * prop.price)}
          </td>
        </tr>
      );
    });


    return (
      <div
        style={{
          minHeight: "70vh",
          height: "auto",
          width: "100vw",
          paddingTop: "20px",
          backgroundColor: "#f5f5f5",
          overflowY: "scroll",
          paddingBottom: "50px"
        }}
      >
        {!this.canvLoaded && (
          <canvas ref="canvas" style={{ display: "none" }} />
        )}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <button onClick={this.exportPDF} style={{ margin: "auto" }}>
            download
          </button>
        </div>
        <PDFExport
          pageTemplate={pdfTemplate}
          paperSize="A4"
          margin="1cm"
          fileName="purchase_order.pdf"
          title=""
          subject=""
          keywords=""
          ref={r => (this.po_doc = r)}
        >
          <div
            style={{
              height: "auto",
              width: "500px",
              padding: "100px 7px",
              backgroundColor: "white",
              overflowX: "hidden",
              overflowY: "hidden",
              fontFamily: "Arial",
              fontSize: "11px",
              position: "relative"
            }}
            ref={elem => (this.myPdf = elem)}
          >
            <div>
              <br />
              <div style={generalStyle.POtitle}>
                RS-PMG-PUR-P-1016–4 PURCHASE ORDER FORM
              </div>

              <Grid container>
                <GridItem xs={7} />
                <GridItem xs={5} style={generalStyle.alignLeft}>
                  <div style={generalStyle.noPaddingMargin}>
                    <label style={generalStyle.POLabel} for="input">
                      Purchase Order:
                    </label>
                    <input
                      style={generalStyle.POinput3}
                      type="text"
                      id="your-input"
                      value={this.state.po.no}
                    />
                  </div>
                  <div style={generalStyle.noPaddingMargin}>
                    <label style={generalStyle.POLabel} for="input">
                      Order Date:
                    </label>
                    <input
                      style={generalStyle.POinput3}
                      type="text"
                      id="your-input"
                      value={moment(this.state.po.created).format("DD-MM-YYYY")}
                    />
                  </div>
                  <div style={generalStyle.noPaddingMargin}>
                    <label style={generalStyle.POLabel} for="input">
                      Delivery Date:
                    </label>
                    <input
                      style={generalStyle.POinput3}
                      type="text"
                      id="your-input"
                    />
                  </div>
                  <div style={generalStyle.noPaddingMargin}>
                    <label style={generalStyle.POLabel} for="input">
                      Credit Terms:
                    </label>
                    <input
                      style={generalStyle.POinput3}
                      type="text"
                      id="your-input"
                      value={this.state.po.creditterms}
                    />
                  </div>
                  <div style={generalStyle.space20} />
                </GridItem>
              </Grid>
              <Grid
                container
                style={{ margin: "14px 0", position: "relative" }}
              >
                <GridItem xs={7} style={generalStyle.alignLeft}>
                  <span style={generalStyle.strong7}>To:</span>
                  <br />
                  {this.state.po.vendor.general_info.company_name}
                  <br />
                  {this.state.po.vendor.general_info.office_address}
                  <br />
                  {this.state.po.vendor.general_info.city +
                    ", " +
                    this.state.po.vendor.general_info.country}
                </GridItem>
                <GridItem xs={5}>
                  <span style={generalStyle.strong7}>Ship To:</span>
                  <br /> RusselSmith Nig Ltd <br />
                  KM 14 Lekki - Epe Express Road,
                  <br /> Lekki Phase 1, Lekki
                </GridItem>
              </Grid>
              <div style={generalStyle.tableDiv}>
                <table style={generalStyle.rtable}>
                  <thead>
                    <tr>
                      <th style={generalStyle.tableTh}>Item No.</th>
                      <th style={generalStyle.tableTh}>Ref. Part No.</th>
                      <th style={generalStyle.tableTh}>
                        Product / Service Description
                      </th>
                      <th style={generalStyle.tableTh}>Qty</th>
                      <th style={generalStyle.tableTh}>Unit Price</th>
                      <th style={generalStyle.tableTh}>Extended Cost</th>
                    </tr>
                  </thead>
                  <tbody>{tableData}</tbody>
                </table>
                <table style={generalStyle.sTable}>
                  <tbody>
                    <tr>
                      <th style={generalStyle.tableTd3}>Discount:</th>
                      <td style={generalStyle.tableTd2}>
                        {this.state.po.discount}
                      </td>
                    </tr>
                    <tr>
                      <th style={generalStyle.tableTd3}>
                        V.A.T ({this.state.po.vat}%):
                      </th>
                      <td style={generalStyle.tableTd2}>
                        {this.getVAT(
                          this.state.po.vat,
                          this.getTotal(this.state.items)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th style={generalStyle.tableTd3}>
                        Freight <br />
                        Charges:
                      </th>
                      <td style={generalStyle.tableTd2}>
                        {this.state.po.freightcharges}
                      </td>
                    </tr>
                    <tr>
                      <th style={generalStyle.tableTd3}>
                        Service <br />
                        Charge:
                      </th>
                      <td style={generalStyle.tableTd2}>
                        {this.state.po.servicecharge}
                      </td>
                    </tr>
                    <tr>
                      <th style={generalStyle.tableTd3}>Total:</th>
                      <td style={generalStyle.tableTd2}>
                        {currencies.getCurrencyCode(currency)}
                        {this.getTotal(this.state.items)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ clear: "right" }}>
                  <br />
                  <p>
                    <strong>Amount In words: </strong>
                    {numberWords.convert(this.getTotal(this.state.items))}
                  </p>
                </div>
              </div>
              <div>
                <p style={generalStyle.POtitle2}>Additional Terms:</p>

                <span>{this.state.po.additional_terms}</span>

                <div style={generalStyle.divider} />

                <Grid container>
                  <GridItem xs={11}>
                    <div>
                      <div style={generalStyle.space30} />

                      <label style={generalStyle.strong7} for="input">
                        Prepared by:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                        value={ (this.state.po.requestor)? (this.state.po.requestor.lastname + " "+ this.state.po.requestor.firstname) : ""}
                      />
                      <div style={generalStyle.space10} />
                    </div>

                      <div style={generalStyle.strong7}>
                       Reviewed by:

                        <br />
                      </div>
                      <div style={generalStyle.pr}>
                      <label style={generalStyle.POLabel2} for="input">
                        Reviewer Signature:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                        value={(this.state.po.reviewedBy)? (this.state.po.reviewedBy.lastname + " "+ this.state.po.reviewedBy.firstname): "" }
                      />
               {/* <img src="https://careersome.com/img/career2.png" /> */}

                     {(this.state.po.reviewedBy) ? (<img
                    ref={image => (this.image = image)}
                    style={generalStyle.signature}
                    src={`data:image/svg+xml, ${encodeURIComponent(this.state.po.reviewedBy.signature)}`}
                    //height="100px"
                  />): ""}
                     {(this.state.po.reviewedByDate) ? ( <span style={generalStyle.date}>{moment(this.state.po.reviewedByDate).format("DD-MM-YYYY")}</span>): ""}

                      <div style={generalStyle.space10} />
                    </div>
                    <div style={generalStyle.pr}>
                      <span style={generalStyle.strong7}>
                     Authorized and Approved By:
                        <br />
                      </span>
                      <label style={generalStyle.POLabel2} for="input">
                        Authorizer’s Signature:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                        value={(this.state.po.authorizedBy)? (this.state.po.authorizedBy.lastname + " "+ this.state.po.authorizedBy.firstname): "" }

                      />
                     {(this.state.po.authorizedBy) ? (<img
                    ref={image => (this.image = image)}
                    style={generalStyle.signature}
                    src={`data:image/svg+xml, ${encodeURIComponent(this.state.po.authorizedBy.signature)}`}
                    //height="100px"
                  />): ""}
                     {(this.state.po.authorizedByDate) ? ( <span style={generalStyle.date}>{moment(this.state.po.authorizedByDate).format("DD-MM-YYYY")}</span>): ""}

                    </div>
                    <div style={generalStyle.pr}>
                      <label style={generalStyle.POLabel2} for="input">
                        Approver’s Signature:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                        value={(this.state.po.approvedBy)? (this.state.po.approvedBy.lastname + " "+ this.state.po.approvedBy.firstname): "" }
                      />
                      {(this.state.po.approvedBy) ? (<img
                    ref={image => (this.image = image)}
                    style={generalStyle.signature}
                    src={`data:image/svg+xml, ${encodeURIComponent(this.state.po.approvedBy.signature)}`}
                    //height="100px"
                  /> ): ""}
                      {(this.state.po.approvedByDate) ? ( <span style={generalStyle.date}>{moment(this.state.po.approvedByDate).format("DD-MM-YYYY")}</span>): ""}

                    </div>
                    <div>
                      <div style={generalStyle.space10} />

                      <span>
                        <strong>Vendor:</strong>
                        <br />
                      </span>
                      <label style={generalStyle.POLabel2} for="input">
                        Signature:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                      />
                  
                    </div>
                  </GridItem>
                  {/* <GridItem xs={5}>
                    <div style={{ height: "40px"}}  >
                      <label style={generalStyle.POLabel} for="input">
                        Date:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                      />
                    </div>
                    <div style={generalStyle.pt2_5}>
                      <div style={generalStyle.space10} />
                      <label style={generalStyle.POLabel} for="input">
                        Date:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                      />
                    </div>
                    <div>
                      <div style={generalStyle.space30} />
                      <label style={generalStyle.POLabel} for="input">
                        Date:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                      />
                    </div>
                    <div>
                      <div style={generalStyle.space10} />
                      <label style={generalStyle.POLabel} for="input">
                        Date:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                      />
                    </div>
                    <div style={generalStyle.pt1_5}>
                      <br />
                      <label style={generalStyle.POLabel} for="input">
                        Date:
                      </label>
                      <input
                        style={generalStyle.POinput2}
                        type="text"
                        id="your-input"
                      />
                    </div>
                    <div style={generalStyle.space20} />
                  </GridItem> */}
                </Grid>
                <div>
                  <br />
                  <p>
                    Please, do not hesitate to either call us on 07069000900 or
                    e-mail us at customerservice@russelsmithgroup.com to express
                    your view of our business dealings with you.
                  </p>
                  <p>
                    <strong>
                      Address: RusselSmith Nigeria Ltd. Cheryn’s Place, 3 Swiss
                      Trade Drive, Ikota Lekki, Lagos
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PDFExport>
      </div>
    );
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
)(withStyles(styles)(Pdf));
