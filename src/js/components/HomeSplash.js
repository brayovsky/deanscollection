import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  imageSrc: 'images/deanslgwhite.png',
};

export default HomeSplash;
