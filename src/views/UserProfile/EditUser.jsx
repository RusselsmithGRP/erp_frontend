import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomSelect from "../../components/CustomInput/CustomSelect.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "../../components/CustomButtons/Button.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import avatar from "../../assets/img/faces/marc.jpg";
import { connect } from "react-redux";
import * as userAction from "../../actions/user";
import * as genericActions from "../../actions/generic.js";

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

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      responseMessage: "",
      responseState: "",
      isEnabled: false,
      optionsDepartment: [],
      optionsRole: [],
      users: []
    };
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
    let data = this.state.data;
    data[[event.target.id]] = event.target.value;
    this.setState({
      data: data
    });
  };

  handleChangeSelect = e => {
    let data = this.state.data;
    data[[e.target.name]] = e.target.value;
    this.setState({
      data: data
    });
  };

  handleSave = e => {
    e.preventDefault();
    let data = this.state.data;
    userAction.updateProfile(data, json => {
      this.setState({
        responseState: json.success,
        responseMessage: json.message
      });
      if (this.state.responseMessage !== "") {
        alert("profile updated");
      }
    });
  };
  componentDidMount() {
    {
      {
        // debugger;
      }
    }
    userAction.getProfileDetails(
      this.props,
      this.props.match.params.id,
      json => {
        {
          {
            // debugger;
          }
        }
        this.setState({ data: json });
        //console.log(json)
      }
    );
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
    const { classes, data } = this.props;
    // console.log(this.state.data.type);
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Staff Profile </h4>
              </CardHeader>
              <CardBody>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="lastname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange.bind(this),
                          value: this.state.data.lastname
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange.bind(this),
                          value: this.state.data.firstname
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          value: this.state.data.email
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="eid"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange.bind(this),
                          value: this.state.data.eid
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomSelect
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
                    {this.state.data.type === "hod" ||
                    this.state.data.type === "ceo" ? (
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomSelect
                          labelText="Select Second Department (If ANY)"
                          name="department2"
                          value={this.state.data.department2}
                          onChange={e => this.handleChangeSelect(e)}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            margin: "normal"
                          }}
                        >
                          {this.state.optionsDepartment.map(function(
                            data,
                            key
                          ) {
                            return (
                              <MenuItem
                                name="department2"
                                key={key}
                                value={data._id}
                              >
                                {data.name}
                              </MenuItem>
                            );
                          })}
                        </CustomSelect>
                      </GridItem>
                    ) : (
                      ""
                    )}
                    <GridItem xs={12} sm={12} md={6}>
                      <label>Signature</label>
                      <textarea
                        name="signature"
                        id="signature"
                        style={{
                          width: "100%",
                          minHeight: "100px",
                          outline: "none",
                          padding: "7px"
                        }}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.data.signature}
                      />
                    </GridItem>
                    {/* <div dangerouslySetInnerHTML={{__html: this.state.data.signature}} style={{width: "70px"}}/> */}
                  </Grid>
                </form>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSave}>
                  Update Profile
                </Button>
              </CardFooter>
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

export default connect(mapStateToProps)(withStyles(styles)(EditUser));
