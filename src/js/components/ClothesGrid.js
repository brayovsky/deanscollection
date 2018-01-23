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
import { fetchConsequentPages } from '../actions/actions';
import CardContent from 'material-ui/Card/CardContent';
import Typography from 'material-ui/Typography/Typography';
const _ = require('lodash');

class ClothesGrid extends React.Component {
  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      fetch: props.currentPage,
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', _.throttle(this.handleScroll, 1000));
  }

  componentWillUnmount(){   
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 1000));
  }

  showCards() {   
    const { posts } = this.props;
    const { classes } = this.props;
    if(posts.length === 0) {
      return (
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(40)}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography className={classes.infoText}> No posts found </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Grid>)
    }
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
        <CircularProgress size={50} style={{position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginBottom: -12, color: '#ed145b'}} />
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

  handleScroll(event) {
    if (this.props.currentPage >= this.props.totalPages){
      return;
    }
    this.setState({fetch: ++this.state.fetch});
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = document.documentElement.scrollTop;
    const scrollPercentage = (scrollPosition/documentHeight) * 100;
    if(scrollPercentage > 99.7){
      this.props.fetchMoreImages(this.props.activeCategoryId, this.props.currentPage);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container alignItems="center" className={classes.root}>
        {/* doing first fetch */}
        { this.props.fetch === 1  && this.props.isFetching ? <p></p> : this.showCards() }
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
  fetchMoreImages: PropTypes.func.isRequired,
  activeCategoryId: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

ClothesGrid.defaultProps = {
  posts: [{id:'fake', _links: { 'wp:featuredmedia': 'heyall' }}],
  isFetching: false,
  errorFetching: false,
  fetchMoreImages: (cat, page) => {},
  activeCategoryId: 'all',
  currentPage: 1,
  totalPages: 1,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    isFetching: state.posts.isFetching,
    errorFetching: state.posts.errorFetching,
    activeCategoryId: String(state.posts.activeCategory),
    currentPage: state.posts.page,
    totalPages: Number(state.posts.totalPages),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMoreImages: (currentCategory, currentPage) => {
      dispatch(fetchConsequentPages(currentCategory, currentPage))
    },
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ClothesGrid));
