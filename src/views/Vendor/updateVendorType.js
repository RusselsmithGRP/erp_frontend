import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomSelect from "../../components/CustomInput/CustomSelect.jsx";
import * as userAction from "../../actions/user";
import * as genericActions from "../../actions/generic.js";
import { connect } from "react-redux";
import Notification from "../Notifications/Index.jsx";
import helpers from "../helpers";
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
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

export class updateVendorType extends Component {
  render() {
    return (
      <div style={{ fontFamily: styles.cardTitleWhite.fontFamily }}>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <form>
              <Card>
                <CardHeader color="primary">
                  <h4 className={{ color: styles.cardTitleWhite.color }}>
                    Add a User
                  </h4>
                </CardHeader>
                <CardBody>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Department"
                        name="department"
                        required
                        // value={this.state.data.department}
                        // onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                        // error={
                        //   this.state.validationState.department === ""
                        //     ? ""
                        //     : this.state.validationState.email
                        // }
                        // success={
                        //   this.state.validationState.email === ""
                        //     ? ""
                        //     : !this.state.validationState.email
                        // }
                      >
                        {/* {this.state.optionsDepartment.map(function(data, key) {
                          return (
                            <MenuItem
                              name="department"
                              key={key}
                              value={data._id}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })} */}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Role"
                        name="role"
                        required
                        // value={this.state.data.role}
                        // onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                      >
                        {/* {this.state.optionsRole.map(function(data, key) {
                          return (
                            <MenuItem name="role" key={key} value={data.slug}>
                              {data.name}
                            </MenuItem>
                          );
                        })} */}
                      </CustomSelect>
                    </GridItem>
                  </Grid>
                </CardBody>
                <CardFooter>
                  <Button color="primary">Update</Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default updateVendorType;
