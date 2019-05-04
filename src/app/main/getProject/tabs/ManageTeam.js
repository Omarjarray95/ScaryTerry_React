import React, {Component} from 'react';
import {Avatar, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import withStyles from "@material-ui/core/es/styles/withStyles";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Grid from "@material-ui/core/Grid/Grid";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import * as authActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions/scrum';
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwapIcon from '@material-ui/icons/SwapHorizontalCircle';
import classNames from 'classnames';

const styles = theme => ({
    card: {
        minWidth: 250,
        margin: 20
    },
    addCard: {
        maxWidth: 260,
        maxHeight: 150,
        margin: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
    bigAvatar: {
        width: 150,
        height: 150,
        marginBottom: 12
    },
    formControl: {
        minWidth: 250
    },
    success: {
        backgroundColor: green[600],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
});

class ManageTeam extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            openSnackbar: false,
            scrumMaster: "",
            productOwner: "",
            member: "",
            addedMember: ""
        };

        this.handleScrumMasterChange = this.handleScrumMasterChange.bind(this);
        this.handleProductOwnerChange = this.handleProductOwnerChange.bind(this);
        this.handleAddedMemberChange = this.handleAddedMemberChange.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
    }


    handleScrumMasterChange = event =>
    {
        var devmembers = [];
        this.props.project.developmentTeam.map((member) =>
            (
                devmembers.push(member._id)
            ));
        var data = {
            scrumMaster: event.target.value,
            productOwner: this.props.project.productOwner ? this.props.project.productOwner._id : null,
            developmentTeam: devmembers
        };
        this.props.submitAffect(data, this.props.match.params.id);
        this.setState({scrumMaster: ""});
    };

    handleProductOwnerChange = event =>
    {
        var devmembers = [];
        this.props.project.developmentTeam.map((member) =>
            (
                devmembers.push(member._id)
            ));
        var data = {
            scrumMaster: this.props.project.scrumMaster ? this.props.project.scrumMaster._id : null,
            productOwner: event.target.value,
            developmentTeam: devmembers
        };
        this.props.submitAffect(data, this.props.match.params.id);
        this.setState({productOwner: ""});
    };

    handleAddedMemberChange = event =>
    {
        var devmembers = [];
        this.props.project.developmentTeam.map((member) =>
            (
                devmembers.push(member._id)
            ));
        devmembers.push(event.target.value);
        var data = {
            scrumMaster: this.props.project.scrumMaster ? this.props.project.scrumMaster._id : null,
            productOwner: this.props.project.productOwner ? this.props.project.productOwner._id : null,
            developmentTeam: devmembers
        };
        this.props.submitAffect(data, this.props.match.params.id);
        this.setState({addedMember: ""});
    };

    handleDeleteMember = (id) =>
    {
        var devmembers = [];
        this.props.project.developmentTeam.map((member) =>
        {
            if (member._id !== id)
            {
                devmembers.push(member._id);
            }
        });
        var data = {
            scrumMaster: this.props.project.scrumMaster ? this.props.project.scrumMaster._id : null,
            productOwner: this.props.project.productOwner ? this.props.project.productOwner._id : null,
            developmentTeam: devmembers
        };
        this.props.submitAffect(data, this.props.match.params.id);
    };

    handleCloseSnackbar = () =>
    {
        this.setState({ openSnackbar: false });
    };

    componentDidMount()
    {
        this.props.readEmployees();
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.project !== this.props.project)
        {
            this.setState({openSnackbar: true});
        }
    }

    render()
    {
        const { classes, project, employees } = this.props;

        return (
            <div className="md:flex max-w-2xl">
                <Grid container direction="column" alignItems="center">
                    <Grid container direction="row" justify="center">
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container alignItems="center" direction="column">
                                    <Typography className={classes.title} color="textPrimary">
                                        Scrum Master
                                    </Typography>
                                    <Avatar alt="Remy Sharp" src={project.scrumMaster ? "assets/images/avatars/Velazquez.jpg" :
                                        "assets/images/avatars/profile.jpg"} className={classes.bigAvatar}/>
                                    {project.scrumMaster && (<Typography className={classes.fullName} color="textSecondary">
                                        {project.scrumMaster.firstName + " " + project.scrumMaster.lastName}
                                    </Typography>)}
                                </Grid>
                            </CardContent>
                            <CardActions className="flex justify-center" disableActionSpacing>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="scrumMaster">Choose The Scrum Master</InputLabel>
                                    <Select
                                        value={this.state.scrumMaster}
                                        onChange={this.handleScrumMasterChange}
                                        inputProps={{
                                            name: 'scrumMaster',
                                            id: 'scrumMaster',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Choose The Scrum Master</em>
                                        </MenuItem>
                                        {employees.length > 0 && (employees.map((employee) =>
                                        {
                                            var b = true;
                                            if (project.scrumMaster && (employee._id === project.scrumMaster._id))
                                            {
                                                b = false;
                                            }
                                            if (project.productOwner && (employee._id === project.productOwner._id))
                                            {
                                                b = false;
                                            }
                                            if (project.developmentTeam.length > 0)
                                            {
                                                project.developmentTeam.map((member) =>
                                                {
                                                    if (employee._id === member._id)
                                                    {
                                                        b = false;
                                                    }
                                                });
                                            }
                                            if (b === true)
                                            {
                                                return <MenuItem value={employee._id} key={employee._id}>
                                                    {employee.firstName + " " + employee.lastName}
                                                </MenuItem>
                                            }
                                        }
                                        ))}
                                    </Select>
                                </FormControl>
                            </CardActions>
                        </Card>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container alignItems="center" direction="column">
                                    <Typography className={classes.title} color="textPrimary">
                                        Product Owner
                                    </Typography>
                                    <Avatar alt="Remy Sharp" src={project.productOwner ? "assets/images/avatars/Velazquez.jpg" :
                                        "assets/images/avatars/profile.jpg"} className={classes.bigAvatar}/>
                                    {project.productOwner && (<Typography className={classes.fullName} color="textSecondary">
                                        {project.productOwner.firstName + " " + project.productOwner.lastName}
                                    </Typography>)}
                                </Grid>
                            </CardContent>
                            <CardActions className="flex justify-center" disableActionSpacing>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="productOwner">Choose The Product Owner</InputLabel>
                                    <Select
                                        value={this.state.productOwner}
                                        onChange={this.handleProductOwnerChange}
                                        inputProps={{
                                            name: 'productOwner',
                                            id: 'productOwner',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Choose The Product Owner</em>
                                        </MenuItem>
                                        {employees.length > 0 && (employees.map((employee) =>
                                            {
                                                var b = true;
                                                if (project.scrumMaster && (employee._id === project.scrumMaster._id))
                                                {
                                                    b = false;
                                                }
                                                if (project.productOwner && (employee._id === project.productOwner._id))
                                                {
                                                    b = false;
                                                }
                                                if (project.developmentTeam.length > 0)
                                                {
                                                    project.developmentTeam.map((member) =>
                                                    {
                                                        if (employee._id === member._id)
                                                        {
                                                            b = false;
                                                        }
                                                    });
                                                }
                                                if (b === true)
                                                {
                                                    return <MenuItem value={employee._id} key={employee._id}>
                                                        {employee.firstName + " " + employee.lastName}
                                                    </MenuItem>
                                                }
                                            }
                                        ))}
                                    </Select>
                                </FormControl>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid container direction="row" wrap="wrap" justify="center">
                        {project.developmentTeam.length > 0 && (project.developmentTeam.map((member) =>
                            (<Card key={member._id} className={classes.card}>
                                <CardContent>
                                    <Grid container alignItems="center" direction="column">
                                        <Typography className={classes.title} color="textPrimary">
                                            Member {(project.developmentTeam.indexOf(member)+1)}
                                        </Typography>
                                        <Avatar alt="Remy Sharp" src="assets/images/avatars/Velazquez.jpg"
                                                className={classes.bigAvatar}/>
                                        <Typography className={classes.fullName} color="textSecondary">
                                            {member.firstName + " " + member.lastName}
                                        </Typography>
                                    </Grid>
                                </CardContent>
                                <CardActions className="flex justify-center" disableActionSpacing>
                                    <Button
                                        type="button"
                                        onClick={() => this.handleDeleteMember(member._id)}
                                        variant="contained"
                                        color="default">
                                        Delete
                                        <DeleteIcon />
                                    </Button>
                                </CardActions>
                            </Card>)))
                        }

                        <Card className={classes.addCard}>
                            <CardContent>
                                <Grid container alignItems="center" direction="column">
                                    <Typography
                                        className={classes.title}
                                        color="textPrimary"
                                        onMouseDown={console.log("Add Member")}>
                                        Add Member
                                    </Typography>
                                </Grid>
                            </CardContent>
                            <CardActions className="flex justify-center">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="addMember">Add Member</InputLabel>
                                    <Select
                                        value={this.state.addedMember}
                                        onChange={this.handleAddedMemberChange}
                                        inputProps={{
                                            name: 'addMember',
                                            id: 'addMember',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Add Member</em>
                                        </MenuItem>
                                        {employees.length > 0 && (employees.map((employee) =>
                                            {
                                                var b = true;
                                                if (project.scrumMaster && (employee._id === project.scrumMaster._id))
                                                {
                                                    b = false;
                                                }
                                                if (project.productOwner && (employee._id === project.productOwner._id))
                                                {
                                                    b = false;
                                                }
                                                if (project.developmentTeam.length > 0)
                                                {
                                                    project.developmentTeam.map((member) =>
                                                    {
                                                        if (employee._id === member._id)
                                                        {
                                                            b = false;
                                                        }
                                                    });
                                                }
                                                if (b === true)
                                                {
                                                    return <MenuItem value={employee._id} key={employee._id}>
                                                        {employee.firstName + " " + employee.lastName}
                                                    </MenuItem>
                                                }
                                            }
                                        ))}
                                    </Select>
                                </FormControl>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={1000}
                    onClose={this.handleCloseSnackbar}
                >
                    <SnackbarContent
                        className={classes.success}
                        message={
                            <span className="flex items-center">
                                <CheckCircleIcon className={classNames(classes.icon, classes.iconVariant)} />
                                Changes Saved !
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleCloseSnackbar}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readEmployees: authActions.readEmployees,
        submitAffect: Actions.affectTeam,
        readProject: Actions.readProject
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        project: scrum.project,
        employees: scrum.employees
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (ManageTeam)));
