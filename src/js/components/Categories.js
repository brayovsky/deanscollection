import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SelectInput from 'material-ui/Select';
import MenuItem from 'material-ui/Menu';
import { connect } from 'react-redux';
import categories from '../reducers/categories';

class Categories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryValue: ''
    }
  }

  handleChange(event, index, value){
    this.setState({ categoryValue: value });
    console.log('changed to ', value);
  }

  render(){
    return (
      <div
        style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        }}
      >
        <SelectInput
          value={this.state.categoryValue}
          onChange={this.handleChange}
          hinttext="Choose a category"
        >
          {
            this.props.categories
              .map(category => <MenuItem key={category.id} value={category.slug} primaryText={category.name} />)
          }
        </SelectInput>
      </div>
    );
  };
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Categories.defaultProps = {
  categories: [{}],
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories,
  };
};

export default connect(mapStateToProps)(Categories);
