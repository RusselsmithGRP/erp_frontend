import React from 'react';
import Button from "../../components/CustomButtons/Button.jsx";
import Grid from '@material-ui/core/Grid';
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { Link } from 'react-router-dom';
import CardFooter from '../../components/Card/CardFooter.jsx';
import {USER_LOGGED_IN} from '../../actions/index';
import AclAuth from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import LockOutline from "@material-ui/icons/LockOutline";
import classNames from 'classnames';
import logo from "../../assets/img/erplogo.png";
import bg from "assets/img/bg-image.png";
import logo2 from "../../assets/img/footerbar.png";
import { withStyles } from '@material-ui/core/styles';
import Progress from "components/Progress/Progress.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import * as userAction from "../../actions/user"

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import StateLoader from "middleware/stateLoader";
import Notification from '../Notifications/Index.jsx'

const stateLoader = new StateLoader();

class ChangePassword extends React.Component {

  state = {
    data: {oldPassword: '', password:'', confirmPassword:''},
    resetMessage: {},
    errorState: '',
    showNotif: '',
	 card: {
    minWidth:12,
	 }
  }
  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value; 
    this.setState({ 
      data : data,
    });
  };
  componentDidMount(){
    stateLoader.unsetState();
  }
  changePassword = (e) => {
    e.preventDefault();
    this.props.ChangeYourPassword(this);

  }

  render() {
    const { classes } = this.props;
      return (
		      <div>
        <Grid container>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Change your Password</h4>
            </CardHeader>
            <CardBody>
            {(this.state.resetMessage)?<Notification error={this.state.errorState} message={this.state.resetMessage.message} />: ""}
            <Progress loading={this.state.loading}/>
            <form onSubmit={this.changePassword}>
              <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                      <CustomInput labelText="Current Password"  id="oldPassword" required formControlProps={{
                             fullWidth: true
                              }}
                            inputProps={{
						    endAdornment: (
                              <InputAdornment position="end">
                              <LockOutline />
                              </InputAdornment>
                               ),
                            type:"password",
                            onChange: this.handleChange,
                                }}
                        />
                    </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                      <CustomInput labelText="Password"  id="password" required formControlProps={{
                             fullWidth: true
                              }}
                            inputProps={{
						    endAdornment: (
                              <InputAdornment position="end">
                              <LockOutline />
                              </InputAdornment>
                               ),
                            type:"password",
                            onChange: this.handleChange,
                                }}
                        />
                    </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                      <CustomInput labelText="Confirm Password"  id="confirmPassword" required formControlProps={{
                             fullWidth: true
                              }}
                            inputProps={{
						    endAdornment: (
                              <InputAdornment position="end">
                              <LockOutline />
                              </InputAdornment>
                               ),
                            type:"password",
                            onChange: this.handleChange,
                                }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={12}>
                          <Button type="submit" color="primary" >Reset Password</Button>
                        </GridItem>
                    
						        </Grid>
            </form> 
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
        </div>
      );
    }
}


const style = {
 margin: 15,
};

function mapStateToProps(state) {
  return {
    redirectToReferrer: state.auth.redirectToReferrer,
    user: state.auth.user,

  };
}
function mapDispatchToProps(dispatch) {
    return {
      ChangeYourPassword(e){
        let data = e.state.data;
        userAction.changePassword(data, e.props.user._id,  (json)=>{
          e.setState({resetMessage:json});
          if (e.state.resetMessage.success === false){
            e.setState({errorState: true});
          }
          else {
            e.setState({errorState: false});
          }
        });
      }
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(ChangePassword));