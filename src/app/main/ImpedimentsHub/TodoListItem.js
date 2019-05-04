import React from 'react';
import {withStyles, IconButton, Icon, Typography, Checkbox, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import PaperSheet from './PaperSheet';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import List from '@material-ui/core/List';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';


const styles = theme => ({
    root: {
        width: '100%',
      },
      root3: {
        width: '90%',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
      },
      details: {
        flexDirection:'column'
      }
      ,
      details2: {
        flexDirection:'row'
      },
      column0: {
        flexBasis: '5%',
      },
      column1: {
        marginTop:'2.5%',
        flexBasis: '7%',
      },
      column: {
        flexBasis: '100%',
        width:'100%'
      },
      helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
       todoItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .todo-title, & .todo-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});


const TodoListItem = ({todo, labels, classes, openAnswerDialog, toggleImportant, toggleStarred, toggleCompleted}) => {
    return (

<ExpansionPanel   
            dense
            button  className={classNames(classes.todoItem, {"completed": todo.completed}, "border-solid border-b-1 py-16  px-0 sm:px-8")}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleImportant(todo)
                }}>
                    {todo.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="todo-title truncate"
                    color={todo.completed ? "textSecondary" : "default"}
                >
                    {todo.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                    {_.truncate(todo.notes.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>

                 <div className={classNames(classes.labels, "flex mt-8")}>
                    {todo.labels.map(label => (
                        <TodoChip
                            className="mr-4"
                            title={_.find(labels, {id: label}).title}
                            color={_.find(labels, {id: label}).color}
                            key={label}
                        />
                    ))}
                </div> 
            </div>

            <div className="px-8">

                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(todo)
                }}>
                    {todo.starred ? (
                        <Icon style={{color: amber[500]}}>star</Icon>
                    ) : (
                        <Icon>star_outline</Icon>
                    )}
                </IconButton>
            </div>
            </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>




                {todo.solution.length==0 ? (
                         <FuseAnimate delay={100}>
                         <div className="flex flex-1 items-center justify-center h-full">
                             <Typography color="textSecondary" variant="h5">
                                 There are no Solutions !
                             </Typography>
                         </div>
                     </FuseAnimate>
                    ) : (

                      <List className={classes.root3}>
                      <FuseAnimateGroup
                          enter={{
                              animation: "transition.slideUpBigIn"
                          }}
                      >
                          {
                              todo.solution.map((sol) => (


                                <ListItem alignItems="flex-start">
                                <div className={classes.column0}/>
                                  <div className={classes.column1}>
                                  <IconButton onClick={(ev) => {
                                              ev.preventDefault();
                                              ev.stopPropagation();
                                              toggleStarred(todo)
                                          }}>
                                              {todo.starred ? (
                                                  <Icon style={{color: amber[500]}}>star</Icon>
                                              ) : (
                                                  <Icon>star_outline</Icon>
                                              )}
                                          </IconButton>
                                          <Typography style={{marginLeft:12}} variant="h4">{sol.starred_by.length}</Typography>
                                      </div>
                                    <div className={classes.column}>
                                      <PaperSheet lasolution={sol} key={sol._id}/>
                                    </div>
                                </ListItem>

                                  )
                              )
                          }
                      </FuseAnimateGroup>
                  </List>
)}

 



        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
       
          <Button size="medium" color="primary"
          
          onClick={() => {
            openAnswerDialog(todo);
        }}
          
          >
           Propose Solution
          </Button>
        </ExpansionPanelActions>
            </ExpansionPanel>


);
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleCompleted   : Actions.toggleCompleted,
        toggleImportant   : Actions.toggleImportant,
        toggleStarred     : Actions.toggleStarred,
        openEditTodoDialog: Actions.openEditTodoDialog,
        openAnswerDialog: Actions.openEditTodoDialog

    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        labels: todoApp.labels
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListItem)));
