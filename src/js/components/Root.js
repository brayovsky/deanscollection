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
  }

  getCategoryId(categoryName) {
    const relevantCategory = this.props.categories.filter((category) => {
      return category.name === categoryName;
    })[0];
    return relevantCategory ? relevantCategory.id : 'all';
  };

  fetchInitialImages() {
    // get category from categories
    if(this.props.categories.length < 2)
      return;
    const categoryId = this.getCategoryId(this.props.match.params.category);
    this.props.fetchInitialImages(categoryId);
  };

  componentWillUpdate() {
    setTimeout(this.fetchInitialImages, 500); // wait for store to update
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">
          <Categories activeCategoryId={String(this.getCategoryId(this.props.match.params.category))}/>
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
