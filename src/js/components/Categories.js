import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import styles from '../styles/categoryStyle'
import { CircularProgress } from 'material-ui/Progress';

class Categories extends React.Component {
  constructor(props){
    super(props);
    // this.showLoadingIcon = this.showLoadingIcon.bind(this);

    this.state = {
      categoryValue: 'Category',
      dialogOpen: false,
      isLoading: false,
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  showLoadingIcon(){
    return (
      <div style={{position: 'absolute', paddingLeft: 100,}}>
        <CircularProgress size={50} style={{position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginBottom: -12}} />
      </div>
    );
  }

  showCategoriesDropdown(){
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="cat-inp">Category</InputLabel>
          <Select
            value={this.state.categoryValue}
            onChange={this.handleChange('categoryValue')}
            input={<Input id="cat-inp" />}
            disabled={this.props.errorFetching}
            error={this.props.errorFetching}
            renderValue={value => this.props.errorFetching ? 'Error!' : value }
          >
            {
              this.props.categories.map(category => <MenuItem key={category.id} value={category.slug}>{category.name}</MenuItem>)
            }
          </Select>
          <FormHelperText>{this.props.errorFetching ? 'Please check network connection' : 
          'Re-click to unselect a category' }</FormHelperText>
        </FormControl>
      </form>
    );
  }

  render() {

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Choose a category</Button>
        <Dialog
          ignoreBackdropClick
          ignoreEscapeKeyUp
          open={this.state.dialogOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>Choose a category</DialogTitle>
          <DialogContent>
          {
            this.props.isFetching ? this.showLoadingIcon() : this.showCategoriesDropdown()
          }  
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};
  
Categories.defaultProps = {
  categories: [{}],
};
  
const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories,
    isFetching: state.categories.isFetching,
    errorFetching: state.categories.errorFetching,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Categories));
