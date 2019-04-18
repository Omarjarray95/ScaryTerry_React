import React, {Component} from 'react';
import {Button, Typography, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';

class JWTLoginTab extends Component {

    state = {
        canSubmit: false,
        username: '',
        password: '',
        message: ''
    };

    form = React.createRef();

    disableButton = () =>
    {
        this.setState({canSubmit: false});
    };

    enableButton = () =>
    {
        this.setState({canSubmit: true});
    };

    onSubmit = event =>
    {
        const username = this.state.username;
        const password = this.state.password;

        this.props.submitLogin({username, password});
    };

    handleUsernameChange = event =>
    {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = event =>
    {
        this.setState({password: event.target.value});
    };

    /*componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        return null;
    }*/

    render()
    {
        const {canSubmit} = this.state;

        return (
            <div className="w-full">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="username"
                        label="Username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">account_circle</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        LOGIN
                    </Button>

                </Formsy>

                <div className="flex flex-col items-center pt-24">
                    <Typography className="text-14 font-600 py-8" align={"center"}>
                        {this.props.message}
                    </Typography>

                    <table className="text-left w-256">
                        <thead>
                            <tr>
                                <th><Typography className="font-600" color="textSecondary"></Typography></th>
                                <th><Typography className="font-600" color="textSecondary"></Typography></th>
                                <th><Typography className="font-600" color="textSecondary"></Typography></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Typography></Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography></Typography></td>
                            </tr>
                            <tr>
                                <td><Typography></Typography></td>
                                <td><Typography></Typography></td>
                                <td><Typography></Typography></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        message: auth.login.error
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTLoginTab));
