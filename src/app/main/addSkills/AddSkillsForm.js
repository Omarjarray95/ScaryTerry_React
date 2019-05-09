import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import {TextFieldFormsy, CheckboxFormsy, SelectFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from "redux";
import * as Actions from 'app/store/actions/scrum';
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {showMessage} from "../../store/actions/fuse";

const styles = theme => ({
});

class AddSkillsForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            disabled: true,
            name: "",
            description: ""
        };
    }


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
        if (!this.props.skillname.status)
        {
            this.showMessages(this.props.skillname.message, 'error');
            return false;
        }

        return true;
    };

    onSubmit = () =>
    {
        if (this.validate())
        {
            var skill = {
                name: this.state.name,
                description: this.state.description
            };
            this.props.submitAddSkill(skill);
            this.reset();
        }
    };

    handleNameChange = event =>
    {
        this.setState({name: event.target.value});
        var name = event.target.value;
        this.props.verifySkillName(name);
    };

    handleDescriptionChange = event =>
    {
        this.setState({description: event.target.value});
    };

    reset = () =>
    {
        this.setState({name: "", description: ""});
        this.props.skillname.status = true;
    };

    enableSubmitSkill = () =>
    {
        this.setState({disabled: false});
    };

    disableSubmitSkill = () =>
    {
        this.setState({disabled: true});
    };

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.operation !== this.props.operation && (nextProps.operation.success))
        {
            this.showMessages(nextProps.operation.message, 'success');
        }
    }

    render()
    {
        const { disabled } = this.state;

        return (
            <Formsy
                onValidSubmit={this.onSubmit}
                onValid={this.enableSubmitSkill}
                onInvalid={this.disableSubmitSkill}
                className="flex flex-col justify-center p-24 w-640"
            >

                <TextField
                    className="mb-4 mt-4"
                    type="text"
                    name="name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    helperText={this.props.skillname.status ? '' : this.props.skillname.message}
                    error={!this.props.skillname.status}
                    required
                />

                <TextFieldFormsy
                    className="mb-4 mt-4"
                    type="text"
                    name="description"
                    label="Description"
                    multiline
                    rows="4"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                />

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
                        disabled={disabled}
                    >
                        ADD SKILL
                    </Button>
                </div>
            </Formsy>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitAddSkill: Actions.submitAddSkill,
        verifySkillName: Actions.checkSkillName,
        showMessage: showMessage
    }, dispatch);
}

function mapStateToProps({auth, scrum})
{
    return {
        skillname: scrum.skillname,
        operation: scrum.operation
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (AddSkillsForm)));