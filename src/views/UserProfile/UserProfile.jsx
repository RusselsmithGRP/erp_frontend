import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/faces/marc.jpg";
import { connect } from "react-redux";
import * as userAction from "../../actions/user";
import helpers from "../helpers";
import Notification from "../Notifications/Index.jsx";

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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      data: {
        email: props.user.email,
        id: props.user._id,
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        eid: props.user.eid,
        department: props.user.department,
        role: props.user.role,
        city: props.user.city
      },
      ValidationState: {
        lastname: "",
        firstname: "",
        email: "",
        eid: "",
        role: "",
        department: ""
      },
      submitButtonState: false,
      responseMessage: [],
      isEnabled: false
    }),
      (this.enableEdit = this.enableEdit.bind(this)),
      (this.handleChange = this.handleChange.bind(this));
  }

  enableEdit() {
    let isTrue = true;
    this.setState({
      isEnabled: isTrue
    });
  }

  handleChange = event => {
    if (this.state.isEnabled === true) {
      let data = this.state.data;
      data[[event.target.id]] = event.target.value;
      this.setState({
        data: data
      });
      this.validate(event.target.id, event.target.value);
    }
  };

  handleSave = e => {
    e.preventDefault();
    this.props.sendUserData(this);
  };

  validate = (type, value) => {
    switch (type) {
      case "lastname":
        const lastname = helpers.isEmpty(value) ? false : true;
        this.setState({
          ValidationState: {
            ...this.state.ValidationState,
            lastname
          }
        });
        break;
      case "firstname":
        const firstname = helpers.isEmpty(value) ? false : true;
        this.setState({
          ValidationState: {
            ...this.state.ValidationState,
            firstname
          }
        });
        break;
      case "email":
        const email = helpers.isEmail(value) ? false : true;
        this.setState({
          ValidationState: {
            ...this.state.ValidationState,
            email
          }
        });
        break;
      case "eid":
        const eid = helpers.isEmpty(value) ? false : true;
        this.setState({
          ValidationState: {
            ...this.state.ValidationState,
            eid
          }
        });
        break;
      case "city":
        const city = helpers.isEmpty(value) ? false : true;
        this.setState({
          ValidationState: {
            ...this.state.ValidationState,
            city
          }
        });
    }
  };
  //function UserProfile(props) {
  render() {
    const { classes, data } = this.props;
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
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  {this.state.data.role == "vendor" ? (
                    ""
                  ) : (
                    <div>
                      <strong>Dept: </strong>{" "}
                      <span>{this.state.data.department}</span>
                    </div>
                  )}
                  <Grid container>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Lastname"
                        id="lastname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.data.lastname
                        }}
                        error={
                          this.state.ValidationState.lastname === ""
                            ? ""
                            : this.state.ValidationState.lastname
                        }
                        success={
                          this.state.ValidationState.lastname === ""
                            ? ""
                            : !this.state.ValidationState.lastname
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="First Name"
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.data.firstname
                        }}
                        error={
                          this.state.ValidationState.firstname === ""
                            ? ""
                            : this.state.ValidationState.firstname
                        }
                        success={
                          this.state.ValidationState.firstname === ""
                            ? ""
                            : !this.state.ValidationState.firstname
                        }
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Email address"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.data.email,
                          readOnly: true
                        }}
                      />
                    </GridItem>
                  </Grid>
                  <Grid container>
                    {this.state.data.role == "vendor" ? (
                      ""
                    ) : (
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="EID"
                          id="eid"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.handleChange,
                            value: this.state.data.eid,
                            readOnly: true
                          }}
                          error={
                            this.state.ValidationState.eid === ""
                              ? ""
                              : this.state.ValidationState.eid
                          }
                          success={
                            this.state.ValidationState.eid === ""
                              ? ""
                              : !this.state.ValidationState.eid
                          }
                        />
                      </GridItem>
                    )}
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Role"
                        id="role"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.data.role,
                          readOnly: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.data.city,
                          readOnly: true
                        }}
                      />
                    </GridItem>
                  </Grid>
                </form>
              </CardBody>
              <CardFooter>
                <Button color="success" onClick={this.enableEdit}>
                  Edit
                </Button>
                <Button color="primary" onClick={this.handleSave}>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardBody profile>
                <Button
                  color="primary"
                  round
                  to="/changepassword"
                  component={Link}
                >
                  Change Password
                </Button>
              </CardBody>
            </Card>
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

function mapDispatchToProps(dispatch) {
  return {
    sendUserData(e) {
      let data = e.state.data;
      userAction.updateProfile(data, json => {
        e.setState({ responseMessage: json });
      });
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
