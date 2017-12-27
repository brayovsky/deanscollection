import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from '../styles/clothesGridStyle';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import Card from 'material-ui/Card/Card';
import Clothe from './Clothe';

class ClothesGrid extends React.Component {
  constructor(props){
    super(props);
  }

  showCards() {
    const { posts } = this.props;
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={Number(40)}>
          { posts.map(post => (
            <Grid key={post.id} item xs={12} sm={4}>
              <Card>
                <Clothe mediaEndpoint={post._links['wp:featuredmedia'][0].href} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }

  showLoadingIcon() {
    return (
      <div style={{position: 'absolute', paddingLeft: 100,}}>
        <CircularProgress size={50} style={{position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginBottom: -12}} />
      </div>
    );
  }

  showErrorText() {
    return (
      <div>
        <p style={{color: 'red'}}>:( an error occurred! </p>
        <br/>
        <p>Check your network connection</p>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container alignItems="center" className={classes.root}>
        {this.props.isFetching ? this.showLoadingIcon() : this.showCards() }
        {this.props.errorFetching ? this.showErrorText() : <p></p> }
      </Grid>
    );
  }
}

ClothesGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorFetching: PropTypes.bool.isRequired,
};

ClothesGrid.defaultProps = {
  posts: [{id:'fake', title: {rendered: 'title'}, _links: { 'wp:featuredmedia': 'heyall' }}],
  isFetching: false,
  errorFetching: false,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    isFetching: state.posts.isFetching,
    errorFetching: state.posts.errorFetching,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(ClothesGrid));
