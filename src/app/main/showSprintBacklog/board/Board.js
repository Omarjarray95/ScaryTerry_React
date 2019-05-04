import React, {Component} from 'react';
import {
    AppBar,
    Drawer,
    Icon,
    List, ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Toolbar
} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import withReducer from 'app/store/withReducer';
import classNames from 'classnames';
import BoardList from './BoardList';
import BoardCardDialog from './dialogs/card/BoardCardDialog';
import reducer from '../store/reducers';
import * as fuseActions from '../store/actions';
import * as Actions from 'app/store/actions/scrum';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Fab from "@material-ui/core/Fab/Fab";
import withStyles from "@material-ui/core/es/styles/withStyles";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import brown from "@material-ui/core/colors/brown";
import history from "../../../../history";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    fab: {
        marginRight: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 2
    },
    fab1: {
        marginLeft: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 2
    },
    inline: {
        display: 'inline',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
});

const Styling = {
    "Feature": {"Color": blue[100], "Icon": 'featured_play_list'},
    "Function": {"Color": yellow[100], "Icon": 'call_to_action'},
    "Requirement": {"Color": green[100], "Icon": 'beenhere'},
    "Enhancement": {"Color": pink[100], "Icon": 'loupe'},
    "Fix": {"Color": brown[100], "Icon": 'find_replace'}};

class Board extends Component {

    state = {
        productBacklogDrawerOpen: false
    };

    componentWillMount()
    {
        this.props.readSprintBacklog(this.props.match.params.id);
        this.props.readSprintProject(this.props.match.params.id);
        this.props.getItemsByState(this.props.match.params.id, 'Pending');
        this.props.getItemsByState(this.props.match.params.id, 'In Progress');
        this.props.getItemsByState(this.props.match.params.id, 'To Verify');
        this.props.getItemsByState(this.props.match.params.id, 'Done');
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.project !== this.props.project)
        {
            this.setState({openSnackbar: true});
        }
    }

    onDragEnd = (result) =>
    {
        const {source, destination} = result;

        // dropped nowhere
        if ( !destination )
        {
            return;
        }

        // did not move anywhere - can bail early
        if (source.droppableId === destination.droppableId && source.index === destination.index)
        {
            return;
        }

        if (source.droppableId === "Pending" && destination.droppableId === "Done")
        {
            return;
        }

        if ( result.type === 'card' )
        {
            this.props.submitUpdateUserStoryState(result.draggableId, result.destination.droppableId, this.props.match.params.id);
        }
    };

    toggleProductBacklogDrawer = (state) =>
    {
        state = (state === undefined) ? !this.state.productBacklogDrawerOpen : state;

        this.setState({
            productBacklogDrawerOpen: state
        });
    };

    handleCreateUserStory = (ev, item) =>
    {
        ev.preventDefault();
        this.props.openCreateUserStoryDialog(item);
    };

    handleAssignUserStory = (ev, story, item) =>
    {
        ev.preventDefault();
        this.props.openAssignUserStoryDialog(story, item);
    };

    backToProjectPage = () =>
    {
        history.push('/projects/get/' + this.props.project._id);
    };

    render()
    {
        const {classes, lists, sprintBacklog} = this.props;

        return (
            <div
                className="flex flex-1 flex-col w-full h-screen relative"
                ref={(root) => {
                    this.root = root;
                }}
            >
                <div className={classNames("flex flex-1 flex-col overflow-x-visible overflow-y-hidden")}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="h-160 pr-12 pl-12 bg-white flex flex-row items-center">
                            {sprintBacklog && (sprintBacklog.map((story) =>
                            {
                                if (story.estimatedTime === null || story.resource === null)
                                {
                                    return (<div key={story._id} align="center" className="mr-16 ml-16 mt-16 mb-16">
                                        <IconButton
                                            className="bg-blue-light mb-4"
                                            onClick={(ev) => this.handleAssignUserStory(ev, story, story.item)}>
                                            <AssignmentIcon/>
                                        </IconButton>
                                        <Typography>
                                            {story.title}
                                        </Typography>
                                    </div>)
                                }
                                else
                                {
                                    return (<div key={story._id} align="center" className="mr-16 ml-16 mt-16 mb-16">
                                        <IconButton disabled={true}>
                                            <AssignmentIcon/>
                                        </IconButton>
                                        <Typography>
                                            {story.title}
                                        </Typography>
                                    </div>)
                                }
                            }))}
                        </div>
                        <Droppable
                            droppableId="list"
                            type="list"
                            direction="horizontal"
                        >
                            {(provided) => (
                                <div ref={provided.innerRef} className="flex container p-16 md:p-24">
                                    <BoardList
                                        key={lists.pending.ID}
                                        list={lists.pending}
                                        index={0}
                                    />
                                    <BoardList
                                        key={lists.inProgress.ID}
                                        list={lists.inProgress}
                                        index={1}
                                    />
                                    <BoardList
                                        key={lists.toVerify.ID}
                                        list={lists.toVerify}
                                        index={2}
                                    />
                                    <BoardList
                                        key={lists.done.ID}
                                        list={lists.done}
                                        index={3}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                <Drawer
                    anchor="left"
                    className="absolute overflow-y-auto"
                    classes={{
                        paper: "absolute w-320"
                    }}
                    BackdropProps={{
                        classes: {
                            root: "absolute"
                        }
                    }}
                    container={this.root}
                    open={this.state.productBacklogDrawerOpen}
                    onClose={() => this.toggleProductBacklogDrawer(false)}
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full justify-center">
                            Product Backlog
                        </Toolbar>
                    </AppBar>

                    <List dense>
                        {this.props.project.productBacklog.items.length > 0 && (this.props.project.productBacklog.items.map((item) =>
                            (
                                <ListItem
                                    button
                                    key={item._id}
                                    style={{backgroundColor: Styling[item.category].Color}}
                                >
                                    <ListItemIcon>
                                        <Icon>{Styling[item.category].Icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}/>
                                    <ListItemSecondaryAction>
                                        <Tooltip
                                            title="Create User Story"
                                            onClick={(ev) => this.handleCreateUserStory(ev, item)}>
                                            <IconButton aria-label="Create User Story">
                                                <CreateIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )))}
                    </List>

                </Drawer>

                <BoardCardDialog/>

                <div className="flex justify-between">
                    <div className="flex justify-start">
                        <Tooltip
                            title="Back To Project Page"
                            aria-label="Back To Project Page"
                            disableFocusListener disableTouchListener
                            onClick={this.backToProjectPage}>
                            <Fab color="primary" className={classes.fab1}>
                                <ArrowIcon/>
                            </Fab>
                        </Tooltip>
                    </div>

                    <div className="flex justify-end">
                        <Tooltip
                            title="Show Product Backlog"
                            aria-label="Show Product Backlog"
                            disableFocusListener disableTouchListener
                            onClick={() => {this.toggleProductBacklogDrawer(!this.state.productBacklogDrawerOpen)}}>
                            <Fab color="primary" className={classes.fab}>
                                <WalletIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readSprintBacklog: fuseActions.getSprintBacklog,
        getItemsByState: fuseActions.getUserStories,
        readSprintProject: Actions.readSprintProject,
        openCreateUserStoryDialog: fuseActions.openCreateUserStoryDialog,
        openAssignUserStoryDialog: fuseActions.openAssignUserStoryDialog,
        submitUpdateUserStoryState: Actions.updateUserStoryState,
        reorderCard: fuseActions.reorderCard
    }, dispatch);
}

function mapStateToProps({scrumboardApp, scrum})
{
    return {
        project: scrum.project,
        lists: scrumboardApp.lists,
        sprintBacklog: scrumboardApp.sprintBacklog
    }
}

export default withReducer('scrumboardApp', reducer)(withStyles(styles, {withTheme: true}) (withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))));