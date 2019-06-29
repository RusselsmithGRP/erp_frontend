import React from "react";
import PropTypes from "prop-types";
import Inflection from "inflection";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import * as genericActions from "actions/generic.js";
import purple from "@material-ui/core/colors/purple";
import { connect } from "react-redux";
import helpers from "../helpers";
import Notification from "../Notifications/Index.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class AddCrud extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      departments: ["code", "slug"],
      roles: ["slug"],
      expenseheader: ["slug"],
      locations: ["slug", "address"],
      optionsDepartment: [],
      data: {
        name: ""
      },
      validationState: {
        name: "",
        code: "",
        slug: "",
        department: "",
        address: ""
      },
      responseMessage: [],
      responseState: false
    };
  }

  handleChangeSelect = e => {
    let data = this.state.data;
    data[[e.target.name]] = e.target.value;
    this.setState({ 
      data: data
    });
  }

  handleChange = e => {
    this.validate(e.target.id, e.target.value);
    let data = this.state.data;
    data[[e.target.id]] = e.target.value;
    this.setState({
      data: data
    });
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
  };
  handleSubmit = e => {
    genericActions.saveItem(
      this.props.match.params.type,
      this.props.user.token,
      this.state.data,
      json => {
        this.setState({
          responseMessage: json
        });
      }
    );
  };

  componentDidMount() {
    this.setState({ type: this.props.match.params.type });
    genericActions.fetchAll("departments", this.props.user.token, items => {
      this.setState({ optionsDepartment: items });
    });
  }

  render() {
    const { classes, data } = this.props;
    let field = this.state[this.props.match.params.type];
    let additionalFields = " ";
    if (typeof field !== "undefined") {
      additionalFields = field.map((f, key) => {
        return (
          <GridItem xs={12} sm={12} md={6} key={key}>
            <CustomInput
              labelText={Inflection.titleize(f)}
              id={f}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: e => this.handleChange(e),
                value: this.state[f]
              }}
              error={
                this.state.validationState[f] === ""
                  ? ""
                  : this.state.validationState[f]
              }
              success={
                this.state.validationState[f] === ""
                  ? ""
                  : !this.state.validationState[f]
              }
            />
          </GridItem>
        );
      });
    }
    if (this.props.loader.loading) {
      return (
        <div>
          <Grid container>
            <GridItem xs={12} sm={6} md={3} style={{ margin: "20% auto" }}>
              <CircularProgress
                className={classes.progress}
                size={70}
                style={{ color: purple[500] }}
                thickness={10}
              />
            </GridItem>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <Grid container>
            <Notification
              error={!this.state.responseMessage.success}
              message={this.state.responseMessage.message}
            />
            <GridItem xs={12} sm={12} md={12}>
              <h3> Add {Inflection.titleize(this.props.match.params.type)}</h3>
              <form className={classes.container} autoComplete="off">
                <Card>
                  <CardBody>
                    <Grid container>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Name"
                          id="name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: e => this.handleChange(e),
                            value: this.state.name
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
                      {additionalFields}
                      {
                        (this.props.match.params.type == "expenseheader")?
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
                              : this.state.validationState.email
                          }
                          success={
                            this.state.validationState.email === ""
                              ? ""
                              : !this.state.validationState.email
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
                        : ""
                      }
                    </Grid>
                  </CardBody>
                  <CardFooter>
                    <Grid container>
                      <GridItem xs={12} sm={12} md={2}>
                        <Button color="yellowgreen" onClick={this.handleSubmit}>
                          Submit
                        </Button>
                      </GridItem>
                    </Grid>
                  </CardFooter>
                </Card>
              </form>
            </GridItem>
          </Grid>
        </div>
      );
    }
  }
}
AddCrud.propTypes = {
  class: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loader: state.loader,
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(AddCrud));
