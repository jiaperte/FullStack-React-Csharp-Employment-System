import React from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import blue from "@material-ui/core/colors/blue";
import NavBar from "../components/NavBar";
import AlertDialog from "../components/AlertDialog";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { HTTP_STATUS_CODE_UNAUTHORIZED } from "../constants/httpStatusCode";
import { PAGE_SIZE, DEBUG_SWITCH } from "../constants/constValue";
import EnhancedTable from "../components/EnhancedTable";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  Toolbar,
  Divider,
  Fab,
  Hidden,
  CircularProgress
  //IconButton
} from "@material-ui/core";
import { stableSort, getSorting } from "../helper";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  paper: {
    //height: "79vh",
    height: "81%",
    width: "100%",
    position: "relative",
    // [theme.breakpoints.down("md")]: {
    //   height: "83%"
    //   //marginLeft: theme.spacing.unit * 6,
    //   //width: 500
    // },
    overflowX: "auto"
    //marginLeft: 30
  },
  button: {
    marginLeft: theme.spacing.unit * 2
  },
  searchBar: {
    //padding: "2px 4px",
    [theme.breakpoints.up("md")]: {
      //marginLeft: theme.spacing.unit * 6,
      //width: 500
    },
    // [theme.breakpoints.down("sm")]: {
    //   //marginLeft: 0,
    //   //justifyContent: "flex-start"
    //   width: 50
    // },
    //paddingTop: 75,
    padding: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
    //justifyContent: "flex-start"
    //width: 80
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  progress: {
    //marginLeft: theme.spacing.unit * 100,
    left: "48%",
    top: "40%",
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      left: "45%"
    }
    //zIndex: 1100
  },
  search: {
    position: "relative",
    //borderColor: theme.palette.grey[500],
    //borderColor: "primary",
    border: "1px solid #d5d5d5",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "75%",
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    //pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
    // color: theme.palette.grey[600],
    // "&:hover": {
    //   color: blue[500]
    // }
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class PureEmployeesListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [], //data after being processed
      searchKeyword: "", //Id to be searched
      hasMoreRecords: true,
      nextPageId: 1,
      isLoading: false,
      order: "asc",
      orderBy: "name",
      isAlertDialogOpen: false
    };
    this.paperHeight = 0;
  }

  //search all records
  componentDidMount() {
    this.handleGetRecordsByPage();
  }

  getExpectedRecords = records => {
    return records.map(record => {
      let expectedRecord = {};
      expectedRecord.id = record.employeeID;
      expectedRecord.employeeNumber = record.employeeNumber;
      expectedRecord.name = record.firstName + " " + record.lastName;
      expectedRecord.roleName = record.roleName;
      expectedRecord.extension = record.extension;
      expectedRecord.dateJoined = record.dateJoined.split("T")[0];
      return expectedRecord;
    });
  };

  getRecordsByPage = async url => {
    // let nextPageId = this.state.nextPageId;
    // let records = this.state.records;
    let { nextPageId, records } = this.state;
    let hasMoreRecords = true;

    if (this.state.isLoading) return;

    DEBUG_SWITCH && console.log(url);

    this.setState({ isLoading: true });

    try {
      let response = await axios.get(url);
      if (response && response.data.length !== 0) {
        DEBUG_SWITCH && console.log(response.data);
        const expectedRecords = this.getExpectedRecords(response.data);
        records.push(...expectedRecords);
        if (expectedRecords.length < PAGE_SIZE) {
          hasMoreRecords = false;
          //nextPageId = 1;
        }
        //console.log(records.length);
        nextPageId++;
        this.setState({
          records: records,
          nextPageId: nextPageId,
          hasMoreRecords: hasMoreRecords,
          isLoading: false
        });
      } else {
        this.setState({
          hasMoreRecords: false,
          //nextPageId: 1,
          isLoading: false
        });
      }
    } catch (err) {
      DEBUG_SWITCH && console.log(err);
      if (err.message === "Network Error") {
        this.setState({
          hasMoreRecords: false,
          isLoading: false,
          isAlertDialogOpen: true
        });
      } else {
        this.setState({ hasMoreRecords: false, isLoading: false });
      }

      if (
        err.response &&
        HTTP_STATUS_CODE_UNAUTHORIZED === err.response.status
      ) {
        DEBUG_SWITCH && console.log("http status code " + err.response.status);
        //this.props.userLogOut();
      }
    }
  };

  //get records by page
  handleGetRecordsByPage = () => {
    let url = axios.defaults.baseURL + "/api" + this.props.location.pathname;
    this.getRecordsByPage(url);
  };

  //handle onChange event of input
  handleSearchInputChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleTriggerAddOp = () => {
    this.props.history.push("/employees/save");
  };

  //search relevant records by keyword
  handleSearch = async () => {
    this.setState(
      { records: [], hasMoreRecords: true, nextPageId: 1 },
      this.handleGetRecordsByPage
    );
  };

  handleDeleteOp = async (e, id) => {
    DEBUG_SWITCH && console.log("id= " + id);
    e.stopPropagation();
    try {
      let response = await axios.delete("/api/employees/" + id);
      DEBUG_SWITCH && console.log(response.data);
      //alert("Delete Success!");
      //window.location.reload();
      let filteredRecords = this.state.records.filter(value => value.id !== id);
      this.setState({ records: filteredRecords });
    } catch (err) {
      DEBUG_SWITCH && console.log(err);
      if (err.message === "Network Error") {
        this.setState({
          isAlertDialogOpen: true
        });
      }

      if (
        err.response &&
        HTTP_STATUS_CODE_UNAUTHORIZED === err.response.status
      ) {
        DEBUG_SWITCH && console.log("http status code " + err.response.status);
        //this.props.userLogOut();
      }
    }
  };

  handleEditOp = (e, id) => {
    e.stopPropagation();
    this.props.history.push("/employees/save/" + id);
  };

  handleViewOp = e => {
    this.props.history.push("/employees/" + e.rowData.id);
  };

  //Trigger search by pressing Enter key
  onKeyPress = e => {
    //console.log(e.target.value);
    if (e.which === 13) {
      this.handleSearch();
    }
  };

  handleRequestSort = property => event => {
    const { order, orderBy, records } = this.state;
    //const orderBy = property;
    let orderDirection = "desc";

    if (orderBy === property && order === "desc") {
      orderDirection = "asc";
    }

    // console.log(orderDirection);
    // console.log(property);

    this.setState({
      order: orderDirection,
      orderBy: property,
      records: stableSort(records, getSorting(orderDirection, property))
    });
  };

  handleAlertDialogClose = () => {
    this.setState({ isAlertDialogOpen: false });
  };

  render() {
    let { classes } = this.props;
    let {
      records,
      hasMoreRecords,
      order,
      orderBy,
      isLoading,
      isAlertDialogOpen
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Toolbar className={classes.searchBar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              {/* <IconButton onClick={this.handleSearch}> */}
              <SearchIcon color="primary" onClick={this.handleSearch} />
              {/* </IconButton> */}
            </div>
            <InputBase
              placeholder="Search…"
              onChange={this.handleSearchInputChange("searchKeyword")}
              onKeyPress={this.onKeyPress}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <Divider className={classes.divider} />
          <Fab
            color="primary"
            size="small"
            className={classes.button}
            onClick={this.handleTriggerAddOp}
          >
            <AddIcon />
          </Fab>
        </Toolbar>
        <div>
          {isLoading && <CircularProgress className={classes.progress} />}
          <EnhancedTable rows={records} isLoading={isLoading} />
        </div>
        <AlertDialog
          isOpen={isAlertDialogOpen}
          handleClose={this.handleAlertDialogClose}
        />
      </MuiThemeProvider>
    );
  }
}

const EmployeesListPage = withStyles(styles)(PureEmployeesListPage);
export default EmployeesListPage;
