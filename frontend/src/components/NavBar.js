import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Avatar,
  IconButton,
  Hidden,
  Divider,
  Icon,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  List
} from "@material-ui/core";

import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";
import { compose } from "recompose";
import MenuIcon from "@material-ui/icons/Menu";
import withWidth from "@material-ui/core/withWidth";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import classNames from "classnames";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing.unit * 8,
    //position: "fixed"
    //zIndex: 1100
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing.unit * 7
    }
  },
  tabRoot: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: "1rem",
    minWidth: 100,
    "&:hover": {
      color: blue[500]
    }
  },
  tabsRoot: {
    flexGrow: 1
  },
  menuButton: {
    flexGrow: 1
  },
  buttonRoot: {
    //fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: "1rem",
    //fontWeight: "bold",
    marginRight: theme.spacing.unit * 3
  },
  typoRoot: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    fontSize: "1.15rem",
    //fontWeight: "bold",
    color: theme.palette.grey[800],
    "&:hover": {
      color: orange[800]
    }
  },
  avatar: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    height: 35,
    width: 35
  },
  avatarSideList: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    height: 35,
    width: 35
  },
  accountIcon: {
    //"&:hover": { color: blue[800] },
    fontSize: 30
  },
  toolbar: {
    padding: 0
  },
  signoutIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.common.white,
    fontSize: 20
  },
  icon: {
    //marginRight: theme.spacing.unit * 2,
    //color: theme.palette.common.white,
    fontSize: 20
    //"&:hover": { color: blue[800] }
  },
  list: {
    width: 180
  }
  // drawer: {
  //   width: 180,
  //   flexShrink: 0
  // },
  // drawerPaper: {
  //   width: 180
  // },
  // drawerHeader: {
  //   display: "flex",
  //   alignItems: "center",
  //   padding: "0 8px",
  //   ...theme.mixins.toolbar,
  //   justifyContent: "flex-end"
  // }
});

class NavBar extends React.Component {
  state = {
    open: false
  };
  //handle Sign Out event
  handleSignOut = e => {
    e.preventDefault();
    this.props.userLogOut();
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  render() {
    const { classes, location } = this.props;
    const { open } = this.state;
    const pathname = "/" + location.pathname.split("/")[1];

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar color="inherit">
            <Toolbar className={classes.toolbar}>
              <Hidden mdUp>
                <div className={classes.menuButton}>
                  <IconButton color="primary" onClick={this.handleDrawerOpen}>
                    <MenuIcon />
                  </IconButton>
                  <Drawer open={open} onClose={this.handleDrawerClose}>
                    <div
                      tabIndex={0}
                      role="button"
                      //onClick={this.handleDrawerClose}
                      onKeyDown={this.handleDrawerClose}
                    >
                      <div className={classes.list}>
                        <List>
                          <ListItem button key="EMS">
                            <Avatar
                              alt="EMS"
                              src={require("../static/icon/lms_icon.svg")}
                              className={classes.avatarSideList}
                            />
                            <ListItemText primary="EMS v1.0.0" />
                          </ListItem>
                        </List>
                        <Divider />
                        <List>
                          <ListItem button key="Home" component={Link} to="/">
                            <ListItemIcon>
                              <Icon
                                className={classNames(
                                  classes.icon,
                                  "fas fa-home"
                                )}
                                color="action"
                              />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                          </ListItem>
                        </List>
                        <Divider />
                        <List>
                          <ListItem
                            button
                            key="Employees"
                            component={Link}
                            to="/employees"
                          >
                            <ListItemIcon>
                              <Icon
                                className={classNames(
                                  classes.icon,
                                  "fas fa-user-friends"
                                )}
                                color="action"
                              />
                            </ListItemIcon>
                            <ListItemText primary="Employees" />
                          </ListItem>
                        </List>
                        <Divider />
                        <Divider />
                      </div>
                    </div>
                  </Drawer>
                </div>
              </Hidden>
              <Hidden smDown>
                <Avatar
                  alt="EMS"
                  src={require("../static/icon/lms_icon.svg")}
                  className={classes.avatar}
                  component={Link}
                  to="/"
                />
                <Tabs
                  value={pathname}
                  indicatorColor="primary"
                  textColor="primary"
                  className={classes.tabsRoot}
                >
                  <Tab
                    label="Home"
                    component={Link}
                    to="/"
                    value="/"
                    className={classes.tabRoot}
                  />
                  <Tab
                    label="Employees"
                    component={Link}
                    to="/employees"
                    value="/employees"
                    className={classes.tabRoot}
                  />
                </Tabs>
              </Hidden>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles),
  withWidth()
)(NavBar);
