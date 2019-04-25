import React, {Component} from 'react';
import {Button, FormControlLabel, MenuItem, Radio, Typography} from '@material-ui/core';
import {TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy, SelectFormsy} from '@fuse';
import Formsy from 'formsy-react';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    noLabel: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  function getStyles(name, that) {
    return {
      fontWeight:
        that.state.name.indexOf(name) === -1
          ? that.props.theme.typography.fontWeightRegular
          : that.props.theme.typography.fontWeightMedium,
    };
  }

class SimpleFormExample extends Component {

    state = {
        name:[],
        canSubmit: false,
        data: this.props.skills,
        jobs:this.props.jobs
    };
    componentDidMount()
    {
        this.props.getSkills();
        this.props.getJobs();
        this.setState({data:this.props.skills})
    }
    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.skills, prevProps.skills) || !_.isEqual(this.props.jobs, prevProps.jobs))
        {
            console.log(this.props.jobs);
            console.log(this.state.data);
            this.setState({jobs:this.props.jobs});
            this.setState({data:this.props.skills});
        }
    }
    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        const wrong = [model.wrong1,model.wrong2,model.wrong3];
        model.wrong = wrong;
        this.props.saveProduct(model);
    };
    handleChange = event => {
        this.setState({ name: event.target.value });
      };
    
    handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
             value.push(options[i].value);
            }
        }
        this.setState({
            name: value,
        });
    };
    render()
    {
        const {canSubmit,data,jobs} = this.state;
        const {classes,saveProduct} = this.props;
        return (
            <div className="max-w-sm">
                <Typography className="h2 mb-24">Example Formsy Form</Typography>
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >

                   
                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="question"
                        label="Question (What is the question for the quiz)"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        required
                        variant="outlined"
                    />
                     <TextFieldFormsy
                      className="my-16"
                      type="text"
                      label="Correct Answer"
                      name="correct"
                      variant="outlined"

                      required
                    />

                    <TextFieldFormsy
                     className="my-16"
                        
                      label="First Wrong Answer"
                      name="wrong1"
                      variant="outlined"

                      required
                    />

                    <TextFieldFormsy
                     className="my-16"
                     label="Second Wrong Answer"

                      name="wrong2"
                      variant="outlined"

                      required
                    />

                    <TextFieldFormsy
                     className="my-16 red"
                     label="Third Wrong Answer"
                      invalid
                      name="wrong3"
                      variant="outlined"

                      required
                    />
                        <SelectFormsy
                            className="my-16"
                            name="tags"
                            label="Skills Related To The Quiz"
                            variant="outlined"

                            multiple
                            required
                            value={this.state.name}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                <Chip key={value[0]} label={value[1]} className={classes.chip} />
                                ))}
                            </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {data.map(skill => (
                            <MenuItem key={skill._id} value={[skill._id,skill.name]} style={getStyles(skill.name, this)}>
                                {skill.name}
                            </MenuItem>
                            ))}
                    </SelectFormsy>
                    {/* Draft JS */}
                    <SelectFormsy
                            className="my-16"
                            name="jobs"
                            label="Skills Related To The Quiz"
                            variant="outlined"

                            multiple
                            required
                            value={this.state.name}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {jobs.map(job => (
                            <MenuItem key={job._id} value={job._id} style={getStyles(job.title, this)}>
                                {job.title}
                            </MenuItem>
                            ))}
                    </SelectFormsy>
                    
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mx-auto my-16"
                        aria-label="LOG IN"
                        disabled={!canSubmit}
                        
                    >
                        Can submit
                    </Button>
                </Formsy>
            </div>
        );
    }
}

SimpleFormExample.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  function mapDispatchToProps(dispatch)
  {
      return bindActionCreators({
          getSkills: Actions.getSkills,
          getProduct : Actions.getProduct,
          newProduct : Actions.newProduct,
          saveProduct: Actions.saveProduct,
            getJobs:Actions.getJobs,
      }, dispatch);
  }
  
  function mapStateToProps({eCommerceApp})
  {
      return {
          jobs: eCommerceApp.jobs.data,
          skills : eCommerceApp.skills.data,
          product: eCommerceApp.product
      }
  }
  
  export default withReducer('eCommerceApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(SimpleFormExample))));
// export default withStyles(styles, { withTheme: true })(SimpleFormExample);
