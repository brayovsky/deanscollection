import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { callEndpoint } from '../utils/api';
import CardMedia from 'material-ui/Card/CardMedia';
import { CircularProgress } from 'material-ui/Progress';

class Clothe extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageHref: '',
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
      <div style={{position: 'absolute', paddingLeft: 100,}}>
        <CircularProgress size={50} style={{position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginBottom: -12}} />
      </div>
    );
  }

  showMedia(){
    return (
      this.state.errorLoading ? <p style={{color: 'red'}}> :( error loading </p> :
        <CardMedia style={{width: '100%'}}>
          <img src={this.state.imageHref} width="100%" />
        </CardMedia>
    );
  }

  render() {
    return this.state.isLoading ? this.showLoadingIcon() : this.showMedia(); 
  }
}

Clothe.propTypes = {
  mediaEndpoint: PropTypes.string,
}

export default Clothe;
