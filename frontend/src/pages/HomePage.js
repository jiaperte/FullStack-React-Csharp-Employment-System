import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import { withStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import NavBar from "../components/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  main: {
    width: "100%",
    height: "100%"
    //height: "100vh"
    //position: "relative"
  },
  page: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit * 2
    }
  },
  cards: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingTop: "0"
    }
  },
  card: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: 345
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: 275
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 345,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    }
  },
  media: {
    objectFit: "cover"
  },
  button: {
    textTransform: "capitalize",
    "&:hover": { color: blue[800] }
  },
  typography: {
    color: theme.palette.grey[700],
    //color: theme.palette.common.white,
    //textShadow: "1px 1px 2px #000000",
    //textShadow: "2px 2px 6px #2196f3",
    //fontWeight: "bold",
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 2
    }
  },
  lms: {
    color: "primary"
  }
});

function HomePage(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.main}>
        {/* <cssBaseline /> */}
        <NavBar />
        <div className={classes.page}>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            className={classes.typography}
            //gutterBottom
          >
            Welcome to Employee Management System
          </Typography>
          <div className={classes.cards}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to="/employees">
                <CardMedia
                  component="img"
                  alt="Employees"
                  className={classes.media}
                  height="140"
                  image={require("../static/images/employee.jpg")}
                  title="Employees"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Employees
                  </Typography>
                  <Typography component="p">
                    Employee Management: View, add, edit and delete employee
                    information
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to="/employees"
                  className={classes.button}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
