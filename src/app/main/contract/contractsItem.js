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

const styles = theme => ({
    todoItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .todo-title, & .todo-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function redirect(url){
    
    console.log(url);
    // history.push(url)

}

const TodoListItem = ({history,todo, labels, classes, openEditTodoDialog, toggleImportant, toggleStarred, toggleCompleted}) => {
    labels.forEach(element => {
        element.color = getRandomColor();
    });
    return (
       <ListItem
            onClick={() => {
                const url = '/recruitments/application/'+todo._id;
                history.push(url);
            }}
            dense
            disabled={todo.completed}
            button
            className={classNames(classes.todoItem, {"completed": todo.completed}, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >
             <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

              {todo._job &&  <Typography
                    variant="subtitle1"
                    className="todo-title truncate"
                    color={todo.completed ? "textSecondary" : "default"}
                >
                    {todo._job!==null ? todo._job.title : "Not Defined Yet"}
                </Typography>}

                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                    {todo && _.truncate(todo.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>

                <div className={classNames(classes.labels, "flex mt-8")}>
                        <Typography
                            color="textPrimary"
                            className="todo-notes truncate"
                        >
                            Applications {todo && todo._applications.length}
                        </Typography>
                      
                </div>
            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleImportant(todo)
                }}>
                    {todo.completed ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
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
           
            
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
       
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListItem)));
