import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
const styles = theme => ({ 
   avatar: {
  marginTop: -10,
  marginRight:10,
},
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  column1: {
    float:'right',
    flexBasis: '30%',
  },
  column2: {
    flexBasis: '40%',
  },      
  link: {
    marginTop:2,
    float:'right',
  },
  column3: {
    flexBasis: '30%',
  },
  divider:
{
  marginTop:'40px',
  marginBottom:'5px'
}
});



const PaperSheet = ({lasolution, labels, classes, openAnswerDialog, toggleImportant, toggleStarred, toggleCompleted}) => {
  return (
    <div>
    <Paper  className={classes.root} elevation={1}>
      <Typography variant="h7" component="h3">
        {lasolution.content}
      </Typography>

      <Divider className={classes.divider} />
      <Typography variant="caption">
                
      <Typography className={classes.link} component="p" style={{opacity:0.5}}>
      {moment(lasolution.added_at).format("DD MMMM YYYY").toString()}
      </Typography>

      <Grid  container justify="right" alignItems="right">
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
    <Link to={`/home`}  activeClassName="active"> {lasolution.added_by.firstName} {lasolution.added_by.lastName}</Link>
     </Grid>

      
          </Typography>

    </Paper>
  </div>
  );}



PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  lasolution:PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
