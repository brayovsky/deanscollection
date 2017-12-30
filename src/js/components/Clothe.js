import React from 'react';
import PropTypes from 'prop-types';
import { callEndpoint } from '../utils/api';
import CardMedia from 'material-ui/Card/CardMedia';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

class Clothe extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageHref: null,
      isLoading: true,
      errorLoading: false,
    }
  }

  componentDidMount() {
    callEndpoint(this.props.mediaEndpoint).then((response) => {
      if((response.message && response.message === 'whoopsy') || response.status !== 200){
        this.setState({isLoading: false, errorLoading: true})
      } else {
        this.setState({
          imageHref: response.body.media_details.sizes.full.source_url,
          isLoading: false, 
          errorLoading: false
        });
      }
    });
  }

  showLoadingIcon(){
    return (
      <div style={{height: 200}}>
        <CircularProgress size={50} style={{position: 'absolute', marginLeft: '100px', marginTop: '43px', color: '#ed145b'}} />
      </div>
    );
  }

  showMedia(){
    return (
      this.state.errorLoading ? <p style={{color: 'red'}}> :( error loading </p> :
        <CardMedia style={{width: '100%'}}>
          {this.state.imageHref ? <img src={this.state.imageHref} width="100%" /> : <div></div>}
        </CardMedia>
    );
  }

  render() {
    return this.state.isLoading && !this.props.isFetchingCategories ? this.showLoadingIcon() : this.showMedia(); 
  }
}

Clothe.propTypes = {
  mediaEndpoint: PropTypes.string,
  isFetchingCategories: PropTypes.bool.isRequired,
}

Clothe.defaultProps = {
  isFetchingCategories: true,
}

const mapStateToProps = (state) => {
  return {
    isFetchingCategories: state.categories.isFetching,
  }
}

export default connect(mapStateToProps)(Clothe);
