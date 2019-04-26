import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Chip,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    Checkbox,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment/moment';
import _ from '@lodash';
import * as Actions from './store/actions';
import AddJobOffer from '../job-offer/AddJobOffer';

const newTodoState = {
    'id'       : '',
    'title'    : '',
    'notes'    : '',
    'startDate': new Date(),
    'dueDate'  : new Date(),
    'completed': false,
    'starred'  : false,
    'important': false,
    'deleted'  : false,
    'labels'   : []
};

class TodoDialog extends Component {

    state = {
        form       : {...newTodoState},
        labelMenuEl: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.todoDialog.props.open && this.props.todoDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.todoDialog.type === 'edit' &&
                this.props.todoDialog.data &&
                !_.isEqual(this.props.todoDialog.data, prevState) )
            {
                this.setState({form: {...this.props.todoDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.todoDialog.type === 'new' &&
                !_.isEqual(newTodoState, prevState) )
            {
                this.setState({
                    form: {
                        ...newTodoState,
                        id: FuseUtils.generateGUID()
                    }
                });
            }
        }
    }

    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        this.setState({form});
    };

    closeTodoDialog = () => {
        this.props.todoDialog.type === 'edit' ? this.props.closeEditTodoDialog() : this.props.closeNewTodoDialog();
    };

    handleLabelMenuOpen = (event) => {
        this.setState({labelMenuEl: event.currentTarget});
    };

    handleLabelMenuClose = (event) => {
        this.setState({labelMenuEl: null});
    };

    handleToggleImportant = () => {
        this.setState({
            form: {
                ...this.state.form,
                important: !this.state.form.important
            }
        });
    };

    handleToggleStarred = () => {
        this.setState({
            form: {
                ...this.state.form,
                starred: !this.state.form.starred
            }
        });
    };

    handleToggleLabel = (event, id) => {
        event.stopPropagation();
        this.setState({
            form: _.set({
                ...this.state.form,
                labels: this.state.form.labels.includes(id) ? this.state.form.labels.filter(labelId => labelId !== id) : [...this.state.form.labels, id]
            })
        });
    };

    toggleCompleted = () => {
        this.setState({
            form: {
                ...this.state.form,
                completed: !this.state.form.completed
            }
        })
    };

    canBeSubmitted()
    {
        const {title} = this.state.form;
        return (
            title.length > 0
        );
    }

    render()
    {
        const {todoDialog, addTodo, updateTodo, removeTodo, labels} = this.props;
        const {form, labelMenuEl} = this.state;
        let startDate, dueDate;

        if ( form )
        {
            startDate = moment(form.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
            dueDate = moment(form.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        }

        return (
            <Dialog {...todoDialog.props} onClose={this.closeTodoDialog} fullWidth maxWidth="sm">

                <DialogContent classes={{root: "p-0"}}>

                    <div className="mb-16">
                        <div className="flex items-center justify-between p-12">

                            <div className="flex">
                                
                            </div>

                            <div className="flex items-center justify-start" aria-label="Toggle star">
                               
                            </div>
                        </div>
                        <Divider className="mx-24"/>
                    </div>

                    {form.labels.length > 0 && (
                        <div className="flex flex-wrap  px-16 sm:px-24 mb-16">
                            {form.labels.map(label => (
                                <Chip
                                    avatar={(
                                        <Avatar
                                            classes={{colorDefault: "bg-transparent"}}>
                                            <Icon
                                                className="text-20"
                                                style={{color: _.find(labels, {id: label}).color}}
                                            >
                                                label
                                            </Icon>
                                        </Avatar>
                                    )}
                                    label="Create New Job Offer"
                                    onDelete={(ev) => this.handleToggleLabel(ev, label)}
                                    className="mr-8 my-8"
                                    classes={{label: "pl-4"}}
                                    key={label}
                                />
                            ))}
                        </div>
                    )}

                    <div className="px-16 sm:px-24">
                    <AddJobOffer/>

                    </div>

                </DialogContent>

            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditTodoDialog: Actions.closeEditTodoDialog,
        closeNewTodoDialog : Actions.closeNewTodoDialog,
        addTodo            : Actions.addTodo,
        updateTodo         : Actions.updateTodo,
        removeTodo         : Actions.removeTodo
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        todoDialog: todoApp.todos.todoDialog,
        labels    : todoApp.labels
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDialog);
