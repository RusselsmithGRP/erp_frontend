import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomSelect from "../../../components/CustomInput/CustomSelect.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import Progress from "../../../components/Progress/Progress.jsx";
import { Services, Products } from "../params.js";
import FormLabel from "@material-ui/core/FormLabel";

class BusinessInfo extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <form noValidate autoComplete="off">
            <Card>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Year Established"
                      id="year_established"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.business_type
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Year Established"
                      id="year_established"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.year_established
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="No of Employee"
                      id="employee_no"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.employee_no
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormLabel component="legend">
                      Area(s) of Business that you wish to Register For :{" "}
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Year Established"
                      id="year_established"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.product_related
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Year Established"
                      id="year_established"
                      required
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.service_related
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="tax_no"
                      required
                      labelText="Tax Identification No (TIN)"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.tax_no
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="vat_no"
                      required
                      labelText="VAT Registration No (VAT)"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: data.vat_no
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

export default BusinessInfo;
