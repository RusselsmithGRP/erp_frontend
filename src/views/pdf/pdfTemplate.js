import React from "react";
import generalStyle from "../../assets/jss/material-dashboard-pro-react/generalStyle.jsx";
import moment from "moment";
import logo from "../../assets/img/rs-logo.png";

export default class PdfTemplate extends React.Component {
  image;

  render() {
    return (
      <div>
        <div style={generalStyle.header}>
          <table style={generalStyle.PO}>
            <tbody>
              <tr>
                <td rowSpan="2" width="20%" style={generalStyle.POTopth}>
                  <img
                    ref={(image) => (this.image = image)}
                    src={logo}
                    height="60px"
                  />
                </td>
                <td colSpan="2" style={generalStyle.POTopth}>
                  <center>
                    <span style={generalStyle.text11}>
                      ISO 9001:2015 & ISO 45001:2018
                    </span>
                    <br />
                    <span style={generalStyle.text13}>
                      PROCUREMENT MANAGEMENT SYSTEM PROCEDURES
                    </span>
                    <br />
                    <span style={generalStyle.text14}>
                      RS-CPD-PMG-PUR-P-10106 PROCUREMENT
                    </span>
                  </center>
                </td>
              </tr>
              <tr>
                <td style={generalStyle.text5} width="60%">
                  Revision: 20
                </td>
                <td style={generalStyle.text6} width="40%">
                  Effective Date: 30 September 2020
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div style={generalStyle.POtitle}>
            RS-CPD-PMG-PUR-P-10106-4 PURCHASE ORDER FORM
          </div>
        </div>

        <div style={generalStyle.footer}>
          <div style={{ borderTop: "1px solid #000" }}>
            <span>RS-CPD-PMG-PUR-P-10106 Procurement</span>{" "}
            <span style={{ float: "right" }}>
              Unauthorized Printing Is Not Permitted
            </span>
          </div>
        </div>
      </div>
    );
  }
}
