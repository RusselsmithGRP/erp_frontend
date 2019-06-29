import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import { Redirect } from 'react-router'
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {AdminMenu} from "routes/dashboard.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Grid from '@material-ui/core/Grid';
import Button from "components/CustomButtons/Button.jsx";
import * as roleActions from '../../actions/role.js';

const styles = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };
  class Permission extends React.Component {
  
      constructor(props){
          super(props)
          this.props = props;
          this.state = {role: [{}], checked: []}
          this.handleSave.bind(this);
      }

      handleToggle(path){
          let checked = this.state.checked;
          let index = checked.indexOf(path);
          if( index == -1){
              checked.push(path)
          }else{
              checked.splice(index, 1);
          }
          this.setState({"checked": checked});
       }
       
       handleSave = ()=> {
           this.setState({loading:true});
            roleActions.savePermission(this.props,this.state, (r)=>{
                if(r){
                    alert('Permission Saved');
                    this.setState({loading:false});
                }
            });
       }

      componentDidMount(){
        roleActions.findRoleById(this.props, this.props.match.params.id,(r)=>{
            this.setState({role:r['0'], checked:r['0'].permission})
        });

      }

      parseMenu(routes, classes, allowedroutes, sub=false ){
        let allowed = (typeof allowedroutes == "undefined")? [] : allowedroutes;
        let w = (sub)? 12 : 4;
       return routes.map((prop, key) => {
               return( <GridItem xs={w} sm={w} md={w} >
                    <div className={classes.checkboxAndRadio}>
                        <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={(allowed.indexOf(prop.path) >= 0)? true : false}
                                        tabIndex={-1}
                                        onClick={() => this.handleToggle(prop.path)}
                                        checkedIcon={
                                            <Check className={classes.checkedIcon} />
                                        }
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                        checked: classes.checked
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label={(prop.name)}
                        />
                        {(prop.collapse && prop.views.length > 0)? this.parseMenu(prop.views, classes, allowed, true) : ''}
                        {((typeof prop.actions != "undefined") && prop.actions.length > 0)? this.parseActions(prop.actions, prop.path ,classes, allowed) : ''}
                    </div>
                </GridItem>)
        });
      }

      parseActions(actions, path, classes, allowed){
        return actions.map((prop, key) => {
            return( <GridItem xs={12} sm={12} md={12} >
                 <div className={classes.checkboxAndRadio}>
                     <FormControlLabel
                             control={
                                 <Checkbox
                                     checked={(allowed.indexOf(path+"/"+prop) >= 0)? true : false}
                                     tabIndex={-1}
                                     onClick={() => this.handleToggle(path+"/"+prop)}
                                     checkedIcon={
                                         <Check className={classes.checkedIcon} />
                                     }
                                     icon={<Check className={classes.uncheckedIcon} />}
                                     classes={{
                                     checked: classes.checked
                                     }}
                                 />
                             }
                             classes={{
                                 label: classes.label
                             }}
                             label={(prop)}
                     />
                 </div>
             </GridItem>)
        })
      }

      render(){
        const { classes } = this.props;
        if(this.state.loading){
            return (
              <div>
                <Grid container>
                  <GridItem xs={12} sm={6} md={3} style={{ margin:'20% auto'}}>
                    <CircularProgress className={classes.progress} size={70} style={{ color: purple[500]}} thickness={10} />
                  </GridItem>
                </Grid>
              </div>)
          }else{
            return (<GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Assignment />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>
                        Permission for Role : {this.state.role.name}
                        </h4>
                        </CardHeader>
                        <CardBody>
                            <form className={classes.container} noValidate autoComplete="off">
                                <GridContainer direction="row" justify="center" alignItems="center">
                                    { 
                                        this.parseMenu(AdminMenu, classes, this.state.checked)
                                    }   
                                </GridContainer>                                                                                        
                            </form>
                        </CardBody>
                        <CardFooter>
                            <Grid container>
                                <GridItem xs={12} sm={6} md={2}>
                                <Button color="primary" onClick={this.handleSave}>Save</Button>
                                </GridItem>
                            </Grid>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>);
          }
      }

    }

    Permission.defaultProps = {
       
    }

    function mapStateToProps(state) {
        return {
          loader: state.loader,
          user: state.auth.user,
        };
    }
      
      
    export default connect(
        mapStateToProps,
        null
    )(withStyles(styles)(Permission));