import React, {Component} from 'react';
import {Button, MenuItem, withStyles} from '@material-ui/core';
import {TextFieldFormsy, SelectFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from "redux";
import * as authActions from 'app/auth/store/actions';
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
});

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
            canSubmit: true,
            expandedEnterprise: false,
            openPopOver: false,
            program: "",
            title: "",
            description: "",
            role: "",
            firstName: "",
            lastName: "",
            enterprise: "",
            field: "",
            enterpriseName: "",
            fieldName: ""
        };

        this.handleShowPasswordChange = this.handleShowPasswordChange.bind(this);
        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEnterpriseChange = this.handleEnterpriseChange.bind(this);
    }

    form = React.createRef();

    validate = () =>
    {
        var b = null;

        if (this.state.username !== "" && this.state.password !== "" && this.state.role !== "" &&
            this.state.firstName !== "" && this.state.lastName !== "" && this.props.name.status && this.state.enterprise !== "")
        {
            b = true;
        }
        else if (this.state.username !== "" && this.state.password !== "" && this.state.role !== "" && this.state.firstName !== ""
            && this.state.lastName !== "" && this.props.name.status && this.state.enterpriseName !== "" && this.state.field !== "")
        {
            b = true;
        }
        else if (this.state.username !== "" && this.state.password !== "" && this.state.role !== "" && this.state.firstName !== ""
            && this.state.lastName !== "" && this.props.name.status && this.state.enterpriseName !== "" && this.state.fieldName !== "")
        {
            b = true;
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
            var user = {
                username: this.state.username,
                password: this.state.password,
                role: this.state.role,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                entreprise: this.state.enterprise,
                name: this.state.enterpriseName,
                field: this.state.field,
                fieldName: this.state.fieldName
            };
            this.props.submitRegister({user});
            this.reset();
            this.resetSettings();
            this.setState({openPopOver: true});
        }
    };

    handleEnterprisePanel = panel => (event, expanded) =>
    {
        this.setState({
            expandedEnterprise: expanded ? panel : false,
        });
    };

    handleShowPasswordChange = event =>
    {
        this.setState({showPassword: event.target.checked});
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

    handleFirstNameChange = event =>
    {
        this.setState({firstName: event.target.value});
    };

    handleLastNameChange = event =>
    {
        this.setState({lastName: event.target.value});
    };

    handleEnterpriseChange = event =>
    {
        this.setState({enterprise: event.target.value});
    };

    handleFieldChange = event =>
    {
        this.setState({field: event.target.value});
    };

    reset = () =>
    {
        this.setState({username: "", password: "", role: "", firstName: "", lastName: "", enterprise: ""})
        this.props.name.status = true;
    };

    resetSettings = () =>
    {
        this.setState({enterpriseName: "", field: "", fieldName: ""})
    };

    handleEnterpriseNameChange = event =>
    {
        this.setState({enterpriseName: event.target.value});
        //var name = event.target.value;
        //this.props.verifyEnterpriseName({name});
    };

    handleFieldNameChange = event =>
    {
        this.setState({fieldName: event.target.value});
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
                        rowsMax="4"
                        value={this.state.description}
                        onChange={this.handlePasswordChange}
                        required
                    />

                    <TextFieldFormsy
                        className="mb-0"
                        type={this.state.showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                    />

                    <TextFieldFormsy
                        className="mb-4"
                        type="text"
                        name="firstname"
                        label="First Name"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                        required
                    />

                    <TextFieldFormsy
                        className="mb-4"
                        type="text"
                        name="lastname"
                        label="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                        required
                    />

                    <ExpansionPanel className="my-16" expanded={this.state.expandedEnterprise} onChange={this.handleEnterprisePanel(true)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Quick Settings</Typography>
                            <Typography className={classes.secondaryHeading}>If you can't find the enterprise you're looking for,
                            you can add it quickly here.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="flex flex-col">

                            <TextField
                                className="mb-4 mt-4"
                                margin="normal"
                                type="text"
                                name="enterprisename"
                                label="Name"
                                value={this.state.enterpriseName}
                                onChange={this.handleEnterpriseNameChange}
                                helperText={this.props.enterprisename.status ? '' : this.props.enterprisename.message}
                                error={!this.props.enterprisename.status}
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

                            <TextField
                                className="mb-4 mt-4"
                                margin="normal"
                                type="text"
                                name="fieldname"
                                label="Field Name"
                                value={this.state.fieldName}
                                onChange={this.handleFieldNameChange}
                                helperText={this.props.fieldname.status ? '' : this.props.fieldname.message}
                                error={!this.props.fieldname.status}
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
                            disabled={!this.state.canSubmit}
                        >
                            Add User
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
                        <DialogTitle id="alert-dialog-slide-title">
                            {this.props.register.message}
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
        submitRegister: authActions.submitRegister
    }, dispatch);
}

function mapStateToProps({auth, scrum})
{
    return {
        enterprises: scrum.enterprises,
        fields: scrum.fields,
        programs: scrum.programs,
        name: scrum.name,
        enterprisename: scrum.enterprisename,
        fieldname: scrum.fieldname,
        register: auth.register
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (AddProjectsForm)));