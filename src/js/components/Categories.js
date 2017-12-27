import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import styles from '../styles/categoryStyle'
import { CircularProgress } from 'material-ui/Progress';
import { activeCategoryChanged } from '../actions/actions'
import Typography from 'material-ui/Typography/Typography';

class Categories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryValue: 'all',
      isLoading: false,
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.name });
    this.props.onChangeCategory(event.target.value);
  };

  showLoadingIcon(){
    return (
      <div style={{position: 'absolute', paddingLeft: 100,}}>
        <CircularProgress size={50} style={{position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginBottom: -12}} />
      </div>
    );
  }

  getCategoryName(id) {
    if (id === 'all' || id === 'undefined'){
      return 'all';
    }
    const activeCategory = this.props.categories.filter((category) => {
      if(String(category.id) === id){
        return true
      }
    });
    console.log('id is ', id)
    console.log('activecat', activeCategory);
    return activeCategory[0].name;
  }

  showCategoriesDropdown(){
    const { classes } = this.props;
    return (
      <div>
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="cat-inp">Category</InputLabel>
          <Select
            value={this.state.categoryValue}
            onChange={this.handleChange}
            input={<Input name="categoryValue" id="cat-inp" />}
            disabled={this.props.errorFetching}
            error={this.props.errorFetching}
            renderValue={value => this.props.errorFetching ? 'Error!' : 'Pick a category' }
          >
            <MenuItem key='all' value="all">All</MenuItem>
            {
              this.props.categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
            }
          </Select>
          <FormHelperText>{this.props.errorFetching ? 'Please check network connection' : 
          'Re-click to unselect a category' }</FormHelperText>
        </FormControl>
      </form>
      <Typography type="display2">
        Now showing {this.getCategoryName(this.props.activeCategoryId)}
      </Typography>
      </div>
    );
  }

  render() {
    return (
      <div>
          {
            this.props.isFetching ? this.showLoadingIcon() : this.showCategoriesDropdown()
          }  
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  onChangeCategory: PropTypes.func,
  activeCategoryId: PropTypes.string.isRequired,
};
  
Categories.defaultProps = {
  categories: [{}],
  activeCategoryId: 'all',
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCategory: (newCategory) => {dispatch(activeCategoryChanged(newCategory))}
  }
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories,
    isFetching: state.categories.isFetching,
    errorFetching: state.categories.errorFetching,
    activeCategoryId: String(state.posts.activeCategory),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Categories));
