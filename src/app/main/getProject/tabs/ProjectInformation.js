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

class ProjectInformation extends Component {

    state = {
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

    componentDidMount()
    {
        this.props.readProject(this.props.match.params.id);
    }

    render()
    {
        const { project } = this.props;
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
                                <Button className="normal-case" color="inherit" size="small">Manage</Button>
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
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readProject: Actions.readProject,
        changeTab: fuseActions.changeTab
    }, dispatch);
}

function mapStateToProps({fuse, scrum})
{
    return {
        project: scrum.project,
        tab: fuse.tabs
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ProjectInformation));
