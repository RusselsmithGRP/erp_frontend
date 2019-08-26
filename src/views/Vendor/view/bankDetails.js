import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";


const BankDetails = ({data}) => {
 
    return  (
      <Grid container>
      <GridItem xs={12} sm={12} md={12}>
      <form noValidate autoComplete="off">
        <Card>
            <CardBody>
            <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Account Name" id="account_name" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        value:data.account_name,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Account Number" id="account_number" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        value:data.account_number,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Bank" id="bank" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        value:data.bank,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Sort Code" id="sort_code" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        value:data.sort_code,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Branch" id="branch" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        value:data.branch,disabled: true
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput labelText="Contact Phone" id="contact_phone" required
                      formControlProps={{
                        fullWidth: true
                      }} inputProps={{
                        value:data.contact_phone,disabled: true
                      }}
                    />
                </GridItem>
            </Grid>
            </CardBody>  
            </Card>
            </form>
          </GridItem>
        </Grid>
    )
  }


export default BankDetails;
