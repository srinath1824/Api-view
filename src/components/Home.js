import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actionTypes from "./actions";
import axios from "axios";
import { Button, Grid, TextField, InputLabel, Select } from "@material-ui/core";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiCall: "ADD",
      count: "1",
    };
  }
  handleCall(e) {
    console.log(e.target.value);
    this.setState({ apiCall: e.target.value });
  }

  handleChange(e, index = null) {
    const { setValue, setRateValue, setType, addPrice } = this.props;
    const { name, value } = e.target;
    if (name === "price") {
      addPrice({ value });
    } else if (name === "type") {
      setType({ value });
      this.setState({ count: "1" });
    } else {
      if (index === null) {
        setValue({ type: name, value });
      } else {
        console.log(index);
        setRateValue({ type: name, index, value });
      }
    }
  }

  handleDeleteChange(e) {
    const { name, value } = e.target;
    this.props.setDeleteValue({ type: name, value });
  }

  addRates() {
    let rates = this.state.count + 1;
    this.setState({ count: rates });
    this.props.addRates();
  }

  handlePostCall() {
    let request = this.props.postRequest;
    //let url = "https://api-invoice-dev.fortellis.io/api-invoice/v1/pricing/"
    let url = "http://localhost:4000";
    axios
      .post(url, request)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  handleDeleteCall() {
    let request = this.props.deleteRequest;
    //let url = "https://api-invoice-dev.fortellis.io/api-invoice/v1/pricing/"
    let url = "http://localhost:4000";
    axios
      .post(url, request)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  render() {
    const { type } = this.props;
    const { apiCall } = this.state;
    let rates = this.state.count.split("").map((rate, index) => {
      return (
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              id="endUnit"
              label="endUnit"
              name="endUnit"
              autoComplete="endUnit"
              onChange={(e) => this.handleChange(e, index)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              id="rate"
              label="rate"
              name="rate"
              autoComplete="rate"
              onChange={(e) => this.handleChange(e, index)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              id="startUnit"
              label="startUnit"
              name="startUnit"
              autoComplete="startUnit"
              onChange={(e) => this.handleChange(e, index)}
            />
          </Grid>
        </Grid>
      );
    });
    return (
      <div>
        <h1>Api calls</h1>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="ADD"
            onChange={(e) => this.handleCall(e)}
          >
            <FormControlLabel
              value="ADD"
              control={<Radio color="primary" />}
              label="ADD"
              labelPlacement="end"
            />
            <FormControlLabel
              value="DELETE"
              control={<Radio color="primary" />}
              label="DELETE"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        {apiCall === "ADD" && (
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  autoComplete="fname"
                  name="solutionId"
                  variant="outlined"
                  type="string"
                  required
                  fullWidth
                  id="solutionId"
                  label="solutionId"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="string"
                  id="solutionOrganizationId"
                  label="solutionOrganizationId"
                  name="solutionOrganizationId"
                  autoComplete="lname"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  autoComplete="fname"
                  name="publishingEndpoint"
                  variant="outlined"
                  type="string"
                  required
                  fullWidth
                  id="publishingEndpoint"
                  label="publishingEndpoint"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="string"
                  id="pricingLevel"
                  label="pricingLevel"
                  name="pricingLevel"
                  autoComplete="pricingLevel"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
            </Grid>
            <div style={{ padding: "10px" }}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Type
                </InputLabel>
                <Select
                  native
                  name="type"
                  type="string"
                  label="type"
                  inputProps={{
                    name: "type",
                    id: "outlined-age-native-simple",
                  }}
                  onChange={(e) => this.handleChange(e)}
                >
                  <option value={""}></option>
                  <option value={"Tiered"}>Tiered</option>
                  <option value={"Subscription"}>Subscription</option>
                </Select>
              </FormControl>
              {type === "Tiered" && (
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  style={{ marginLeft: "20px" }}
                >
                  <AddIcon onClick={() => this.addRates()} />
                </Fab>
              )}
            </div>
            {type === "Tiered"
              ? rates
              : type === "Subscription" && (
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      id="price"
                      label="price"
                      name="price"
                      autoComplete="price"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Grid>
                )}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => this.handlePostCall()}
            >
              Post call
            </Button>
          </form>
        )}
        {apiCall === "DELETE" && (
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  autoComplete="fname"
                  name="solutionId"
                  variant="outlined"
                  type="string"
                  required
                  fullWidth
                  id="solutionId"
                  label="solutionId"
                  onChange={(e) => this.handleDeleteChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="string"
                  id="solutionOrganizationId"
                  label="solutionOrganizationId"
                  name="solutionOrganizationId"
                  autoComplete="lname"
                  onChange={(e) => this.handleDeleteChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  autoComplete="fname"
                  name="publishingEndpoint"
                  variant="outlined"
                  type="string"
                  required
                  fullWidth
                  id="publishingEndpoint"
                  label="publishingEndpoint"
                  onChange={(e) => this.handleDeleteChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => this.handleDeleteCall()}
            >
              Delete call
            </Button>
          </form>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    type: state.postCall.pricing.type,
    postRequest: state.postCall,
    deleteRequest: state.deleteCall,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setType: (data) => dispatch({ type: actionTypes.SET_TYPE, data }),
    setValue: (data) => dispatch({ type: actionTypes.SET_VALUE, data }),
    addRates: (data) => dispatch({ type: actionTypes.ADD_RATES, data }),
    setRateValue: (data) =>
      dispatch({ type: actionTypes.ADD_RATE_VALUE, data }),
    addPrice: (data) => dispatch({ type: actionTypes.ADD_PRICE, data }),
    setDeleteValue: (data) =>
      dispatch({ type: actionTypes.SET_DELETE_VALUE, data }),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Home);
