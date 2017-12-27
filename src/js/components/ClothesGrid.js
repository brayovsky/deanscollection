import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from '../styles/clothesGridStyle';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

class ClothesGrid extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const { posts } = this.props;
    console.log('posts is ', posts)

    return (
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(16)}>
            { posts.map(post => (
              <Grid key={post.id} item xs={12} sm={4}>
                <Paper className={classes.paper} title={post.title.rendered}>
                  <p>{ post._links['wp:featuredmedia'][0].href }</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ClothesGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ClothesGrid.defaultProps = {
  posts: [{id:'fake', title: {rendered: 'title'}, _links: { 'wp:featuredmedia': 'heyall' }}],
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    isFetching: state.posts.isFetching,
    errorFetching: state.posts.errorFetching,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(ClothesGrid));
