import React from "react";
import Button from "../../components/CustomButtons/Button.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import { Link } from "react-router-dom";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { connect } from "react-redux";
import logo from "../../assets/img/erplogo.png";
import bg from "assets/img/bg-image.png";
import logo2 from "../../assets/img/footerbar.png";
import { withStyles } from "@material-ui/core/styles";
import Progress from "components/Progress/Progress.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import * as userAction from "../../actions/user";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import StateLoader from "middleware/stateLoader";
const stateLoader = new StateLoader();

class Confirm extends React.Component {
  state = {
    data: { email: "" },
    card: {
      minWidth: 12
    },
    requestMessage: {}
  };

  componentDidMount(){
    stateLoader.unsetState();
    userAction.confirmRegistration(this.props.match.params.token, (json)=>{
      this.setState({requestMessage:json});
    });
  }


  render() {
    const { classes } = this.props;
    console.log(this.state.requestMessage);
    return (
      <div
        className={classes.content}
        style={{
          backgroundColor: "#082356",
          backgroundImage: "url(" + bg + ")",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={4}>
                
                <Card>
                  <CardHeader
                    color="primary"
                    style={{ background: "linear-gradient(60deg, #000, #000)" }}
                  >
                    <center>
                      <img src={logo} />
                    </center>
                  </CardHeader>
                  <CardBody>
                    <Grid container> 
                     <GridItem xs={12} sm={12} md={12}>
                     <div style={{padding: "10px 0", lineHeight:"2"}}> {this.state.requestMessage.message} </div>
                     <p>click <Link to="/login">here</Link> to login</p>
                      </GridItem>                        
                    </Grid>
                  </CardBody>
                  <Progress loading={this.state.loading} />
                  <img src={logo2} />
                  <CardFooter>
                    <Grid />
                  </CardFooter>
                </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15
};

function mapStateToProps(state) {
  return {
    redirectToReferrer: state.auth.redirectToReferrer
  };
}
export default connect(
  mapStateToProps,
  null
)(withStyles(loginPageStyle)(Confirm));
