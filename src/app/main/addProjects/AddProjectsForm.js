import React, {Component} from 'react';
import {Button, MenuItem, withStyles} from '@material-ui/core';
import {SelectFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from "redux";
import * as Actions from 'app/store/actions/scrum';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import {showMessage} from "../../store/actions/fuse";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

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

class AddProjectsForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            expandedEnterprise: false,
            validDates: true,
            program: "",
            title: "",
            description: "",
            enterprise: "",
            field: "",
            startingDate: null,
            endingDate: null,
            duration: "",
            unit: "days",
            programName: "",
            fieldName: "",
            enterpriseName: "",
            field1: "",
            fieldName1: ""
        };

        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleEnterpriseChange = this.handleEnterpriseChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleStartingDateChange = this.handleStartingDateChange.bind(this);
        this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleProgramNameChange = this.handleProgramNameChange.bind(this);
        this.handleFieldNameChange = this.handleFieldNameChange.bind(this);
        this.handleEnterpriseNameChange = this.handleEnterpriseNameChange.bind(this);
        this.handleField1Change = this.handleField1Change.bind(this);
        this.handleFieldName1Change = this.handleFieldName1Change.bind(this);
    }

    form = React.createRef();

    showMessages = (message, operation) =>
    {
        this.props.showMessage({
            message     : message,
            autoHideDuration: 6000,
            anchorOrigin: {
                vertical  : 'bottom',
                horizontal: 'right'
            },
            variant: operation
        })
    };

    validate = () =>
    {
        if (!this.props.programname.status)
        {
            this.showMessages(this.props.programname.message, 'error');
            return false;
        }
        if (!this.props.name.status)
        {
            this.showMessages(this.props.name.message, 'error');
            return false;
        }
        if (this.state.field === "")
        {
            if (this.state.fieldName === "")
            {
                this.showMessages("You haven't choose a field for your new project. Please pick a field " +
                    "or add it quickly in the settings panel.", 'error');
                return false;
            }
            else if (!this.props.fieldname.status)
            {
                this.showMessages(this.props.fieldname.message, 'error');
                return false;
            }
        }
        if (this.state.enterprise === "")
        {
            if (this.state.enterpriseName === "")
            {
                this.showMessages("You haven't choose an enterprise to your new user. Please pick an enterprise " +
                    "or add it quickly in the settings panel.", 'error');
                return false;
            }
            else
            {
                if (!this.props.enterprisename.status)
                {
                    this.showMessages(this.props.enterprisename.message, 'error');
                    return false;
                }
                else if (this.state.field1 === "")
                {
                    if (this.state.fieldName1 === "")
                    {
                        this.showMessages("You haven't choose a field for your new enterprise. Please pick a field " +
                            "or add it quickly in the settings panel.", 'error');
                        return false;
                    }
                    else if (!this.props.fieldname1.status)
                    {
                        this.showMessages(this.props.fieldname1.message, 'error');
                        return false;
                    }
                }
            }
        }
        if (!this.state.validDates)
        {
            this.showMessages("Your project ends before it even starts, please fix its starting and/or ending date.", 'error');
            return false;
        }

        return true;
    };

    onSubmit = () =>
    {
        if (this.validate())
        {
            this.setState({canSubmit: true});

            if (this.state.startingDate !== null && this.state.endingDate !== null && this.state.duration === "")
            {
                this.setState({duration: moment.duration(this.state.endingDate - this.state.startingDate, 'milliseconds')
                        .asDays()});
            }
            if (this.state.startingDate !== null && this.state.duration !== "" && this.state.endingDate === null)
            {
                var date = moment(this.state.startingDate).add(this.state.duration, this.state.unit)
                    .format("YYYY-MM-DDTHH:mm:ss").toString();
                this.setState({endingDate: new Date(date)});
                this.setState({duration: moment.duration(new Date(date) - this.state.startingDate, 'milliseconds')
                        .asDays()});
            }
            if (this.state.endingDate !== null && this.state.duration !== "" && this.state.startingDate === null)
            {
                date = moment(this.state.endingDate).subtract(this.state.duration, this.state.unit)
                    .format("YYYY-MM-DDTHH:mm:ss").toString();
                this.setState({startingDate: new Date(date)});
                this.setState({duration: moment.duration(this.state.endingDate - new Date(date), 'milliseconds')
                        .asDays()});
            }

            var program = this.state.program !== "" ? this.state.program : null;
            var field = this.state.field !== "" ? this.state.field : null;
            var enterprise = this.state.enterprise !== "" ? this.state.enterprise : null;
            var startingDate = this.state.startingDate !== "" ? this.state.startingDate : null;
            var endingDate = this.state.endingDate !== "" ? this.state.endingDate : null;
            var duration = this.state.duration !== "" ? this.state.duration : null;
            var programName = this.state.programName !== "" ? this.state.programName : null;
            var fieldName = this.state.fieldName !== "" ? this.state.fieldName : null;
            var enterpriseName = this.state.enterpriseName !== "" ? this.state.enterpriseName : null;
            var field1 = this.state.field1 !== "" ? this.state.field1 : null;
            var fieldName1 = this.state.fieldName1 !== "" ? this.state.fieldName1 : null;

            var project = {
                program: program,
                title: this.state.title,
                description: this.state.description,
                field: field,
                entreprise: enterprise,
                startDate: startingDate,
                endDate: endingDate,
                duration: duration,
                programName: programName,
                fieldName: fieldName,
                entrepriseName: enterpriseName,
                fieldName1: field1,
                fieldName2: fieldName1,
                scrumMaster: localStorage.getItem('id')
            };
            this.props.submitAddProject({project});
            this.reset();
            this.resetSettings();
        }
    };

    handleEnterprisePanel = panel => (event, expanded) =>
    {
        this.setState({
            expandedEnterprise: expanded ? panel : false,
        });
    };

    handleProgramChange = event =>
    {
        this.setState({program: event.target.value});
    };

    handleTitleChange = event =>
    {
        this.setState({title: event.target.value});
        var title = event.target.value;
        this.props.verifyTitle({title});
    };

    handleDescriptionChange = event =>
    {
        this.setState({description: event.target.value});
    };

    handleEnterpriseChange = event =>
    {
        this.setState({enterprise: event.target.value});
    };

    handleFieldChange = event =>
    {
        this.setState({field: event.target.value});
    };

    handleStartingDateChange = event =>
    {
        this.setState({startingDate: event});
        if (this.state.endingDate !== null)
        {
            this.setState({validDates: event < this.state.endingDate});
        }
        else
        {
            this.setState({validDates: true});
        }
    };

    handleEndingDateChange = event =>
    {
        this.setState({endingDate: event});
        if (this.state.startingDate !== null)
        {
            this.setState({validDates: event > this.state.startingDate});
        }
        else
        {
            this.setState({validDates: true});
        }
    };

    handleDurationChange = event =>
    {
        this.setState({duration: event.target.value});
    };

    handleUnitChange = event =>
    {
        this.setState({unit: event.target.value});
    };

    reset = () =>
    {
        this.setState({program: "", title: "", description: "", field: "", enterprise: "", startingDate: null,
            endingDate: null, duration: ""});
        this.props.name.status = true;
    };

    resetSettings = () =>
    {
        this.setState({programName: "", fieldName: "", enterpriseName: "", field1: "", fieldName1: ""});
        this.props.programname.status = true;
        this.props.fieldname.status = true;
        this.props.enterprisename.status = true;
        this.props.fieldname1.status = true;
    };

    resetDates = () =>
    {
        this.setState({startingDate: null, endingDate: null});
    };

    handleProgramNameChange = event =>
    {
        this.setState({programName: event.target.value});
        var program = event.target.value;
        console.log(event.target.value);
        this.props.verifyProgramName(program);
    };

    handleFieldNameChange = event =>
    {
        this.setState({fieldName: event.target.value});
        var name = event.target.value;
        this.props.verifyFieldName({name});
    };

    handleEnterpriseNameChange = event =>
    {
        this.setState({enterpriseName: event.target.value});
        var name = event.target.value;
        this.props.verifyEnterpriseName({name});
    };

    handleField1Change = event =>
    {
        this.setState({field1: event.target.value});
    };

    handleFieldName1Change = event =>
    {
        this.setState({fieldName1: event.target.value});
        var name = event.target.value;
        this.props.verifyFieldName1({name});
    };

    componentDidMount()
    {
        this.props.readEnterprises();
        this.props.readFields();
        this.props.readPrograms();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.props.operation.success)
        {
            this.showMessages(this.props.operation.message, 'success');
            //this.props.readEnterprises();
            //this.props.readFields();
            //this.props.readPrograms();
            this.props.resetAddProject();
        }
    }

    render()
    {
        const { classes } = this.props;

        return (
                <Formsy
                    onValidSubmit={this.onSubmit}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-2/3"
                >
                    <SelectFormsy
                        className="my-4"
                        name="program"
                        label="Program"
                        value={this.state.program}
                        onChange={this.handleProgramChange}
                    >
                        <MenuItem value="">
                            <em>Choose The Program ...</em>
                        </MenuItem>
                        {this.props.programs.map((program) =>
                            (
                                <MenuItem value={program._id} key={program._id}>{program.name}</MenuItem>
                            ))}

                    </SelectFormsy>

                    <TextField
                        className="my-4"
                        margin="normal"
                        type="text"
                        name="title"
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        helperText={this.props.name.status ? '' : this.props.name.message}
                        error={!this.props.name.status}
                        required
                    />

                    <TextField
                        className="my-4"
                        margin="normal"
                        label="Description"
                        multiline
                        rows="4"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        required
                    />

                    <SelectFormsy
                        className="my-4"
                        name="field"
                        label="Field"
                        value={this.state.field}
                        onChange={this.handleFieldChange}
                    >
                        <MenuItem value="">
                            <em>Choose The Field (Required)</em>
                        </MenuItem>
                        {this.props.fields.map((field) =>
                            (
                                <MenuItem value={field._id} key={field._id}>{field.name}</MenuItem>
                            ))}

                    </SelectFormsy>

                    <SelectFormsy
                        className="my-4"
                        name="enterprise"
                        label="Enterprise"
                        value={this.state.enterprise}
                        onChange={this.handleEnterpriseChange}
                    >
                        <MenuItem value="">
                            <em>Choose The Enterprise (Required)</em>
                        </MenuItem>
                        {this.props.enterprises.map((enterprise) =>
                            (
                                <MenuItem value={enterprise._id} key={enterprise._id}>{enterprise.name}</MenuItem>
                            ))}

                    </SelectFormsy>

                    <Paper className={classes.root} elevation={1}>
                        <Typography component="p" className="mb-4">
                            <span className="font-bold">Note</span>: Filling at least two of these three fields below is enough to control the project's time
                            parameters.
                        </Typography>
                        <Typography component="p">
                            <span className="font-bold">Note</span>: These three fields below are not required, unless you have the exact information.
                        </Typography>
                    </Paper>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-between">
                            <div className="flex flex-col">
                                <Grid container justify="space-between" direction="row">
                                    <DatePicker
                                        className="m-4"
                                        label="Starting Date"
                                        value={this.state.startingDate}
                                        onChange={this.handleStartingDateChange}
                                        error={!this.state.validDates}
                                    />
                                    <DatePicker
                                        className="m-4"
                                        margin="normal"
                                        label="Ending Date"
                                        value={this.state.endingDate}
                                        onChange={this.handleEndingDateChange}
                                        error={!this.state.validDates}
                                    />
                                </Grid>
                                <div className="flex items-center justify-center">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="default"
                                        className="mt-8"
                                        onClick={this.resetDates}
                                    >
                                        RESET DATES
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <TextField
                                    className="m-4"
                                    label="Duration"
                                    value={this.state.duration}
                                    onChange={this.handleDurationChange}
                                    type="number"
                                />
                                <TextField
                                    select
                                    label=""
                                    className="m-4"
                                    value={this.state.unit}
                                    onChange={this.handleUnitChange}
                                >
                                    {units.map(unit => (
                                        <MenuItem key={unit.value} value={unit.value}>{unit.label}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <ExpansionPanel className="my-16" expanded={this.state.expandedEnterprise}
                                    onChange={this.handleEnterprisePanel(true)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Quick Settings</Typography>
                            <Typography className={classes.secondaryHeading}>If you can't find the program, field
                                or the enterprise you're looking for, you can add them quickly here.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="flex flex-col">

                            <TextField
                                className="my-4"
                                margin="normal"
                                type="text"
                                name="programName"
                                label="Program Name"
                                value={this.state.programName}
                                onChange={this.handleProgramNameChange}
                                helperText={this.props.programname.status ? '' : this.props.programname.message}
                                error={!this.props.programname.status}
                            />

                            <TextField
                                className="my-4"
                                margin="normal"
                                type="text"
                                name="fieldname"
                                label="Field Name"
                                value={this.state.fieldName}
                                onChange={this.handleFieldNameChange}
                                helperText={this.props.fieldname.status ? '' : this.props.fieldname.message}
                                error={!this.props.fieldname.status}
                            />

                            <TextField
                                className="my-4"
                                margin="normal"
                                type="text"
                                name="enterprisename"
                                label="Enterprise Name"
                                value={this.state.enterpriseName}
                                onChange={this.handleEnterpriseNameChange}
                                helperText={this.props.enterprisename.status ? '' : this.props.enterprisename.message}
                                error={!this.props.enterprisename.status}
                            />

                            <SelectFormsy
                                className="my-4"
                                name="field1"
                                label="Field"
                                value={this.state.field1}
                                onChange={this.handleField1Change}
                            >
                                {this.props.fields.map((field) =>
                                    (
                                        <MenuItem value={field._id} key={field._id}>{field.name}</MenuItem>
                                    ))}

                            </SelectFormsy>

                            <TextField
                                className="my-4"
                                margin="normal"
                                type="text"
                                name="fieldname1"
                                label="Field Name"
                                value={this.state.fieldName1}
                                onChange={this.handleFieldName1Change}
                                helperText={this.props.fieldname1.status ? '' : this.props.fieldname1.message}
                                error={!this.props.fieldname1.status}
                            />

                            <Button
                                type="button"
                                variant="contained"
                                color="default"
                                className="my-16 mx-16"
                                aria-label="LOG IN"
                                onClick={this.resetSettings}
                            >
                                RESET SETTINGS
                            </Button>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <div className="flex flex-row justify-end">
                        <Button
                            type="button"
                            variant="contained"
                            color="default"
                            className="my-16 mx-16"
                            aria-label="LOG IN"
                            onClick={this.reset}
                        >
                            RESET
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="my-16"
                            aria-label="LOG IN"
                        >
                            ADD PROJECT
                        </Button>
                    </div>

                </Formsy>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readEnterprises: Actions.readEnterprises,
        readFields: Actions.readFields,
        readPrograms: Actions.readPrograms,
        verifyProgramName: Actions.checkProgramName,
        verifyTitle: Actions.checkProjectTitle,
        verifyFieldName: Actions.checkFieldName,
        verifyEnterpriseName: Actions.checkEnterpriseName,
        verifyFieldName1: Actions.checkFieldName1,
        submitAddProject: Actions.submitAddProject,
        resetAddProject: Actions.resetAddProject,
        showMessage: showMessage
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        enterprises: scrum.enterprises,
        fields: scrum.fields,
        programs: scrum.programs,
        name: scrum.name,
        programname: scrum.programname,
        fieldname: scrum.fieldname,
        enterprisename: scrum.enterprisename,
        fieldname1: scrum.fieldname1,
        operation: scrum.operation
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (AddProjectsForm)));