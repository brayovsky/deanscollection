import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from '../styles/clothesGridStyle';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

class ClothesGrid extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(16)}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item xs={12} sm={3}>
                <Paper className={classes.paper} title="Whats up!">
                  <p>This is content exceeding width and other stuff. No width in css</p>
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
};

export default withStyles(styles)(ClothesGrid);
