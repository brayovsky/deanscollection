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
import Grid from 'material-ui/Grid/Grid';
import {withRouter} from "react-router-dom"

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
    const nextCategory = this.props.categories.filter(category => category.id === event.target.value)[0];
    const nextCategoryName = nextCategory.name;
    this.props.history.push(nextCategoryName);
    this.props.onChangeCategory(event.target.value);
  };

  showLoadingIcon(){
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={Number(40)}>
            <Grid item xs={12} sm={4}>
              <div style={{position: 'absolute', paddingLeft: 100, height: 100, width: '100%'}}>
                <CircularProgress size={50} className={classes.spinner} size={30} />
              </div>
            </Grid>
        </Grid>
      </Grid>
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
    return activeCategory[0].name;
  }

  showCategoriesDropdown(){
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={Number(40)}>
            <Grid item xs={12} sm={4}>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="cat-inp">Category</InputLabel>
                  <Select
                    value={this.state.categoryValue}
                    onChange={this.handleChange}
                    input={<Input name="categoryValue" id="cat-inp" />}
                    disabled={this.props.errorFetching}
                    error={this.props.errorFetching}
                    renderValue={value => this.props.errorFetching ? 'Error!' : 'What do you prefer?' }
                  >
                    <MenuItem key='all' value="all">All</MenuItem>
                    {
                      this.props.categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
                    }
                  </Select>
                  <FormHelperText>{this.props.errorFetching ? 'Please check network connection' : 
                  'Click to select a category' }</FormHelperText>
                </FormControl>
              </form>
            </Grid>
        </Grid>
        <Grid container justify="center" spacing={Number(40)}>
            <Grid item xs={12} sm={4}>
              <Typography
                type="subheading"
                align="center"
                style={{marginBottom: 23}}
                gutterBottom
                >
                Now showing <span style={{color: 'ed145b'}}>{this.getCategoryName(this.props.activeCategoryId)}</span>
              </Typography>
            </Grid>
        </Grid>
      </Grid>
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
    onChangeCategory: (newCategory) => {dispatch(activeCategoryChanged(newCategory))} // Push into history
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Categories)));
