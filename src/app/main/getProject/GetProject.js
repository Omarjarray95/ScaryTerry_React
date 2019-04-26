import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import ManageTeam from './tabs/ManageTeam';
import ManageSprints from './tabs/ManageSprints';
import ProjectInformation from './tabs/ProjectInformation';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import history from '../../../history';

const styles = theme => ({
    layoutHeader : {
        height                        : 80,
        minHeight                     : 80,
        [theme.breakpoints.down('md')]: {
            height   : 80,
            minHeight: 80
        }
    }
});

class GetProject extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    navigateToProductBacklog = () =>
    {
        history.push('/projects/get/productbacklog/'+ this.props.project.productBacklog);
    };

    render()
    {
        const {classes, project} = this.props;
        const {value} = this.state;

        return (
            <FusePageSimple
                classes={{
                    header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">{project.title}</Typography>
                            </FuseAnimate>
                        </div>

                        <div className="flex items-center justify-end">
                            <Button className="mr-8 normal-case" variant="contained" color="secondary"
                                    aria-label="Show Product Backlog"
                                    onClick={this.navigateToProductBacklog}>
                                Show Product Backlog
                            </Button>
                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered={true}
                        variant="fullWidth"
                        classes={{
                            root: "h-64 w-full border-b-1"
                        }}
                    >
                        <Tab
                            classes={{
                                root: "h-64"
                            }}
                            label="Project Information"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Scrum Team Management"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Sprints Management"/>
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24">
                        {value === 0 &&
                        (
                            <ProjectInformation/>
                        )}
                        {value === 1 && (
                            <ManageTeam/>
                        )}
                        {value === 2 && (
                            <ManageSprints/>
                        )}
                    </div>
                }
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        project: scrum.project,
        id: scrum.id
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (GetProject)));
