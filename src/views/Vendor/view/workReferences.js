import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";

class WorkReferences extends Component {
  render() {
    const { data } = this.props;
    return (
      <Grid container style={{ width: "100%" }}>
        <GridItem xs={12} sm={12} md={12}>
          <form noValidate autoComplete="off">
            <Card>
              <CardBody style={{ width: "100%" }}>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company Name"
                      id="coy_name"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.coy_name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company Address"
                      id="coy_address"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.coy_address
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Person"
                      id="contact_person"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.contact_person
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Designation"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.contact_designation
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.contact_email
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Contact Phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.contact_phone
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <h4 style={{ marginLeft: "20px" }}>Individual Reference.</h4>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.address
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.email
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.phone
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </form>
        </GridItem>
      </Grid>
    );
  }
}

export default WorkReferences;
