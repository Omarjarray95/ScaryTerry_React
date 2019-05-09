import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {FuseExample} from '@fuse';
import TextField from '@material-ui/core/TextField';
import Inputs from '../../../components/material-ui/material-ui-examples/text-fields/Inputs';
import  MultipleSelects from './MultipleSelects';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
  // Here we can put the desired component for each step
  
  switch (stepIndex) {
    case 0:
      return <div><TextField
      id="standard-full-width"
      label="Question"
      style={{ margin: 8 }}
      placeholder="What is the question for your quiz ?"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
    /></div>;
    // return "EHHHH"
    case 1:
    return <Inputs></Inputs>
    //   return <Typography className="mb-16" component="div"><FuseExample
    //     className="my-24"
    //     iframe={false}
    //     component={require('app/main/components/material-ui/material-ui-examples/text-fields/Inputs.js').default}
    // /></Typography>;
    case 2:
    //   return <Typography className="mb-16" component="div"><FuseExample
    //   className="my-24"
    //   iframe={false}
    //   component={require('app/main/components/material-ui/material-ui-examples/selects/MultipleSelect.js').default}
    //   /></Typography>;
      return <MultipleSelects></MultipleSelects>
    default:
    return 'Unknown stepIndex';
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
