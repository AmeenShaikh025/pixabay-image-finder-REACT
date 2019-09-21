import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import ImageResult from "../image-results/ImageResult";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiurl: "https://pixabay.com/api/",
    apiKey: "13687602-45857d6afce2152d9beb79b2d",
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiurl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res =>
            this.setState({
              images: res.data.hits
            })
          )
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, value) => this.setState({ amount: e.target.value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          label="Search For Images"
          fullWidth={true}
        ></TextField>
        <br />
        <FormControl>
          <InputLabel>Amount</InputLabel>
          <Select
            value={this.state.amount}
            onChange={this.onAmountChange}
            name="amount"
            label="Amount"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResult images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
