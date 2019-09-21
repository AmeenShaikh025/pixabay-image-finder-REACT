import React, { Component } from "react";
import propTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

class ImageResult extends Component {
  state = {
    open: false,
    currentImg: ""
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridListTile key={img.id}>
              <img src={img.largeImageURL} />
              <GridListTileBar
                title={img.tags}
                subtitle={<span>by: {img.user}</span>}
                actionIcon={
                  <IconButton
                    onClick={() => this.handleOpen(img.largeImageURL)}
                    aria-label={`info about ${img.tags}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    // const actions = [
    //   <Button color="primary" onClick={this.handleClose}>
    //     Close
    //   </Button>
    // ];

    return (
      <div>
        {imageListContent}
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} style={{ width: "100%" }} />
          <Button
            color="primary"
            style={{ justifyContent: "flex-end" }}
            onClick={this.handleClose}
          >
            Close
          </Button>
        </Dialog>
      </div>
    );
  }
}

ImageResult.propTypes = {
  images: propTypes.array.isRequired
};

export default ImageResult;
