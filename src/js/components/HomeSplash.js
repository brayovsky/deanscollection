import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from '../config';

class HomeSplash extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="splash-section">
        <p>We are here</p>
        <img src={this.props.imageSrc} />
      </div>
    );
  }
};

HomeSplash.propTypes = {
  imageSrc: PropTypes.string.isRequired,
};

HomeSplash.defaultProps = {
  imageSrc: config.imagesUrl,
};

export default HomeSplash;
