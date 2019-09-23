import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GeneralInfo from "./generalInfo";
import BusinessInfo from "./businessInfo";
import WorkReference from "./workReferences";
import TechnicalCapabilities from "./technicalCapabilities";
import BankDetails from "./bankDetails";
import Typography from "@material-ui/core/Typography";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import BugReport from "@material-ui/icons/BugReport";
import Work from "@material-ui/icons/list";
import Payment from "@material-ui/icons/payment";
import DNS from "@material-ui/icons/dns";
import Business from "@material-ui/icons/businessCenter";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Notification from "views/Notifications/Index.jsx";
import * as vendorActions from "../../actions/vendor";

// Material UI Multistep package starts here
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

// Material UI Multistep package ends here

const styles = {
  root: {
    flexGrow: 1
  },
  marginRight: {
    marginRight: "20px"
  },
  maxSize: {
    width: "90%"
  },
  marginTop: {
    marginTop: "10px"
  }
};

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
class AddTabs extends React.Component {
  state = {
    steps: [],
    activeStep: 0,
    completed: {}
  };
  componentDidMount() {
    const userId = this.props.user._id;
    vendorActions.findVendorByUserId(this.props, userId);
    this.setState({
      steps: this.getSteps()
    });
  }

  totalSteps = () => {
    return this.state.steps.length;
  };

  completedSteps = () => {
    return Object.keys(this.state.completed).length;
  };

  isLastStep = () => {
    return this.state.activeStep === this.totalSteps() - 1;
  };

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

  handleStep = step => () => {
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

  allStepsCompleted = () => {
    return this.completedSteps() === this.totalSteps();
  };

  getSteps = () => {
    return [
      "General Information",
      "Business Information",
      "Bank Details",
      "Work Reference"
    ];
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {}
    });
  };

  isStepSkipped = step => {
    return this.state.skipped.has(step);
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return <GeneralInfo />;
      case 1:
        return <BusinessInfo />;
      case 2:
        return <BankDetails />;
      case 3:
        return <WorkReference />;
      default:
        return "Unknown step";
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    //console.log(this.props);
    const { classes } = this.props;
    const { steps, activeStep, completed } = this.state;
    if (this.props.loading) {
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
    } else if (
      this.props.user.role === "vendor" &&
      this.props.vendor.status === "PENDING"
    ) {
      return <Redirect to="/dashboard" />;
    } else
      return (
        <Grid container style={styles.maxSize}>
          <Notification
            error={this.props.loader.error}
            message={this.props.loader.message}
          />
          <GridItem xs={12} sm={12} md={12}>
            {/* <CustomTabs
              title=""
              headerColor="primary"
              tabs={[
                {
                  tabName: "General Information",
                  tabIcon: DNS,
                  tabContent: <GeneralInfo />
                },
                {
                  tabName: "Business Information",
                  tabIcon: Business,
                  tabContent: <BusinessInfo />
                },
                {
                  tabName: "Bank Details",
                  tabIcon: Payment,
                  tabContent: <BankDetails />
                },
                {
                  tabName: "Work Reference",
                  tabIcon: Work,
                  tabContent: <WorkReference />
                }
              ]}
            /> */}
            {/* Multistep form starts here */}
            <div style={styles.maxSize}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={this.handleStep(index)}
                      completed={completed[index]}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>

              <div style={styles.marginTop}>
                {this.allStepsCompleted() ? (
                  <div>
                    <Typography>
                      All steps completed - you're finished
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
                        style={styles.marginRight}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        style={styles.marginRight}
                      >
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography variant="caption">
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
            {/* Multistep form ends here... */}
          </GridItem>
        </Grid>
      );
  }
}

AddTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  vendorActions: PropTypes.object,
  vendor: PropTypes.object
};

AddTabs.defaultProps = {
  vendor: {}
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    vendor: state.vendor,
    loading: state.loader.loading,
    loader: state.loader
  };
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(AddTabs));
