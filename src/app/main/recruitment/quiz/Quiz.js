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
    }
  });

class Quiz extends React.Component {
  state = {
    selectedValue: 'a',
    data:[],
    disabled:this.props.response!==undefined,
  };

  componentDidMount(){
    
    let data = this.props.quiz.wrong;
    data.push(this.props.quiz.correct);
    this.setState({data});
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value }, function () {
        this.props.quizHandler({
            response:this.state.selectedValue,
            id:this.props.quiz._id,
        });
    });
  };

  render() {
    const { classes , quiz,response,result} = this.props;
    const {data,disabled} = this.state;
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
            {data.map(q=>{
              console.log(response.response == q);
              const checked = result.correct == q || result.answer == q;
              const correct = { color : checked ? (result.validate ? 'green' : (result.correct==q ? 'green' : 'red')) :''  };
              return <FormControlLabel  disabled={disabled} value={q} control={<Radio style={correct} checked={checked}/>} label={q} />
            
            })}
            {/* <FormControlLabel value={quiz.wrong[0]} control={<Radio />} label={quiz.wrong[0]} />
            <FormControlLabel value={quiz.wrong[1]} control={<Radio />} label={quiz.wrong[1]} />
            <FormControlLabel value={quiz.wrong[2]} control={<Radio />} label={quiz.wrong[2]} /> */}
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
