import React from "react";
import record from "./records";
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
  
  importRecord = () => {
    for (var i = 0; i < record.length; i++) {
      let data = {};
      data.email = record[i].FIELD8;
      data.password = "password";
      data.coy_name = record[i].FIELD3;
      data.role = "vendor";
      data.classes = this.roman_to_int(record[i].FIELD11);
      data.contact_name = record[i].FIELD7;
      data.contact_phone = record[i].FIELD10;
      data.office_address = record[i].FIELD4;
      data.state = record[i].FIELD6;
      data.country = record[i].FIELD5;
      data.website = record[i].FIELD9;
      data.product_related = record[i].FIELD1;
      data.supplier_id = record[i].FIELD2;
      userAction.importUser(data, json => {
        this.setState({ responseMessage: json });
      });
    }
  };

  render() {
    // const recordData = record.map((data) => {
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
        <button onClick={this.importRecord}>Click</button>
      </div>
    );
  }
}
