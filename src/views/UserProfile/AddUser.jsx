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

const Types = [
  { name: "Executive Chairman", value: "executive manager" },
  { name: "CEO", value: "ceo" },
  { name: "Head Of Department", value: "hod" },
  { name: "Manager", value: "manager" },
  { name: "Staff", value: "staff" }
];

class AddUser extends React.Component {
  state = {
    data: {
      type: "",
      lastname: "",
      firstname: "",
      email: "",
      eid: "",
      department: "",
      line_manager: ""
    },
    responseMessage: "",
    optionsRole: [],
    optionsDepartment: [],
    validationState: {
      lastname: "",
      firstname: "",
      email: "",
      eid: "",
      role: "",
      department: ""
    },
    submitButtonState: false,
    users: []
  };

  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value;
    this.setState({
      data: data
    });
    this.validate(event.target.id, event.target.value);
  };

  handleChangeSelect = e => {
    let data = this.state.data;
    data[[e.target.name]] = e.target.value;
    this.setState({
      data: data
    });
    if (e.target.name == "line_manager") {
      userAction.findManagers(this.props.user.token, users => {
        this.setState({ users });
      });
    }
    this.validate(event.target.id, event.target.value);
  };

  validate = (type, value) => {
    switch (type) {
      case "lastname":
        const lastname = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            lastname
          }
        });
        break;
      case "firstname":
        const firstname = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            firstname
          }
        });
        break;
      case "email":
        const email = helpers.isEmail(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            email
          }
        });
        break;
      case "eid":
        const eid = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            eid
          }
        });
        break;
      case "department":
        const department = helpers.isEmpty(value) ? false : true;
        this.setState({
          validationState: {
            ...this.state.validationState,
            department
          }
        });
        break;
      case "role":
        const role = helpers.isEmpty(value) ? false : true;
        // this.setState({
        //   validationState: {
        //     ...this.state.validationState,
        //     role
        //   }
        // });

        this.setState(state => ({
          validationState: {
            ...state.validationState,
            role
          }
        }));
    }
  };

  getformData = e => {
    let data = this.state.data;
    //let validationState = this.state.validationState;
    userAction.addUser(this.props, data, json => {
      if (json.success) {
        this.setState({
          responseMessage: json.message,
          data: json.user,
          validationState: {}
        });
      } else {
        this.setState({
          responseMessage: json.message,
          validationState: {}
        });
      }
    });
    //this.setState({submitButtonState: true})
  };
  componentDidMount() {
    genericActions.fetchAll("departments", this.props.user.token, items => {
      this.setState({ optionsDepartment: items });
    });
    genericActions.fetchAll("roles", this.props.user.token, items => {
      this.setState({ optionsRole: items });
    });
    userAction.findManagers(this.props.user.token, users => {
      this.setState({ users });
    });
  }

  render() {
    // console.log(this.state.data);
    // console.log(this.state.optionsRole);
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          {this.state.responseMessage ? (
            <Notification error={false} message={this.state.responseMessage} />
          ) : (
            ""
          )}
          <GridItem xs={12} sm={12} md={8}>
            <form>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Add a User</h4>
                </CardHeader>
                <CardBody>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Lastname"
                        id="lastname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: e => this.handleChange(e),
                          value: this.state.data.lastname
                        }}
                        error={
                          this.state.validationState.lastname === ""
                            ? ""
                            : this.state.validationState.lastname
                        }
                        success={
                          this.state.validationState.lastname === ""
                            ? ""
                            : !this.state.validationState.lastname
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Firstname"
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: e => this.handleChange(e),
                          value: this.state.data.firstname
                        }}
                        error={
                          this.state.validationState.firstname === ""
                            ? ""
                            : this.state.validationState.firstname
                        }
                        success={
                          this.state.validationState.firstname === ""
                            ? ""
                            : !this.state.validationState.firstname
                        }
                      />
                    </GridItem>
                  </Grid>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: e => this.handleChange(e),
                          value: this.state.data.email
                        }}
                        error={
                          this.state.validationState.email === ""
                            ? ""
                            : this.state.validationState.email
                        }
                        success={
                          this.state.validationState.email === ""
                            ? ""
                            : !this.state.validationState.email
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="EID"
                        id="eid"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: e => this.handleChange(e),
                          value: this.state.data.eid
                        }}
                        error={
                          this.state.validationState.eid === ""
                            ? ""
                            : this.state.validationState.eid
                        }
                        success={
                          this.state.validationState.eid === ""
                            ? ""
                            : !this.state.validationState.eid
                        }
                      />
                    </GridItem>
                  </Grid>
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Department"
                        name="department"
                        required
                        value={this.state.data.department}
                        onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                        error={
                          this.state.validationState.department === ""
                            ? ""
                            : this.state.validationState.department
                        }
                        success={
                          this.state.validationState.department === ""
                            ? ""
                            : !this.state.validationState.department
                        }
                      >
                        {this.state.optionsDepartment.map(function(data, key) {
                          return (
                            <MenuItem
                              name="department"
                              key={key}
                              value={data._id}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Role"
                        name="role"
                        required
                        value={this.state.data.role}
                        onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                      >
                        {this.state.optionsRole.map(function(data, key) {
                          return (
                            <MenuItem name="role" key={key} value={data.slug}>
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="Select Line Manager"
                        name="line_manager"
                        required
                        value={this.state.data.line_manager}
                        onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                      >
                        {this.state.users.map(function(data, key) {
                          return (
                            <MenuItem name="role" key={key} value={data._id}>
                              {data.firstname + " " + data.lastname}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
                        labelText="User Type"
                        name="type"
                        required
                        value={this.state.data.type}
                        onChange={e => this.handleChangeSelect(e)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          margin: "normal"
                        }}
                      >
                        {Types.map(function(data, key) {
                          return (
                            <MenuItem name="type" key={key} value={data.value}>
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </GridItem>
                  </Grid>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.getformData}>
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
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(withStyles(styles)(AddUser));
