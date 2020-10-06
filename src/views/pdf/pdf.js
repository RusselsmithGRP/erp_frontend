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
  getVAT(vat, total, discount) {
    let val =  (vat / 100) * (parseInt(total) - parseInt(discount));
    // let realVat = parseInt(total) + parseInt(val);
    return val;
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
        console.log(doc.po.discount, "docs")
        doc.po.discount = (doc.po.discount)? doc.po.discount: 0;
        this.setState({ po: doc.po, items: doc.items });
        sessionStorage.setItem('effectiveDate', doc.po.approvedByDate)
      }
    );
  }

  componentDidMount() {
    this.convertSVGToImage();
}

  render() {
    console.log( this.state.po, "PO")
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
          forcePageBreak=".page-break"
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
              lineHeight: "1.3",
              position: "relative"
            }}
            ref={elem => (this.myPdf = elem)}
          >
            <div>
             

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
                  {(this.state.po.vendor)? this.state.po.vendor.general_info.company_name: ""}
                  <br />
                  { (this.state.po.vendor)? this.state.po.vendor.general_info.office_address: ""}
                  <br />
                  {(this.state.po.vendor)? this.state.po.vendor.general_info.city + ", "+  this.state.po.vendor.general_info.country : "" }
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
                          this.getTotal(this.state.items),
                          this.state.po.discount
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
                        {parseInt(this.getTotal(this.state.items))  + parseInt(this.getVAT(this.state.po.vat, this.getTotal(this.state.items),this.state.po.discount) - parseInt(this.state.po.discount))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ clear: "right" }}>
                  <br />
                  <p>
                    <strong>Amount In words: </strong>
                    {numberWords.convert(parseInt(this.getTotal(this.state.items))  + parseInt(this.getVAT(this.state.po.vat, this.getTotal(this.state.items),this.state.po.discount) - parseInt(this.state.po.discount)) )}
                    <span>{currencies.getCurrencyCode(currency) == "USD "? " Dollars": " "}</span>
                    <span>{currencies.getCurrencyCode(currency) =="GBP "? " Pounds": " "}</span>
                    <span>{currencies.getCurrencyCode(currency) =="EUR "? " Euros": " "}</span>
                  <span>{(currencies.getCurrencyCode(currency)=== "NGN ")? " Naira": ""}</span>
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

                <div  style={generalStyle.divider2}></div>

<div style={generalStyle.termsStyle}  className= "forcePageBreak">

  <div><strong style={generalStyle.strong}>1. SERVICES &amp; DELIVERABLES.</strong></div>
<div>Seller agrees to provide to Company (or its subsidiaries, if such subsidiaries are designated as the contracting parties in the purchase order) (hereinafter referred
to as &ldquo;Company&rdquo;) the services ("Services") and/or goods (&ldquo;Goods&rdquo;), described in any purchase order, in accordance with these Terms and Conditions ("Agreement"). Upon acceptance of a purchase
order, shipment of Goods or commencement of a Service, Seller shall be bound by the provisions of this Agreement, including all provisions set forth on the face of any applicable purchase order,
whether Seller acknowledges or otherwise signs this Agreement or the purchase order, unless Seller objects to such terms in writing prior to shipping Goods or commencing Services.
This writing does not constitute a firm offer,and may be revoked at any time prior to acceptance. This Agreement may not be added to, modified, superseded, or otherwise altered, except by writing
signed by an authorized COMPANY representative. Any terms or conditions contained in any acknowledgment, invoice, or other communication of Seller, which are inconsistent with the terms and
conditions herein, are hereby rejected. To the extent that this Agreement might be treated as an acceptance of Seller&rsquo;s prior offer, such acceptance is expressly made on condition of assent by Seller
to the terms hereof and shipment of the Goods or beginning performance of any Services by Seller shall constitute such assent. COMPANY hereby reserves the right to reschedule any delivery or
cancel any purchase order issued at any time prior to shipment of the Goods or prior to commencement of any Services. COMPANY shall not be subject to any charges or other fees as a result of
such cancellation.</div>
<div><strong style={generalStyle.strong}>2. DELIVERY</strong></div>
<div> Time is of the essence. Delivery of Goods and Services shall be made pursuant to the schedule, via the carrier, and to the place specified on the face of the applicable purchase
order. COMPANY reserves the right to return, shipping charges collect, all Goods received in advance of the delivery schedule. If no delivery schedule is specified, the order shall be filled promptly
and delivery will be made by the most expeditious form of land transportation. If no method of shipment is specified in the purchase order, Seller shall use the least expensive carrier. In the event
Seller fails to deliver the Goods or Services within the time specified, COMPANY may, at its option, decline to accept performance and terminate the Agreement or may demand its allocable fair
share of Seller&rsquo;s available Goods and terminate the balance of the Agreement. Seller shall package all items in suitable containers to permit safe transportation and handling. Each delivered
container must be labeled and marked to identify contents without opening and all boxes and packages must contain packing sheets listing contents. COMPANY&rsquo;s purchase order number must
appear on all shipping containers, packing sheets, delivery tickets, and bills of lading.</div>
<div><strong style={generalStyle.strong}>3. IDENTIFICATION, RISK OF LOSS, &amp; DESTRUCTION OF GOODS.</strong></div>
<div>Seller assumes all risk of loss until receipt by COMPANY. Title to Goods shall pass to COMPANY upon receipt by it of the
Goods at the designated destination. If the Goods ordered are destroyed prior to title passing to COMPANY, COMPANY may at its option cancel the Agreement or require delivery of substitute
Goods of equal quantity and quality. Such delivery will be made as soon as commercially practicable. If loss of Goods is partial, COMPANY shall have the right to require delivery of the Goods not destroyed.</div>
<div><strong style={generalStyle.strong}>4. PAYMENT.</strong></div>
<div>As full consideration for the performance of the Services, delivery of the Goods and the assignment of rights to COMPANY as provided herein, COMPANY shall pay Seller (i) the
amount agreed upon and specified in the applicable purchase order, or (ii) Seller&rsquo;s quoted price on date of shipment (for Goods), or the date Services were started (for Services), whichever is lower.
Applicable taxes and other charges such as shipping costs, duties, customs, tariffs, imposts, and government-imposed surcharges shall be stated separately on Seller's invoice. Payment is made
when COMPANY's check is mailed. Payment shall not constitute acceptance. All personal property taxes assessable upon the Goods prior to receipt by COMPANY of Goods conforming to the
purchase order shall be borne by Seller. Seller shall invoice COMPANY for all Goods delivered and all Services actually performed. Each invoice submitted by Seller must be provided to Company
within ninety (90) days of completion of the Services or delivery of Goods and must reference the applicable purchase order, and COMPANY reserves the right to return all incorrect invoices.
COMPANY will receive a 5% discount of the invoiced amount for all invoices that are submitted more than ninety (90) days after completion of the Services or delivery of the Goods. Unless
otherwise specified on the face of a purchase order, COMPANY shall pay the invoiced amount within fourteen (14) days after receipt of a correct invoice. Seller will receive no royalty or other
remuneration on the production or distribution of any products developed by COMPANY or Seller in connection with or based on the Goods or Services provided. There will be penalty for late
delivery of goods. Furthermore, goods must be delivered in good conditions and signed off by RusselSmith Facilities and Services representative
.</div>
<div><strong style={generalStyle.strong}>5. WARRANTIES.</strong></div>
<div><strong style={generalStyle.strong}>5.1 Services:</strong></div> 
<div>Seller represents and warrants that all Services shall be completed in a professional, workmanlike manner, with the degree of skill and care that is required by current, good, and
sound professional procedures. Further, Seller represents and warrants that the Services shall be completed in accordance with applicable specifications and shall be correct and appropriate for the
purposes contemplated in this Agreement. Seller represents and warrants that the performance of Services under this Agreement will not conflict with, or be prohibited in any way by, any other
agreement or statutory restriction to which Seller is bound.</div>
<div><strong style={generalStyle.strong}>5.2 Goods:</strong></div>
<div> Seller warrants that all Goods provided will be new and will not be used or refurbished except otherwise stated. Seller warrants that all Goods delivered shall be free from defects in
materials and workmanship and shall conform to all applicable specifications for a period of twelve (12) months from the date of delivery to COMPANY or for the period provided in Seller&rsquo;s standard
warranty covering the Goods, whichever is longer. Additionally, Goods purchased shall be subject to all written and oral express warranties made by Seller&rsquo;s agents. All warranties and Service
guaranties shall run both to COMPANY and to its customers. If COMPANY identifies a warranty problem with the Goods during the warranty period, COMPANY will promptly notify Seller of such
problems and will return the Goods to Seller, at Seller&rsquo;s expense. Within five (5) business days of receipt of the returned Goods, Seller shall, at COMPANY&rsquo;s option, either repair or replace such
Goods, or credit COMPANY&rsquo;s account for the same. Replacement and repaired Goods shall be warranted for the remainder of the warranty period or six (6) months, whichever is longer.</div>
<div><strong style={generalStyle.strong}>6. INSPECTION.</strong></div>
<div>COMPANY shall have a reasonable time after receipt of Goods or Service deliverables and before payment to inspect them for conformity hereto, and performance hereunder shall
not be deemed accepted until COMPANY has run an adequate test to determine whether the Goods and Services conform to the specifications hereof. Use of a portion of the Goods for the purpose
of testing shall not constitute an acceptance of the Goods. If performance tendered does not wholly conform with the provisions hereof, COMPANY shall have the right to reject such performance.
Nonconforming Goods will be returned to Seller freight collect and risk of loss will pass to Seller upon COMPANY&rsquo;s delivery to the common carrier.</div>
<div><strong style={generalStyle.strong}>7. INDEPENDENT CONTRACTOR.</strong></div>
<div>COMPANY is interested only in the results obtained under this Agreement; the manner and means of achieving the results are subject to Seller's sole control.
Seller is an independent contractor for all purposes, without express or implied authority to bind COMPANY by contract or otherwise. Neither Seller nor its employees, agents or subcontractors
("Seller&rsquo;s Assistants") are agents or employees of COMPANY, and therefore are not entitled to any employee benefits of COMPANY, including but not limited to, any type of insurance. Seller shall be
responsible for all costs and expenses incident to performing its obligations under this Agreement and shall provide Seller's own supplies and equipment.</div>
<div><strong style={generalStyle.strong}>8. SELLER RESPONSIBLE FOR TAXES AND RECORDS.</strong></div>
<div>Seller shall be solely responsible for filing the appropriate federal, state and local tax forms and paying all such taxes or fees, including
estimated taxes and employment taxes, due with respect to Seller's receipt of payment under this Agreement. Seller further agrees to provide COMPANY with reasonable assistance in the event of
a government audit. COMPANY shall have no responsibility to pay or withhold from any payment to Seller under this Agreement, any federal, state, or local taxes or fees. COMPANY will regularly
report amounts paid to Seller by filing
forms
with the Federal Internal Revenue Service.</div>
<div><strong style={generalStyle.strong}>9. INSURANCE.</strong></div>
<div>Seller shall be solely responsible for maintaining and requiring Seller&rsquo;s Assistants to maintain such adequate health, auto, workers' compensation, unemployment compensation,
disability, liability, and other insurance, as is required by law or as is the common practice in Seller's and Seller's Assistants' trades or businesses, whichever affords greater coverage. Upon request,
Seller shall provide COMPANY with certificates of insurance or evidence of coverage before commencing performance under this Agreement. Seller shall provide adequate coverage for any
COMPANY property under the care, custody or, control of Seller or Seller's Assistants.</div>
<div><strong style={generalStyle.strong}>10. INDEMNITY.</strong></div>
<div>Seller shall indemnify, hold harmless, and at COMPANY's request, defend COMPANY, its officers, directors, customers, agents and employees, against all claims, liabilities,
damages, losses, and expenses, including attorneys' fees and cost of suit arising out of or in any way connected with the Goods or Services provided under this Agreement, including, without
limitation, (i) any claim based on the death or bodily injury to any person, destruction or damage to property, or contamination of the environment and any associated clean up costs, (ii) Seller failing
to satisfy the Internal Revenue Service&rsquo;s guidelines for an independent contractor, (iii) any claim based on the negligence, omissions, or willful misconduct of Seller or any Seller&rsquo;s Assistants, and (iv)
any claim by a third party against COMPANY alleging that the Goods or Services, the results of such Services, or any other products or processes provided under this Agreement, infringe a patent,
copyright, trademark, trade secret, or other proprietary right of a third party, whether such are provided alone or in combination with other products, software, or processes. Seller shall not settle any
such suit or claim without COMPANY's prior written approval. Seller agrees to pay or reimburse all costs that may be incurred by COMPANY in enforcing this indemnity, including attorneys' fees.
Should COMPANY&rsquo;s use, or use by its distributors, subcontractors, or customers, of any Goods or Services purchased from Seller be enjoined, be threatened by injunction, or be the subject of any
legal proceeding, Seller shall, at its sole cost and expense, either (a) substitute fully equivalent non-infringing Goods or Services; (b) modify the Goods or Services so that they no longer infringe but
remain fully equivalent in functionality; (c) obtain for COMPANY, its distributors, subcontractors, or customers the right to continue using the Goods or Services; or (d) if none of the foregoing is
possible, refund all amounts paid for the infringing Goods or Services.</div>
<div><strong style={generalStyle.strong}>11. CONFIDENTIALITY.</strong></div>
<div>Seller will acquire knowledge of COMPANY Confidential Information (as defined below) in connection with its performance hereunder and agrees to keep such COMPANY
Confidential Information in confidence during and following termination or expiration of this Agreement. "COMPANY Confidential Information" includes but is not limited to all information, whether
written or oral, in any form, including without limitation, information relating to the research, development, products, methods of manufacture, trade secrets, business plans, customers, vendors,
finances, personnel data, Work Product (as defined herein), and other material or information considered proprietary by COMPANY relating to the current or anticipated business or affairs of
COMPANY which is disclosed directly or indirectly to Seller. In addition, COMPANY Confidential Information means any third party's proprietary or confidential information disclosed to Seller in the
course of providing Services or Goods to COMPANY. COMPANY Confidential Information does not include any information (i) which Seller lawfully knew without restriction on disclosure before
COMPANY disclosed it to Seller, (ii) which is now or becomes publicly known through no wrongful act or failure to act of Seller, (iii) which Seller developed independently without use of the
COMPANY Confidential Information, as evidenced by appropriate documentation, or (iv) which is hereafter lawfully furnished to Seller by a third party as a matter of right and without restriction on
disclosure. In addition, Seller may disclose Confidential Information which is required to be disclosed pursuant to a requirement of a government agency or law so long as Seller provides prompt
notice to COMPANY of such requirement prior to disclosure.
Seller agrees not to copy, alter, or directly or indirectly disclose any COMPANY Confidential Information. Additionally, Seller agrees to limit its internal distribution of COMPANY Confidential
Information to Seller's Assistants who have a need to know, and to take steps to ensure that the dissemination is so limited, including the execution by Seller's Assistants of nondisclosure
agreements with provisions substantially similar to those set forth herein. In no event will Seller use less than the degree of care and means that it uses to protect its own information of like kind, but
in any event not less than reasonable care to prevent the unauthorized use of COMPANY Confidential Information

Seller further agrees not to use the COMPANY Confidential Information except in the course of performing hereunder and will not use such COMPANY Confidential Information for its own benefit or
for the benefit of any third party. The mingling of the COMPANY Confidential Information with information of Seller shall not affect the confidential nature or ownership of the same as stated
hereunder. Seller agrees not to design or manufacture any products which incorporate COMPANY Confidential Information. All COMPANY Confidential Information is and shall remain the property of
COMPANY. Upon COMPANY's written request or the termination of this Agreement, Seller shall return, transfer, or assign to COMPANY all COMPANY Confidential Information, including all Work
Product, as defined herein, and all copies thereof.</div>
<div><strong style={generalStyle.strong}>12. OWNERSHIP OF WORK PRODUCT.</strong></div>
<div>progress, Service deliverables, inventions, products, computer programs, procedures, improvements, developments, drawings, notes, documents, information and materials made, conceived, or
developed by Seller, alone or with others, which result from or relate to the Services performed hereunder. Standard Goods manufactured by Seller and sold to COMPANY without having been
designed, customized, or modified for COMPANY do not constitute Work Product. All Work Product shall at all times be and remain the sole and exclusive property of COMPANY. Seller hereby
agrees to irrevocably assign and transfer to COMPANY and does hereby assign and transfer to COMPANY all of its worldwide right, title, and interest in and to the Work Product including all
associated intellectual property rights. COMPANY will have the sole right to determine the treatment of any Work Product, including the right to keep it as trade secret, execute and file patent
applications on it, to use and disclose it without prior patent application, to file registrations for copyright or trademark in its own name, or to follow any other procedure that COMPANY deems
appropriate. Seller agrees: (a) to disclose promptly in writing to COMPANY all Work Product in its possession; (b) to assist COMPANY in every reasonable way, at COMPANY's expense, to secure,
perfect, register, apply for, maintain, and defend for COMPANY's benefit all copyrights, patent rights, mask work rights, trade secret rights, and all other proprietary rights or statutory protections in
and to the Work Product in COMPANY&rsquo;s name as it deems appropriate; and (c) to otherwise treat all Work Product as COMPANY Confidential Information as described above. These obligations to
disclose, assist, execute, and keep confidential survive the expiration or termination of this Agreement. All tools and equipment supplied by COMPANY to Seller shall remain the sole property of
COMPANY.
Seller will ensure that Seller's Assistants appropriately waive any and all claims and assign to COMPANY any and all rights or any interests in any Work Product or original works created in
connection with this Agreement. Seller irrevocably agrees not to assert against COMPANY or its direct or indirect customers, assignees, or licensees any claim of any intellectual property rights of
Seller affecting the Work Product.
COMPANY will not have rights to any works conceived or reduced to practice by Seller which were developed entirely on Seller's own time without using equipment, supplies, facilities, or trade
secret or COMPANY Confidential Information, unless (i) such works relate to COMPANY's business, or COMPANY's actual or demonstrably anticipated research or development, or (ii) such works
result from any Services performed by Seller for COMPANY.</div>
<div><strong style={generalStyle.strong}>13. NON-INTERFERENCE WITH BUSINESS.</strong></div>
<div>During and for a period of two years immediately after the termination or expiration of this Agreement, Seller agrees not to unlawfully interfere with the
business of COMPANY in any manner, and further agrees not to solicit or induce any employee or independent contractor to terminate or breach an employment, contractual, or other relationship
with COMPANY.</div>
<div><strong style={generalStyle.strong}>14. TERMINATION.</strong></div>
<div>COMPANY may terminate this Agreement upon written notice to Seller if Seller fails to perform or otherwise breaches this Agreement, files a petition in bankruptcy, becomes
insolvent, or dissolves. In the event of such termination, COMPANY shall pay Seller for the portion of the Services satisfactorily performed and those conforming Goods delivered to COMPANY
through the date of termination, less appropriate offsets, including any additional costs to be incurred by COMPANY in completing the Services.
COMPANY may terminate this Agreement for any other reason upon thirty (30) days' written notice to Seller. Seller shall cease to perform Services and/or provide Goods under this Agreement on
the date of termination specified in such notice. In the event of such termination, COMPANY shall be liable to Seller only for those Services satisfactorily performed and those conforming Goods
delivered to COMPANY through the date of termination, less appropriate offsets.
Upon the expiration or termination of this Agreement for any reason: (a) each party will be released from all obligations to the other arising after the date of expiration or termination, except for those
which by their terms survive such termination or expiration; and (b) Seller will promptly notify COMPANY of all COMPANY Confidential Information or any Work Product in Seller&rsquo;s possession and, at
the expense of Seller and in accordance with COMPANY&rsquo;s instructions, will promptly deliver to COMPANY all such COMPANY Confidential Information and/or Work Product.</div>
<div><strong style={generalStyle.strong}>15. REMEDIES.</strong></div>
<div>If Seller breaches this Agreement, COMPANY shall have all remedies available by law and at equity. For the purchase of Goods, Seller&rsquo;s sole remedy in the event of breach of this
Agreement by COMPANY shall be the right to recover damages in the amount equal to the difference between market price at the time of breach and the purchase price specified in the Agreement.
No alternate method of measuring damages shall apply to this transaction. Seller shall have no right to resell Goods for COMPANY&rsquo;s account in the event of wrongful rejection, revocation of
acceptance, failure to make payment or reprepudiation by COMPANY and any resale so made shall be for the account of Seller.</div>
<div><strong style={generalStyle.strong}>16. FORCE MAJEURE.</strong></div>
<div>COMPANY shall not be liable for any failure to perform including failure to (i) accept performance of Services or, (ii) take delivery of the Goods as provided caused by
circumstances beyond its control which make such performance commercially impractical including, but not limited to, acts of God, fire, flood, acts of war, government action, accident, labor
difficulties or shortage, inability to obtain materials, equipment, or transportation. In the event COMPANY is so excused, either party may terminate the Agreement and COMPANY shall at its
expense and risk, return any Goods received to the place of shipment.</div>
<div><strong style={generalStyle.strong}>17. ATTORNEYS' FEES.</strong></div>
<div>In any action to enforce this Agreement, the prevailing party shall be entitled to recover all court costs and expenses and reasonable attorneys' fees, in addition to any other
relief to which it may be entitled.</div>
<div><strong style={generalStyle.strong}>18. SEVERABILITY.</strong></div>
<div>If any provision of this Agreement shall be deemed to be invalid, illegal or unenforceable, the validity, legality, and enforceability of the remaining provisions shall not in any way
be affected or impaired thereby.</div>
<div><strong style={generalStyle.strong}>19. LIMITATION OF LIABILITY.</strong></div>
<div>IN NO EVENT SHALL COMPANY BE LIABLE TO SELLER OR SELLER'S ASSISTANTS, OR ANY THIRD PARTY FOR ANY INCIDENTAL, INDIRECT, SPECIAL,
OR CONSEQUENTIAL DAMAGES ARISING OUT OF, OR IN CONNECTION WITH, THIS AGREEMENT, WHETHER OR NOT COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE, AND WHETHER OR NOT THERE IS A FAILURE OF ANY AGREED REMEDY.</div>
<div><strong style={generalStyle.strong}>20. ASSIGNMENT; WAIVER.</strong></div>
<div>Seller may not assign this Agreement or any of its rights or obligations under this Agreement, without the prior written consent of COMPANY. Any assignment or
transfer without such written consent shall be null and void. A waiver of any default hereunder or of any term or condition of this Agreement shall not be deemed to be a continuing waiver or a waiver
of any other default or any other term or condition.</div>
<div><strong style={generalStyle.strong}>21. NONEXCLUSIVE AGREEMENT.</strong></div>
<div>This is not an exclusive agreement. COMPANY is free to engage others to perform Services or provide Goods the same as or similar to Seller's. Seller is free
to, and is encouraged to, advertise, offer, and provide Seller's Services and/or Goods to others; provided however, that Seller does not breach this Agreement.</div>
<div><strong style={generalStyle.strong}>22. NOTICES.</strong></div>
<div>Except for Purchase Orders which may be sent by local mail, facsimile transmission, or electronically transmitted,, all notices, and other communications hereunder shall be in writing,
nd shall be addressed to Seller or to an authorized COMPANY representative, and shall be considered given when (a) delivered personally, (b) sent by confirmed telex or facsimile, (c) sent by
commercial overnight courier with written verification receipt, or (d) three (3) days after having been sent, postage prepaid, by first class or certified mail.</div>
<div><strong style={generalStyle.strong}>23. SURVIVAL OF OBLIGATIONS.</strong></div>
<div>Any obligations and duties which by their nature extend beyond the expiration or termination of this Agreement shall survive the expiration or termination of this
Agreement.</div>
<div><strong style={generalStyle.strong}>24. GOVERNING LAW.</strong></div>
<div>This Agreement shall be construed in accordance with, and disputes shall be governed by, the laws of the Federal Republic of Nigeria excluding its conflict of law rules.
Jurisdiction and venue over all controversies arising out of, or relating to, this Agreement shall be in Nigeria. The applicability of the UN Convention on Contracts for the International Sale of Goods is
hereby expressly waived by the parties and it shall not apply to the terms and conditions of this Agreement.</div>
<div><strong style={generalStyle.strong}>25. ENTIRE AGREEMENT; MODIFICATION.</strong></div>
<div>This Agreement is the complete, final, and exclusive statement of the terms of the agreement between the parties and supersedes any and all other
prior and contemporaneous negotiations and agreements, whether oral or written, between them relating to the subject matter hereof. This Agreement may not be varied, modified, altered, or
amended except in writing, including a purchase order or a change order issued by COMPANY, signed by the parties. The terms and conditions of this Agreement shall prevail notwithstanding any
variance with the terms and conditions of any acknowledgment or other document submitted by Seller. Notwithstanding the foregoing, this Agreement will not supersede or take the place of any
written agreement which is signed by both parties and covers the same subject matter as this Agreement or its related purchase orders.</div>
<div><strong style={generalStyle.strong}>26. COMPLIANCE WITH LAWS.</strong></div>
<div><strong style={generalStyle.strong}>26.1 General:</strong></div>
<div>Seller shall comply fully with all applicable federal, state, and local laws in the performance of this Agreement including, but not limited to, all applicable employment, tax, export
control, and environmental laws.</div>
<div><strong style={generalStyle.strong}>26.3 Hazardous Materials:</strong></div>
<div>If Goods include hazardous materials, Seller represents and warrants that Seller understands the nature of any hazards associated with the manufacture, handling, and
transportation of such hazardous materials</div>
<div><strong style={generalStyle.strong}>26.4 Customs:</strong></div>
<div>Upon COMPANY&rsquo;s request, Seller will promptly provide COMPANY with a statement of origin for all Nigerian Customs documentation for Goods wholly or partially manufactured
outside of the Nigeria.</div>
<div><strong style={generalStyle.strong}>27. INJUNCTIVE RELIEF.</strong></div>
<div>Seller acknowledges and agrees that the obligations and promises of Seller under this Agreement are of a unique, intellectual nature giving them particular value. Seller's
breach of any of the promises contained in this Agreement will result in irreparable and continuing damage to COMPANY for which there will be no adequate remedy at law and, in the event of such
breach, COMPANY will be entitled to seek injunctive relief, or a decree of specific performance.</div>
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
