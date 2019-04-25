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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import moment from 'moment';

const styles = theme => ({
    root: {
        width: '100%',
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
    },
    sendButtonError: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
        margin: theme.spacing.unit
    },
    sendButtonValid: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
        margin: theme.spacing.unit
    },
});

const units = [
    {
        value: 'days',
        label: 'Days',
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

function Transition(props)
{
    return <Slide direction="up" {...props} />;
}

class AddProjectsForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            canSubmit: false,
            expandedEnterprise: false,
            openPopOver: false,
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

    validate = () =>
    {
        var b = null;

        if (this.state.validDates === true)
        {
            if (this.state.field !== "" || this.state.fieldname !== "")
            {
                if (this.state.enterprise !== "")
                {
                    b = true;
                }
                else
                {
                    if (this.state.enterpriseName !== "")
                    {
                        if (this.state.field1 !== "")
                        {
                            b = true;
                        }
                        else b = this.state.fieldName1 !== "";
                    }
                    else
                    {
                        b = false;
                    }
                }
            }
            else
            {
                b = false;
            }
        }
        else
        {
            b = false;
        }

        return b;
    };

    onSubmit = () =>
    {
        if (this.validate())
        {
            this.setState({canSubmit: true});
            //if (this.state.program)

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
            this.setState({openPopOver: true});
        }
        else
        {
            this.setState({canSubmit: false});
        }
    };

    handleEnterprisePanel = panel => (event, expanded) =>
    {
        this.setState({
            expandedEnterprise: expanded ? panel : false,
        });
    };

    handleCloseDialog = event =>
    {
        this.setState({ openPopOver: false });
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
        this.setState({duration: event.target.value.trim()});
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
    };

    handleProgramNameChange = event =>
    {
        this.setState({programName: event.target.value.trim()});
        //var name = event.target.value;
        //this.props.verifyEnterpriseName({name});
    };

    handleFieldNameChange = event =>
    {
        this.setState({fieldName: event.target.value.trim()});
        //var name = event.target.value;
        //this.props.verifyFieldName({name});
    };

    handleEnterpriseNameChange = event =>
    {
        this.setState({enterpriseName: event.target.value.trim()});
        //var name = event.target.value;
        //this.props.verifyEnterpriseName({name});
    };

    handleField1Change = event =>
    {
        this.setState({field1: event.target.value});
    };

    handleFieldName1Change = event =>
    {
        this.setState({fieldName1: event.target.value.trim()});
        //var name = event.target.value;
        //this.props.verifyFieldName({name});
    };

    componentDidMount()
    {
        this.props.readEnterprises();
        this.props.readFields();
        this.props.readPrograms();
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
                        {this.props.enterprises.map((enterprise) =>
                            (
                                <MenuItem value={enterprise._id} key={enterprise._id}>{enterprise.name}</MenuItem>
                            ))}

                    </SelectFormsy>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <DatePicker
                                margin="normal"
                                label="Starting Date"
                                value={this.state.startingDate}
                                onChange={this.handleStartingDateChange}
                                error={!this.state.validDates}
                            />
                            <DatePicker
                                margin="normal"
                                label="Ending Date"
                                value={this.state.endingDate}
                                onChange={this.handleEndingDateChange}
                                error={!this.state.validDates}
                            />
                            <div className="flex flex-col">
                                <TextField
                                    label="Duration"
                                    value={this.state.duration}
                                    onChange={this.handleDurationChange}
                                    type="number"
                                    margin="normal"
                                />
                                <TextField
                                    select
                                    label=""
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

                    <ExpansionPanel className="my-16" expanded={this.state.expandedEnterprise} onChange={this.handleEnterprisePanel(true)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Quick Settings</Typography>
                            <Typography className={classes.secondaryHeading}>If you can't find the enterprise you're looking for,
                            you can add it quickly here.</Typography>
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
                            />

                            <TextField
                                className="my-4"
                                margin="normal"
                                type="text"
                                name="fieldname"
                                label="Field Name"
                                value={this.state.fieldName}
                                onChange={this.handleFieldNameChange}
                            />

                            <TextField
                                className="my-4"
                                margin="normal"
                                type="text"
                                name="enterprisename"
                                label="Enterprise Name"
                                value={this.state.enterpriseName}
                                onChange={this.handleEnterpriseNameChange}
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
                            className={this.state.canSubmit === true ? classes.sendButtonValid : classes.sendButtonError}
                            aria-label="LOG IN"
                        >
                            ADD PROJECT
                        </Button>
                    </div>

                    <Dialog
                        open={this.state.openPopOver}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleCloseDialog}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>
                            {this.props.operation.message}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

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
        verifyTitle: Actions.checkProjectTitle,
        verifyEnterpriseName: Actions.checkEnterpriseName,
        verifyFieldName: Actions.checkFieldName,
        submitAddProject: Actions.submitAddProject
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        enterprises: scrum.enterprises,
        fields: scrum.fields,
        programs: scrum.programs,
        name: scrum.name,
        enterprisename: scrum.enterprisename,
        fieldname: scrum.fieldname,
        operation: scrum.operation
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (AddProjectsForm)));