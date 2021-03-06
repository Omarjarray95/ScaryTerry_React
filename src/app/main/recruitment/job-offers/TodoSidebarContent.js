import React from 'react';
import {withStyles, Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';

const styles = theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
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

function TodoSidebarContent({classes, folders, filters, labels, openNewTodoDialog})
{
    labels.forEach(element => {
        element.color = getRandomColor();
    });
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Button
                        onClick={() => {
                            openNewTodoDialog();
                        }}
                        variant="contained"
                        color="primary"
                        className="w-full"
                    >
                        ADD JOB-OFFER
                    </Button>
                </div>

                <div className={classes.listWrapper}>

                    <List>
                    <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/all'} 
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" color="action">view_headline</Icon>
                                <ListItemText primary="All" disableTypography={true}/>
                            </ListItem>
                    </List>

                    {/* <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>

                        {filters.length > 0 && filters.map((filter) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/filter/' + filter.handle}
                                activeClassName="active"
                                className={classes.listItem}
                                key={filter.id}
                            >
                                <Icon className="list-item-icon" color="action">{filter.icon}</Icon>
                                <ListItemText primary={filter.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List> */}

                    <List>

                        <ListSubheader className="pr-24 pl-24" disableSticky>LABELS</ListSubheader>

                        {labels.length > 0 && labels.map((label) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/label/' + label._id}
                                key={label._id}
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" style={{color: label.color}}
                                      color="action">label</Icon>
                                <ListItemText primary={label.name} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openNewTodoDialog: Actions.openNewTodoDialog
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        folders: todoApp.folders,
        labels : todoApp.labels,
        filters: todoApp.filters
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoSidebarContent)));
