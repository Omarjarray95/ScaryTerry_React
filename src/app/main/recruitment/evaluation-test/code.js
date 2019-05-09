import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Code(props) {
  const { classes ,code } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h5">
          This is the Problem to solve , Please join a file attached with your reponse just below .
          Good Luck !!
        </Typography>
        <Typography variant="h3" component="h3">
          {code.problem}
        </Typography>
      </Paper>
    </div>
  );
}

Code.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Code);
