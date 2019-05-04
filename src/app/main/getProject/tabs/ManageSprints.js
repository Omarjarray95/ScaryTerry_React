import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {bindActionCreators} from "redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {Card, CardActions, CardContent, MenuItem, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from '@date-io/date-fns';
import Formsy from "formsy-react";
import TextFieldFormsy from "../../../../@fuse/components/formsy/TextFieldFormsy";
import * as Actions from 'app/store/actions/scrum';
import moment from "moment";
import history from "../../../../history";

const styles = {
    card: {
        minWidth: 250,
        margin: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 'bold'
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    }
};

const units = [
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

class ManageSprints extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            openSprintDialog: false,
            disabled: true,
            goal: "",
            description: "",
            startingDate: null,
            duration: "",
            unit: 'days'
        };

        this.handleOpenSprintDialog = this.handleOpenSprintDialog.bind(this);
        this.handleCloseSprintDialog = this.handleCloseSprintDialog.bind(this);
        this.handleResetSprintDialog = this.handleResetSprintDialog.bind(this);
        this.handleEnableSubmitSprint = this.handleEnableSubmitSprint.bind(this);
        this.handleDisableSubmitSprint = this.handleDisableSubmitSprint.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStartingDateChange = this.handleStartingDateChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleDeleteSprint = this.handleDeleteSprint.bind(this);
    }

    handleOpenSprintDialog = () =>
    {
        this.setState({openSprintDialog: true});
    };

    handleCloseSprintDialog = () =>
    {
        this.setState({openSprintDialog: false});
    };

    handleResetSprintDialog = () =>
    {
        this.setState({goal: "", description: "", startingDate: null, duration: ""});
    };

    handleEnableSubmitSprint = () =>
    {
        this.setState({disabled: false});
    };

    handleDisableSubmitSprint = () =>
    {
        this.setState({disabled: true});
    };

    handleGoalChange = event =>
    {
        this.setState({goal: event.target.value})
    };

    handleDescriptionChange = event =>
    {
        this.setState({description: event.target.value})
    };

    handleStartingDateChange = event =>
    {
        this.setState({startingDate: event})
    };

    handleDurationChange = event =>
    {
        this.setState({duration: event.target.value})
    };

    handleUnitChange = event =>
    {
        this.setState({unit: event.target.value})
    };

    onSubmit = () =>
    {
        var duration = 0;
        switch (this.state.unit)
        {
            case 'weeks':
                duration = this.state.duration * 7;
                break;
            case 'months':
                duration = this.state.duration * 28;
                break;
            case 'years':
                duration = this.state.duration * 365;
                break;
            default:
                duration = this.state.duration;
        }

        var sprint = {
            goal: this.state.goal,
            description: this.state.description,
            startDate: this.state.startingDate,
            duration: duration
        };

        this.props.submitAddSprint(sprint, this.props.match.params.id);
        this.handleResetSprintDialog();
        this.handleCloseSprintDialog();
    };

    handleDeleteSprint = (id) =>
    {
        this.props.submitDeleteSprint(id, this.props.match.params.id);
    };

    handleNavigateToSprintBacklog = (id) =>
    {
        history.push('/projects/get/sprint/sprintbacklog/'+ id);
    };

    componentDidMount()
    {

    }

    render()
    {
        const {classes, project} = this.props;
        const {disabled} = this.state;

        return (
            <div className="md:flex max-w-2xl">
                <Grid container direction="row" wrap="wrap" justify="center">
                    {project.sprints.length > 0 && (project.sprints.map((sprint) =>
                        (<Card key={sprint._id} className={classes.card}>
                            <CardContent>
                                <Grid container alignItems="center" direction="column">
                                    <Typography className={classes.title} color="textPrimary">
                                        Sprint {(project.sprints.indexOf(sprint)+1)}
                                    </Typography>
                                    <Typography className={classes.fullName} color="textSecondary">
                                        {sprint.goal}
                                    </Typography>
                                    <Button
                                        type="button"
                                        className="mb-8"
                                        onClick={() => this.handleNavigateToSprintBacklog(sprint._id)}
                                        variant="contained"
                                        color="secondary">
                                        Show Sprint Backlog
                                    </Button>
                                    <Typography className="border-4 p-8" paragraph={true} align={"justify"}>
                                        {sprint.description}
                                    </Typography>
                                    <div className="flex flex-col mb-8" align="center">
                                        {sprint.startDate && (<Typography className="font-bold">
                                            Supposed To Begin At
                                        </Typography>)}
                                        {sprint.startDate && (<Typography>
                                            {moment(sprint.startDate).format("DD MMMM YYYY").toString()}
                                        </Typography>)}
                                    </div>
                                    <div className="flex flex-col" align="center">
                                        <Typography className="font-bold">
                                            Supposed To Last For
                                        </Typography>
                                        <Typography>
                                            {sprint.duration} Days
                                        </Typography>
                                    </div>
                                </Grid>
                            </CardContent>
                            <CardActions className="flex justify-center">
                                <Button
                                    type="button"
                                    onClick={() => this.handleDeleteSprint(sprint._id)}
                                    variant="contained"
                                    color="primary">
                                    Delete
                                    <DeleteIcon />
                                </Button>
                            </CardActions>
                        </Card>)))}
                    <Tooltip title="Add"  disableFocusListener disableTouchListener onClick={this.handleOpenSprintDialog}>
                        <Fab color="primary">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
                <Dialog
                    open={this.state.openSprintDialog}
                    onClose={this.handleCloseSprintDialog}
                    aria-labelledby="form-dialog-sprint"
                    maxWidth="sm"
                    fullWidth={true}
                >
                    <DialogTitle id="form-dialog-sprint" align="center">Add New Sprint</DialogTitle>

                        <Formsy
                            onValidSubmit={this.onSubmit}
                            onValid={this.handleEnableSubmitSprint}
                            onInvalid={this.handleDisableSubmitSprint}
                            ref={(form) => this.form = form}
                        >
                            <DialogContent>
                                <TextFieldFormsy
                                    id="goal"
                                    label="Sprint Goal"
                                    type="text"
                                    name="goal"
                                    className="mb-8"
                                    fullWidth
                                    value={this.state.goal}
                                    onChange={this.handleGoalChange}
                                    required
                                />
                                <TextFieldFormsy
                                    multiline
                                    rows="4"
                                    className="mb-8"
                                    id="description"
                                    label="Sprint Description"
                                    type="text"
                                    name="description"
                                    fullWidth
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChange}
                                    required
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-between" direction="row">
                                        <DatePicker
                                            margin="normal"
                                            label="Starting Date"
                                            name="startingDate"
                                            value={this.state.startingDate}
                                            onChange={this.handleStartingDateChange}
                                        />
                                        <div className="flex flex-col">
                                            <TextFieldFormsy
                                                label="Duration"
                                                value={this.state.duration}
                                                onChange={this.handleDurationChange}
                                                type="number"
                                                name="duration"
                                                className="mb-8"
                                                required
                                            />
                                            <TextField
                                                select
                                                label=""
                                                name="unit"
                                                value={this.state.unit}
                                                onChange={this.handleUnitChange}
                                                margin="normal"
                                            >
                                                {units.map(unit => (
                                                    <MenuItem key={unit.value} value={unit.value}>{unit.label}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleResetSprintDialog} color="primary">
                                    Reset
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={disabled}>
                                    Add
                                </Button>
                            </DialogActions>
                        </Formsy>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitAddSprint: Actions.addSprint,
        submitDeleteSprint: Actions.deleteSprint
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        project: scrum.project
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (ManageSprints)));