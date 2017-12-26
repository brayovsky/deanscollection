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

class Categories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryValue: 10,
      dialogOpen: false,
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

  render() {
    const { classes } = this.props;

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
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="cat-inp">Category</InputLabel>
                <Select
                  value={this.state.categoryValue}
                  onChange={this.handleChange('categoryValue')}
                  input={<Input id="cat-inp" />}
                >
                  {
                    this.props.categories.map(category => <MenuItem key={category.id} value={category.slug}>{category.name}</MenuItem>)
                  }
                </Select>
                {/*<FormHelperText>Re-click to unselect a category</FormHelperText>*/}
              </FormControl>
            </form>
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
  categories: [{id: 5, count: 10, description: "", link: "http://deanscollection.co.ke/wp/category/african-print/", name: "African Print", slug: "african-print"}],
};
  
const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Categories));
