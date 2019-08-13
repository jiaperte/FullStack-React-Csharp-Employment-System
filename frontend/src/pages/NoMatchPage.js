import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  main: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grey[800]
  },
  card: {
    maxWidth: 345,
    maxHeight: 160
  },
  media: {
    height: 140
  },
  button: {
    textTransform: "capitalize"
  }
});

const NoMatchPage = props => {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Page Not Found
            </Typography>
            <Typography component="p">
              Looks like you've followed a broken link or entered a URL that
              doesn't exist on this site.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            className={classes.button}
            component={Link}
            to="/"
          >
            {"< Back to our site"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

NoMatchPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoMatchPage);
