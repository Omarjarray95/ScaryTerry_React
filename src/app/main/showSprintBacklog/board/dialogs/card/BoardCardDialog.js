import React, {Component} from 'react';
import {
    withStyles,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    InputAdornment,
    MenuItem
} from '@material-ui/core';
import * as Actions from 'app/main/showSprintBacklog/store/actions/index';
import * as scrumActions from 'app/store/actions/scrum';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import SelectFormsy from "../../../../../../@fuse/components/formsy/SelectFormsy";
import Formsy from "formsy-react";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import TextFieldFormsy from "../../../../../../@fuse/components/formsy/TextFieldFormsy";
import moment from 'moment';
import {withRouter} from "react-router-dom";

const styles = theme => ({
    paper: {
        color: theme.palette.text.primary
    }
});

const units = [
    {
        value: 'minutes',
        label: 'Minutes',
    },
    {
        value: 'hours',
        label: 'Hours',
    },
    {
        value: 'days',
        label: 'Days',
    },
    {
        value: 'weeks',
        label: 'Weeks',
    },
    {
        value: 'months',
        label: 'Months',
    },
    {
        value: 'years',
        label: 'Years',
    }
];

class BoardCardDialog extends Component {

    state = {
        title: "",
        description: "",
        priority: "",
        estimatedTime: "",
        member: "",
        testDescription: "",
        unit: 'hours',
        disabled: true
    };

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.item
            && (nextProps.item !== this.props.item)
            && (nextProps.operation === 'Create'))
        {
            this.setState({title: nextProps.item.title, description: nextProps.item.description,
                priority: nextProps.item.priority});
        }
        if (nextProps.item && nextProps.story
            && (nextProps.item !== this.props.item) && (nextProps.story !== this.props.story)
            && (nextProps.operation === 'Assign'))
        {
            this.setState({title: nextProps.story.title, description: nextProps.story.description,
                priority: nextProps.story.priority,
                estimatedTime: nextProps.story.estimatedTime ? nextProps.story.estimatedTime : "",
                member: nextProps.story.resource ? nextProps.story.resource._id : "",
                testDescription: nextProps.story.testDescription});
        }
    }

    handleTitleChange = (event) =>
    {
        this.setState({title: event.target.value});
    };

    handleDescriptionChange = (event) =>
    {
        this.setState({description: event.target.value});
    };

    handlePriorityChange = (event) =>
    {
        this.setState({priority: event.target.value});
    };

    handleEstimatedTimeChange = (event) =>
    {
        this.setState({estimatedTime: event.target.value});
    };

    handleMemberChange = (event) =>
    {
        this.setState({member: event.target.value});
    };

    handleTestDescriptionChange = (event) =>
    {
        this.setState({testDescription: event.target.value});
    };

    handleUnitChange = event =>
    {
        this.setState({unit: event.target.value})
    };

    onSubmit = () =>
    {
        var duration = null;
        if (this.state.estimatedTime !== "")
        {
            duration = moment.duration(Number(this.state.estimatedTime), this.state.unit).asHours();
        }

        var UserStory = {
            item: this.props.item._id,
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority,
            estimatedTime: duration,
            startDate: null,
            duration: null,
            resource: this.state.member !== "" ? this.state.member : null,
            testDescription: this.state.testDescription
        };
        if (this.props.operation === 'Create')
        {
            this.props.submitUserStory(UserStory, this.props.match.params.id);
        }
        else if (this.props.operation === 'Assign')
        {
            this.props.submitUpdateUserStory(UserStory, this.props.story._id, this.props.match.params.id);
        }
        this.handleResetUserStoryDialog();
    };

    handleEnableSubmitUserStory = () =>
    {
        this.setState({disabled: false});
    };

    handleDisableSubmitUserStory = () =>
    {
        this.setState({disabled: true});
    };

    handleResetUserStoryDialog = () =>
    {
        this.setState({estimatedTime: "", member: "", testDescription: ""});
    };

    render()
    {
        const {item, story, operation, project, classes, closeCardDialog} = this.props;
        const {title, description, priority, estimatedTime, member, testDescription, disabled} = this.state;

        return (
            <Dialog
                classes={{
                    paper: classNames(classes.paper, "max-w-lg w-full m-24")
                }}
                onClose={closeCardDialog}
                open={Boolean(item)}
            >
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.handleEnableSubmitUserStory}
                    onInvalid={this.handleDisableSubmitUserStory}
                    ref={(form) => this.form = form}
                >
                    {item && (
                        <DialogTitle component="div" className="p-0">
                            <AppBar position="static" elevation={1}>
                                <Toolbar className="flex w-full justify-between overflow-x-auto px-8 sm:px-16">
                                    <Typography className="text-white">
                                        {item.title}
                                    </Typography>
                                    <IconButton color="inherit" onClick={closeCardDialog}>
                                        <Icon>close</Icon>
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </DialogTitle>
                    )}

                    {item && (
                        <DialogContent className="p-16 sm:p-24">
                            <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
                                <div className="mb-16 sm:mb-0 flex flex-col" align="center">
                                    <Typography className="font-bold">
                                        Priority
                                    </Typography>
                                    <Typography>
                                        {item.priority}
                                    </Typography>
                                </div>
                                <div className="mb-16 sm:mb-0 flex flex-col" align="center">
                                    <Typography className="font-bold">
                                        Category
                                    </Typography>
                                    <Typography>
                                        {item.category}
                                    </Typography>
                                </div>
                                <div className="mb-16 sm:mb-0 flex flex-col" align="center">
                                    <Typography className="font-bold">
                                        State
                                    </Typography>
                                    <Typography>
                                        {item.state}
                                    </Typography>
                                </div>
                            </div>

                            <div className="flex items-center mb-24 border-1 p-4 rounded-4">
                                <Typography align="justify">
                                    {item.description}
                                </Typography>
                            </div>

                            <Divider/>


                            <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
                                <div className="mb-16 sm:mb-0 flex items-center">
                                    <TextFieldFormsy
                                        label="Priority"
                                        type="number"
                                        name="priority"
                                        value={priority}
                                        onChange={this.handlePriorityChange}
                                        className="w-full sm:w-auto"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        variant="outlined"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <TextFieldFormsy
                                        label="Estimated Work Time"
                                        type="number"
                                        name="estimatedTime"
                                        value={estimatedTime}
                                        onChange={this.handleEstimatedTimeChange}
                                        className="w-full sm:w-auto"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon color="action">access_time</Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                    <TextField
                                        select
                                        label=""
                                        name="unit"
                                        value={this.state.unit}
                                        onChange={this.handleUnitChange}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {units.map(unit => (
                                            <MenuItem key={unit.value} value={unit.value}>{unit.label}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                            </div>

                            <div className="flex items-center mb-24">
                                <TextFieldFormsy
                                    label="User Story Title"
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={this.handleTitleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </div>

                            <div className="w-full mb-24">
                                <TextFieldFormsy
                                    label="User Story Description"
                                    name="description"
                                    multiline
                                    rows="6"
                                    value={description}
                                    onChange={this.handleDescriptionChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </div>

                            <div className="w-full mb-24">
                                <SelectFormsy
                                    className="w-full"
                                    name="resource"
                                    label="Member"
                                    value={member}
                                    onChange={this.handleMemberChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="">
                                        <em>Choose One Member...</em>
                                    </MenuItem>
                                    {project.developmentTeam.length > 0 && (project.developmentTeam.map(member => (
                                        <MenuItem key={member._id} value={member._id}>
                                            {member.firstName + " " + member.lastName}</MenuItem>
                                    )))}
                                </SelectFormsy>
                            </div>

                            <div className="w-full mb-24">
                                <TextFieldFormsy
                                    label="User Story Test Description"
                                    name="testDescription"
                                    multiline
                                    rows="6"
                                    value={testDescription}
                                    onChange={this.handleTestDescriptionChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                        </DialogContent>
                    )}

                    {item && (<DialogActions>
                        <Button onClick={this.handleResetUserStoryDialog} color="primary">
                            Reset
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={disabled}>
                            {operation === 'Create' ? "Add User Story To Sprint Backlog" :
                                operation === 'Assign' ? "Update User Story" : ""}
                        </Button>
                    </DialogActions>)}
                </Formsy>
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeCardDialog : Actions.closeCardDialog,
        submitUserStory: scrumActions.addUserStory,
        submitUpdateUserStory: scrumActions.updateUserStory
    }, dispatch);
}

function mapStateToProps({scrum, scrumboardApp})
{
    return {
        item : scrumboardApp.card,
        operation: scrumboardApp.operation,
        story: scrumboardApp.story,
        project: scrum.project
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardCardDialog)));
