import React, {Component} from 'react';
import {Button, MenuItem, withStyles} from '@material-ui/core';
import {TextFieldFormsy, CheckboxFormsy, SelectFormsy} from '@fuse';
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
import {showMessage} from "../../store/actions/fuse";

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

class AddUsersForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showPassword: false,
            expandedEnterprise: false,
            message: "",
            username: "",
            password: "",
            role: "",
            firstName: "",
            lastName: "",
            enterprise: "",
            field: "",
            enterpriseName: "",
            fieldName: ""
        };

        this.handleShowPasswordChange = this.handleShowPasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEnterpriseChange = this.handleEnterpriseChange.bind(this);
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
        if (!this.props.name.status)
        {
            this.showMessages(this.props.name.message, 'error');
            return false;
        }
        else if (!this.props.enterprisename.status)
        {
            this.showMessages(this.props.enterprisename.message, 'error');
            return false;
        }
        else if (!this.props.fieldname.status)
        {
            this.showMessages(this.props.fieldname.message, 'error');
            return false;
        }
        else
        {
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
                    if (this.state.field === "")
                    {
                        if (this.state.fieldName === "")
                        {
                            this.showMessages("You haven't choose a field for your new enterprise. Please pick a field " +
                                "or add it quickly in the settings panel.", 'error');
                            return false;
                        }
                    }
                }
            }
        }

        return true;
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
                entreprise: this.state.enterprise !== "" ? this.state.enterprise : null,
                name: this.state.enterpriseName,
                field: this.state.field !== "" ? this.state.field : null,
                fieldName: this.state.fieldName
            };
            this.props.submitRegister({user});
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

    handleShowPasswordChange = event =>
    {
        this.setState({showPassword: event.target.checked});
    };

    handleUsernameChange = event =>
    {
        this.setState({username: event.target.value});
        var username = event.target.value;
        this.props.verifyUsername({username});
    };

    handlePasswordChange = event =>
    {
        this.setState({password: event.target.value});
    };

    handleRoleChange = event =>
    {
        this.setState({role: event.target.value});
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
        this.setState({username: "", password: "", role: "", firstName: "", lastName: "", enterprise: ""});
        this.props.name.status = true;
    };

    resetSettings = () =>
    {
        this.setState({enterpriseName: "", field: "", fieldName: ""});
        this.props.enterprisename.status = true;
        this.props.fieldname.status = true;
    };

    handleEnterpriseNameChange = event =>
    {
        this.setState({enterpriseName: event.target.value});
        var name = event.target.value;
        this.props.verifyEnterpriseName({name});
    };

    handleFieldNameChange = event =>
    {
        this.setState({fieldName: event.target.value});
        var name = event.target.value;
        this.props.verifyFieldName({name});
    };

    componentDidMount()
    {
        this.props.readEnterprises();
        this.props.readFields();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.props.register.success)
        {
            this.showMessages(this.props.register.message, 'success');
            this.props.readEnterprises();
            this.props.readFields();
            this.props.resetRegister();
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

                    <TextField
                        className="mb-4 mt-4"
                        margin="normal"
                        type="text"
                        name="username"
                        label="Username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        helperText={this.props.name.status ? '' : this.props.name.message}
                        error={!this.props.name.status}
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
                    <CheckboxFormsy
                        className="my-4"
                        name="show"
                        label="Show Password"
                        value={this.state.showPassword}
                        onChange={this.handleShowPasswordChange}
                    />

                    <SelectFormsy
                        className="my-4"
                        name="role"
                        label="Role"
                        value={this.state.role}
                        onChange={this.handleRoleChange}
                        required
                    >
                        <MenuItem value="">
                            <em>Choose The Role ...</em>
                        </MenuItem>
                        <MenuItem value="Administrator" key="Administrator">Administrator</MenuItem>
                        <MenuItem value="Employee" key="Employee">Employee</MenuItem>
                        <MenuItem value="Client" key="Client">Client</MenuItem>
                        <MenuItem value="HR Manager" key="HR Manager">HR Manager</MenuItem>
                    </SelectFormsy>

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

                    <SelectFormsy
                        className="my-4"
                        name="enterprise"
                        label="Enterprise"
                        value={this.state.enterprise}
                        onChange={this.handleEnterpriseChange}
                    >
                        <MenuItem value="">
                            <em>Choose The Enterprise ...</em>
                        </MenuItem>
                        {this.props.enterprises.map((enterprise) =>
                            (
                                <MenuItem value={enterprise._id} key={enterprise._id}>{enterprise.name}</MenuItem>
                            ))}

                    </SelectFormsy>

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
                                <MenuItem value="">
                                    <em>Choose The Field ...</em>
                                </MenuItem>
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
                        >
                            Add User
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
        verifyUsername: authActions.checkUsername,
        verifyEnterpriseName: Actions.checkEnterpriseName,
        verifyFieldName: Actions.checkFieldName,
        showMessage: showMessage,
        submitRegister: authActions.submitRegister,
        resetRegister: authActions.resetRegister
    }, dispatch);
}

function mapStateToProps({auth, scrum})
{
    return {
        enterprises: scrum.enterprises,
        fields: scrum.fields,
        name: scrum.name,
        enterprisename: scrum.enterprisename,
        fieldname: scrum.fieldname,
        register: auth.register
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (AddUsersForm)));