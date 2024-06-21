import React from "react";
import records from "./records";
import * as userAction from "../../actions/user";
import Notification from "../Notifications/Index.jsx";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: {}
    };
  }
  componentDidMount() {}
  roman_to_int = c => {
    switch (c) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return "";
    }
  };
  importrecords = () => {
    for (var i = 0; i < records.length; i++) {
      let data = {};
      data.email = records[i].FIELD8;
      data.password = "password";
      data.coy_name = records[i].FIELD3;
      data.role = "vendor";
      data.classes = this.roman_to_int(records[i].FIELD11);
      data.contact_name = records[i].FIELD7;
      data.contact_phone = records[i].FIELD10;
      data.office_address = records[i].FIELD4;
      data.state = records[i].FIELD5;
      data.country = records[i].FIELD6;
      data.website = records[i].FIELD9;
      data.product_related = records[i].FIELD1;
      data.supplier_id = records[i].FIELD2;
      userAction.importUser(data, json => {
        this.setState({ responseMessage: json });
      });
    }
  };
  render() {
    // const recordsData = records.map((data) => {
    //     return (
    //         <div>
    //         <p>
    //             <strong>Contact Person </strong>{data.FIELD6}
    //         </p>
    //         <p>
    //             <strong>Contact email </strong>{data.FIELD7}
    //         </p>
    //         </div>
    //     );
    // })
    return (
      <div>
        {this.state.responseMessage ? (
          <Notification
            error={!this.state.responseMessage.success}
            message={this.state.responseMessage.message}
          />
        ) : (
          ""
        )}
        <h2>records</h2>
        <button onClick={this.importrecords}>Click</button>
      </div>
    );
  }
}
