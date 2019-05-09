import React, {Component} from 'react';
import {Avatar, AppBar, Button, Card, CardContent, List, ListItem, ListItemText, Toolbar, Typography} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import * as Actions from 'app/store/actions/scrum';
import * as fuseActions from 'app/store/actions/fuse';
import Divider from '@material-ui/core/Divider';
import moment from "moment";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import withStyles from "@material-ui/core/es/styles/withStyles";
import _ from '@lodash';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});

class ProjectInformation extends Component {

    state = {
        openSkillsDialog: false,
        skills: []
    };

    getSprints = () =>
    {
        var arr = [];
        if (this.props.project.sprints.length > 0)
        {
            this.props.project.sprints.map((sprint) =>
            {
                arr.push(sprint.goal);
            });
        }
        return arr;
    };

    handleCloseSkillsDialog = () =>
    {
        this.setState({openSkillsDialog: false});
    };

    handleOpenSkillsDialog = () =>
    {
        this.setState({openSkillsDialog: true});
    };

    handleSkillsChange = skill => () =>
    {
        const { skills } = this.state;
        const currentIndex = _.find(skills, {_id: skill._id});
        const newChecked = [...skills];

        if (currentIndex === undefined)
        {
            newChecked.push(skill);
        }
        else
        {
            newChecked.splice(_.findIndex(newChecked, function(o) { return o._id === skill._id; }), 1);
        }

        this.setState({
            skills: newChecked,
        });
    };

    handleResetSkillsDialog = () =>
    {
        this.setState({ skills: [] });
    };

    handleSubmitSkills = () =>
    {
        var skills = [];
        this.state.skills.map((skill) =>
        {
            skills.push(skill._id);
        });
        this.props.submitSkills(skills, this.props.match.params.id);
    };

    componentDidMount()
    {
        this.props.readProject(this.props.match.params.id);
        this.props.readSkills();
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.project && (nextProps.project !== this.props.project))
        {
            this.setState({skills: nextProps.project.skills});
        }
    }

    render()
    {
        const { classes, project, skills } = this.props;
        const sprints = this.getSprints();

        return (
            <div className="md:flex max-w-2xl">

                <div className="flex flex-col flex-1 md:pr-32">
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    General Information
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Created At</Typography>
                                <Typography>{moment(project.creationDate).format("DD MMMM YYYY").toString()}</Typography>
                            </div>

                            {project.program && (<div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Working Under The Program</Typography>
                                <Typography>{project.program.name}</Typography>
                            </div>)}

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Field Of Activity</Typography>
                                <Typography>{project.field.name}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Client</Typography>
                                <Typography>{project.entreprise.name}</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">About The Project</Typography>
                                <Typography align="justify">{project.description}</Typography>
                            </div>

                            {project.startDate && (<div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Starts At</Typography>
                                <Typography>{moment(project.startDate).format("DD MMMM YYYY").toString()}</Typography>
                            </div>)}

                            {project.endDate && (<div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Ends At</Typography>
                                <Typography>{moment(project.endDate).format("DD MMMM YYYY").toString()}</Typography>
                            </div>)}

                            {project.duration && (<div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Lasts For</Typography>
                                <Typography>{project.duration + " Days"}</Typography>
                            </div>)}

                        </CardContent>
                    </Card>
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Sprints
                                </Typography>
                                <Button
                                    className="normal-case"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {this.props.changeTab(2)}}>
                                    Manage
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <Stepper activeStep={0} alternativeLabel>
                                {sprints.length > 0 && (sprints.map((label, index) => {
                                    const props = {};
                                    const labelProps = {};
                                    return (
                                        <Step key={label} {...props}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                }))}
                            </Stepper>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col md:w-320">
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Scrum Team Members
                                </Typography>
                                <Button
                                    className="normal-case"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {this.props.changeTab(1)}}>
                                    Manage
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            <List>
                                <Typography variant="caption" className="flex-1 ml-4 font-bold">
                                    Scrum Master
                                </Typography>
                                {project.scrumMaster ?
                                    (<ListItem key={project.scrumMaster._id} className="">
                                        <Avatar alt={project.scrumMaster.username} src="assets/images/avatars/Velazquez.jpg"/>
                                        <ListItemText
                                            className="flex-1"
                                            primary={(
                                                <div className="truncate">
                                                    <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                        {project.scrumMaster.firstName + " " + project.scrumMaster.lastName}
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                    </ListItem>) :
                                    (<ListItem key="ScrumMaster" className="">
                                        <Avatar alt="ScrumMaster" src="assets/images/avatars/profile.jpg"/>
                                        <ListItemText
                                            className="flex-1"
                                            primary={(
                                                <div className="truncate">
                                                    <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                        TBD
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                    </ListItem>)}
                                <Divider />
                                <Typography variant="caption" className="flex-1 ml-4 mt-4 font-bold">
                                    Product Owner
                                </Typography>
                                {project.productOwner ?
                                (<ListItem key={project.productOwner._id} className="">
                                    <Avatar alt={project.productOwner.username} src="assets/images/avatars/Velazquez.jpg"/>
                                    <ListItemText
                                        className="flex-1"
                                        primary={(
                                            <div className="truncate">
                                                <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                    {project.productOwner.firstName + " " + project.productOwner.lastName}
                                                </Typography>
                                            </div>
                                        )}
                                    />
                                </ListItem>) :
                                    (<ListItem key="ProductOwner" className="">
                                        <Avatar alt="ProductOwner" src="assets/images/avatars/profile.jpg"/>
                                        <ListItemText
                                            className="flex-1"
                                            primary={(
                                                <div className="truncate">
                                                    <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                        TBD
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                    </ListItem>)}
                                <Divider />
                                <Typography variant="caption" className="flex-1 ml-4 mt-4 font-bold">
                                    Development Team
                                </Typography>
                                {project.developmentTeam.length > 0 ? (project.developmentTeam.map((member) => (
                                    <ListItem key={member._id} className="">
                                        <Avatar alt={member.username} src="assets/images/avatars/Velazquez.jpg"/>
                                        <ListItemText
                                            className="flex-1"
                                            primary={(
                                                <div className="truncate">
                                                    <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                        {member.firstName + " " + member.lastName}
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                    </ListItem>
                                ))) :
                                    (<ListItem key="DevelopmentTeam" className="">
                                    <ListItemText
                                        className="flex-1"
                                        primary={(
                                            <div className="flex justify-center truncate">
                                                <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                    No Members Yet.
                                                </Typography>
                                            </div>
                                        )}
                                    />
                                </ListItem>)}
                            </List>
                        </CardContent>
                    </Card>

                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    Skills Needed
                                </Typography>
                                <Button
                                    className="normal-case"
                                    color="inherit"
                                    size="small"
                                    onClick={this.handleOpenSkillsDialog}>
                                    Manage
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <CardContent className="p-0">
                            <List className="p-0">
                                {project.skills.length > 0 && (project.skills.map((skill) => (
                                    <ListItem key={skill._id}>
                                        <Avatar alt={skill.name}>{skill.name[0]}</Avatar>
                                        <ListItemText
                                            primary={(
                                                <div className="">
                                                    <Typography className="inline font-medium" color="primary" paragraph={false}>
                                                        {skill.name}
                                                    </Typography>
                                                </div>
                                            )}
                                        />
                                    </ListItem>
                                )))}
                            </List>
                        </CardContent>
                    </Card>

                    <Dialog
                        open={this.state.openSkillsDialog}
                        onClose={this.handleCloseSkillsDialog}
                        aria-labelledby="Form-Dialog-Skills"
                    >
                        <DialogTitle id="Form-Dialog-Skills">Manage Project's Required Skills</DialogTitle>
                        <DialogContent>
                            <List dense className={classes.root}>
                                {this.props.skills.map(skill => (
                                    <ListItem key={skill._id} button>
                                        <ListItemText primary={skill.name} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                onChange={this.handleSkillsChange(skill)}
                                                checked={_.find(this.state.skills, {_id: skill._id}) !== undefined}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleResetSkillsDialog} color="primary">
                                Reset
                            </Button>
                            <Button onClick={this.handleSubmitSkills} color="primary">
                                Add Skill To Project's Required Skills
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readProject: Actions.readProject,
        readSkills: Actions.readSkills,
        submitSkills: Actions.addSkills,
        changeTab: fuseActions.changeTab
    }, dispatch);
}

function mapStateToProps({fuse, scrum})
{
    return {
        project: scrum.project,
        skills: scrum.skills,
        tab: fuse.tabs
    }
}

export default withStyles(styles, { withTheme: true }) (withRouter(connect(mapStateToProps, mapDispatchToProps) (ProjectInformation)));
