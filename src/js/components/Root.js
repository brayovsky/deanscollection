import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothesGrid from './ClothesGrid';
import Categories from './Categories';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { showPostsFromThisCategory } from '../actions/actions';
import { setTimeout } from 'timers';

const overrideStyles = {
  typography: {
    fontFamily: "\"Raleway\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  }
};

const theme = createMuiTheme(overrideStyles);
class Root extends Component {
  constructor(props) {
    super(props);
    this.fetchInitialImages = this.fetchInitialImages.bind(this);
    this.getCategoryId = this.getCategoryId.bind(this);
    this.state = {
      category: window.location.hash.split('#')[1],
      run : 1,
    }
  }

  getCategoryId(categoryName) {
    const relevantCategory = this.props.categories.filter((category) => {
      return category.name === categoryName;
    })[0];
    return relevantCategory ? relevantCategory.id : 'all';
  };

  fetchInitialImages() {
    this.setState(() => {
      return { run: 2 }
    });
    if(this.props.categories.length < 2)
      return;
    const categoryId = this.getCategoryId(this.state.category);
    this.props.fetchInitialImages(categoryId);
  };

  shouldComponentUpdate(nextProps) {
    // this ensures fetchinitial images runs only once when app loads
    return this.state.run === 1;
  };

  componentWillUpdate() {
    setTimeout(this.fetchInitialImages, 500); // wait for store to update
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">
          <Categories />
          <ClothesGrid />
        </div>
      </MuiThemeProvider>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // First images to be loaded, typically read from url
    fetchInitialImages: (category) => {
      dispatch(showPostsFromThisCategory(category, 1))
    }
  }
};

Root.propTypes = {
  fetchInitialImages: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(Object).isRequired,
};

Root.defaultProps = {
  fetchInitialImages: (category) => {
    console.log('category is ', category, '. Please connect well');
  },
  categories: [{}],
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
