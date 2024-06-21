import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

const styles = {}

class Index extends React.Component {
    state ={tr:true}
    render() {
        const { classes } = this.props;
        let color = (this.props.error)? "danger" : "info";
       return(
           (this.props.message)?
            <Snackbar
            place="tr"
            color={color}
            message={this.props.message}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
          :""
        );
    }
}

export default withStyles(styles)(Index);