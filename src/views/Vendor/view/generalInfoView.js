import React from "react";
import Grid from '@material-ui/core/Grid';
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";

const GeneralInfoView =({data}) => {
    console.log(data, "data")
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
          <form autoComplete="off">
            <Card>
              <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Name"
                    formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.company_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Registration Number" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.reg_no
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput labelText="Office Address" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.office_address
                    }}
                  />                    
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="City" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="State" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.state
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Country" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.country
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Telephone" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.coy_phone
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Company Email" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.coy_email
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Website" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.website
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Person" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.contact_name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Designation" formControlProps={{
                      fullWidth: true
                    }} inputProps={{
                      disabled: true,
                      value: data.designation
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Telephone" id="contact_phone"  formControlProps={{
                      fullWidth: true
                    }} inputProps={{disabled: true,
                      value: data.contact_phone}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Email" id="contact_email"  formControlProps={{
                      fullWidth: true }} inputProps={{ disabled: true,
                        value: data.contact_email}}
                  />
                </GridItem>
              </Grid>
              </CardBody>
            </Card>
            </form>
          </GridItem>
        </Grid>
      </div>
    )
}


export default  GeneralInfoView;
