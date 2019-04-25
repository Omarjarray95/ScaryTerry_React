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

const styles = {
    card: {
        minWidth: 250,
        margin: 20
    },
    addCard: {
        maxWidth: 260,
        margin: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 'bold'
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
    }
};

class TimelineTab extends Component {

    state = {
        sum: 1
    };

    componentDidMount()
    {

    }

    render()
    {
        const { classes, project } = this.props;

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
                            <CardActions className="flex justify-center">
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
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
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
                            <CardActions className="flex justify-center">
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
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </CardActions>
                        </Card>
                    </Grid>

                    {project.developmentTeam.length > 0 && (project.developmentTeam.map((member) =>
                        (<Card className={classes.card}>
                            <CardContent>
                                <Grid container alignItems="center" direction="column">
                                    <Typography className={classes.title} color="textPrimary">
                                        Member + { " " + this.state.sum}
                                    </Typography>
                                    <Avatar alt="Remy Sharp" src="assets/images/avatars/Velazquez.jpg"
                                            className={classes.bigAvatar}/>
                                    <Typography className={classes.fullName} color="textSecondary">
                                        {member.firstName + " " + member.lastName}
                                    </Typography>
                                </Grid>
                            </CardContent>
                            <CardActions className="flex justify-center">
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor={"member"+this.state.sum}>Replace Her/Him With ...</InputLabel>
                                    <Select
                                        value={this.state.member}
                                        onChange={this.handleMemberChange}
                                        inputProps={{
                                            name: "member"+this.state.sum,
                                            id: "member"+this.state.sum,
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Replace Her/Him With ...</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </CardActions>
                        </Card>)))}

                    <Card className={classes.addCard}>
                        <CardContent>
                            <Grid container alignItems="center" direction="column">
                                <Typography className={classes.title} color="textPrimary">
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
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        project: scrum.project
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (TimelineTab)));
