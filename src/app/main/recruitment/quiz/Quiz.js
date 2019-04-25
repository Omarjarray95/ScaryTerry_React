import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  });

class Quiz extends React.Component {
  state = {
    selectedValue: 'a',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    const { classes , quiz} = this.props;

    return (
        <FuseAnimate animation="transition.slideRightIn" delay={300}>

      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{quiz.question}</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
          {/* Try to do a map here and add a random stuff to order the RadioButtons */}
            <FormControlLabel value={quiz.correct} control={<Radio />} label={quiz.correct} />
            <FormControlLabel value={quiz.wrong[0]} control={<Radio />} label={quiz.wrong[0]} />
            <FormControlLabel value={quiz.wrong[1]} control={<Radio />} label={quiz.wrong[1]} />
            <FormControlLabel value={quiz.wrong[2]} control={<Radio />} label={quiz.wrong[2]} />
          </RadioGroup>
        </FormControl>
      </div>
      </FuseAnimate>
    );
  }
}

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quiz);
