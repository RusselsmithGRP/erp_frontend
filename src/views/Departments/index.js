import React from "react";
// @material-ui/core components
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
import * as departmentAction from "../../actions/department";
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

class Index extends React.Component {
  state = {
    data: {},
    users: [],
    validationState : {
      name: '',
      code: '',
      slug:'',
  },
  responseMessage:[]
  };

  validate = (type, value) => {
    switch (type) {
      case "name":
        const name = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            name
          }
        });
        break;
        case "slug":
        const slug = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            slug
          }
        });
        break;
        case "code":
        const code = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            code
          }
        });
        break;

    }
}   

  handleChange = event => {
    this.validate(event.target.id, event.target.value);
    let data = this.state.data;
    data[[event.target.id]] = event.target.value;
    this.setState({
      data: data
    });
  }

  handleChangeSelect = e => {
    this.validate(e.target.id, e.target.value);
    let data = this.state.data;
    data[[e.target.name]] = e.target.value;
    this.setState({
      data: data
    });
  }

  /* handleSubmit = () => {
    departmentAction.updateDepartment(this.props, this.state.data, (json)=>{
        this.setState({responseMessage:json});          
    }) 
  } */

  componentDidMount() {
    departmentAction.findDepartmentById(this.props, this.props.match.params.id,(json)=>{
      this.setState({data: json[0]})
    });
    userAction.findAllStaff(this.props, (json)=>{
        this.setState({users:json});
    });
  }

  submitForm = ()=>{
      departmentAction.saveDepartment(this.props.user.token, this.props.match.params.id, this.state.data,  (result)=>{
        if(result.ok && result.statusText == "OK" && result.status == 200 ) {
          alert("Data Saved");
        }
      });
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
        {this.state.responseMessage.success === true ? (
            <Notification
              error={false}
              message={this.state.responseMessage.message}
            />
          ) : (
            ""
          )}
          <GridItem xs={12} sm={12} md={8}>
            <form>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{this.state.data.name}</h4>
                </CardHeader>
                <CardBody>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e)=>this.handleChange(e),
                          value: this.state.data.name,
                          labelText:"Name",
                            }}
                            error={
                              this.state.validationState.name === ""
                                ? ""
                                : this.state.validationState.name
                            }
                            success={
                              this.state.validationState.name === ""
                                ? ""
                                : !this.state.validationState.name
                            }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        id="slug"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e)=>this.handleChange(e),
                          value: this.state.data.slug,
                          labelText: "slug"
                                                }}
                                                error={
                                                  this.state.validationState.slug === ""
                                                    ? ""
                                                    : this.state.validationState.slug
                                                }
                                                success={
                                                  this.state.validationState.slug === ""
                                                    ? ""
                                                    : !this.state.validationState.slug
                                                }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect labelText="Staff" name="hod" id="hod" 
                        required
                        value={this.state.data.hod}
                        onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal",
                          id: "hod"
                        }}
                      >
                        {this.state.users.map(function(data, key) {
                          return (
                            <MenuItem
                              name="department"
                              key={key}
                              value={data._id}
                            >
                              {data.lastname + " "+ data.firstname }
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                  </Grid>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.submitForm}>
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </Grid>
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

export default connect(mapStateToProps)(withStyles(styles)(Index));