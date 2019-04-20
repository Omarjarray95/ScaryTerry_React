import React, {Component} from 'react';
import {Button, MenuItem} from '@material-ui/core';
import {TextFieldFormsy, CheckboxFormsy, SelectFormsy} from '@fuse';
import Formsy from 'formsy-react';

class AddUsersForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            canSubmit: false,
            showPassword: false,
            role: ""
        };

        this.handleShowPasswordChange = this.handleShowPasswordChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        console.info('submit', model);
    };

    handleShowPasswordChange = event =>
    {
        this.setState({showPassword: event.target.checked});
    };

    handleRoleChange = event =>
    {
        this.setState({role: event.target.value});
    };

    render()
    {

        return (
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-2/3"
                >

                    <TextFieldFormsy
                        className="mb-0"
                        type="text"
                        name="username"
                        label="Username"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-0"
                        type={this.state.showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        required
                    />
                    <CheckboxFormsy
                        className="my-0"
                        name="show"
                        label="Show Password"
                        value={this.state.showPassword}
                        onChange={this.handleShowPasswordChange}
                    />

                    <SelectFormsy
                        className="my-0"
                        name="role"
                        label="Role"
                        value={this.state.role}
                        onChange={this.handleRoleChange}
                    >
                        <MenuItem value="Administrator">
                            <em>Administrator</em>
                        </MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                        <MenuItem value="Client">Client</MenuItem>
                        <MenuItem value="HR Manager">HR Manager</MenuItem>
                    </SelectFormsy>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mx-auto my-16"
                        aria-label="LOG IN"
                        disabled={!this.state.canSubmit}
                    >
                        Add User
                    </Button>
                </Formsy>
        );
    }
}

export default AddUsersForm;