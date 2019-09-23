import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GeneralInfo from "./view/generalInfoView";
import BusinessInfo from "./view/businessInfo";
import WorkReference from "./view/workReferences";
import TechnicalCapabilities from "./view/technicalCapabilities";
import BankDetails from "./view/bankDetails";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Approve from "@material-ui/icons/ThumbUp";
import Unapprove from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import Progress from "components/Progress/Progress.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { connect } from "react-redux";
import MiddleWare from "../../middleware/api";
import Notification from "views/Notifications/Index.jsx";
import * as vendorActions from "../../actions/vendor";
import GeneralInfoView from "./view/generalInfoView";

// Material UI Multistep package starts here
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
// Material UI Multistep package ends here

const styles = {
  root: {
    flexGrow: 1
  },
  marginRight: "20px",
  maxSize: {
    width: "90%"
  },
  marginTop: "10px"
};

// Custom styles
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "90%"
//   },
//   backButton: {
//     marginRight: theme.spacing(1)
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1)
//   }
// }));

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
class View extends React.Component {
  state = {
    reason: "",
    vendor: {},
    index: 1,
    showReason: false,
    activeStep: 0,
    completed: {},
    steps: []
  };
  constructor(props) {
    super(props);
    this.props = props;
  }
  getSteps = () => {
    return [
      "General Information",
      "Business Information",
      "Bank Details",
      "Work Reference"
    ];
  };
  componentDidMount() {
    const vendorId = this.props.match.params.id;
    vendorActions.findVendorById(this.props, vendorId, vendor => {
      this.setState(() => ({
        vendor,
        steps: this.getSteps()
      }));
    });
  }

  totalSteps = () => this.state.steps.length;
  completedSteps = () => Object.keys(this.state.completed).length;
  isLastStep = () => this.state.activeStep === this.totalSteps() - 1;
  allStepsCompleted = () => this.completedSteps() === this.totalSteps();
  handleNext = () => {
    const newActiveStep =
      this.isLastStep() && !this.allStepsCompleted()
        ? this.state.steps.findIndex((step, i) => !(i in this.state.completed))
        : this.state.activeStep + 1;
    this.setState({
      activeStep: newActiveStep
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleStep = step => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = () => {
    const newCompleted = this.state.completed;
    newCompleted[this.state.activeStep] = true;
    this.setState({
      completed: newCompleted
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {}
    });
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return this.state.vendor.general_info ? (
          <GeneralInfoView data={this.state.vendor.general_info} />
        ) : (
          ""
        );
      case 1:
        return this.state.vendor.business_info ? (
          <BusinessInfo data={this.state.vendor.business_info} />
        ) : (
          ""
        );
      case 2:
        return this.state.vendor.bank_detail ? (
          <BankDetails data={this.state.vendor.bank_detail} />
        ) : (
          ""
        );
      case 3:
        return this.state.vendor.work_reference ? (
          <WorkReference data={this.state.vendor.work_reference} />
        ) : (
          ""
        );
      default:
        return "Unknown step";
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  updateStatus = (event, status) => {
    let data = {};
    let middleware = new MiddleWare();
    // data.key = this.props.data._id;
    data.key = this.props.match.params.id;
    data.value = status;
    data.message = this.state.reason;
    middleware
      .makeConnection("/vendors/updatestatus", "PUT", data)
      .then(result => {
        if (!result.ok || (result.statusText != "OK" && result.status != 200)) {
          this.setState({
            error: true,
            message: "Error completing the request"
          });
        } else {
          this.setState({ error: false, message: "Saved succesfully" });

          this.setState({ showReason: false });
        }
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
      });
  };
  back = () => {
    //vendorActions.clearStore(this.props);
    this.props.history.push("/vendor");
  };

  render() {
    const { classes, user } = this.props;
    const {
      error,
      message,
      loading,
      activeStep,
      completed,
      steps,
      showReason,
      vendor
    } = this.state;
    return (
      <div>
        <Grid container>
          <Notification error={error} message={message} />
          <GridItem xs={12} sm={12} md={12}>
            <Button color="secondary" onClick={this.back}>
              Back
            </Button>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Progress loading={loading} />
            {/* <CustomTabs
              title=""
              headerColor="primary"
              tabs={[
                {
                  tabName: "General Information",
                  tabIcon: BugReport,
                  tabContent: this.state.vendor.general_info ? (
                    <GeneralInfoView data={this.state.vendor.general_info} />
                  ) : (
                    ""
                  )
                },
                {
                  tabName: "Business Information",
                  tabIcon: Code,
                  tabContent: this.state.vendor.business_info ? (
                    <BusinessInfo data={this.state.vendor.business_info} />
                  ) : (
                    ""
                  )
                },
                {
                  tabName: "Bank Details",
                  tabIcon: Cloud,
                  tabContent: this.state.vendor.bank_detail ? (
                    <BankDetails data={this.state.vendor.bank_detail} />
                  ) : (
                    ""
                  )
                },
                {
                  tabName: "Work Reference",
                  tabIcon: Cloud,
                  tabContent: this.state.vendor.work_reference ? (
                    <WorkReference data={this.state.vendor.work_reference} />
                  ) : (
                    ""
                  )
                }
              ]}
            /> */}

            {/* Multistep Starts here */}
            <div style={{ width: "90%" }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={() => this.handleStep(index)}
                      completed={completed[index]}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {this.allStepsCompleted() ? (
                  <div>
                    <Typography style={{ marginTop: "20px" }}>
                      Step Complete
                    </Typography>
                    <Button onClick={this.handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    {this.getStepContent(activeStep)}

                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        style={{ marginRight: "10px" }}
                      >
                        Prev
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        style={{ marginRight: "10px" }}
                      >
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography
                            variant="caption"
                            style={{ marginTop: "20px" }}
                          >
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleComplete}
                          >
                            {this.completedSteps() === this.totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Multistep ends here... */}
            {showReason ? (
              <Grid
                container
                spacing={16}
                alignItems="center"
                direction="row"
                justify="center"
              >
                <CustomInput
                  labelText="Kindly give a reason for the rejection"
                  id="reason"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 2,
                    onChange: this.handleChange
                  }}
                />
                <Button onClick={e => this.updateStatus(e, "UPDATE")}>
                  submit
                </Button>
              </Grid>
            ) : (
              ""
            )}

            {/* Approve/Reject Starts Here... */}
            {user.role === "iac" && vendor.status === "PENDING" ? (
              <Grid
                container
                spacing={16}
                alignItems="center"
                direction="row"
                justify="center"
                style={{ marginTop: "20px" }}
              >
                <Button onClick={e => this.updateStatus(e, "APPROVED")}>
                  <Approve />
                  Approve
                </Button>

                <Button
                  onClick={() => {
                    showReason
                      ? this.setState({ showReason: false })
                      : this.setState({ showReason: true });
                  }}
                >
                  <Unapprove />
                  Reject
                </Button>
              </Grid>
            ) : (
              ""
            )}

            {/* Approve/Reject Ends Here... */}
          </GridItem>
        </Grid>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired,
  vendorActions: PropTypes.object,
  data: PropTypes.object
};

View.defaultProps = {
  data: {}
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    data: state.vendor
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     goBack(){
//       vendorActions.clearStore(dispatch)
//     }
//   }
// }

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(View));
