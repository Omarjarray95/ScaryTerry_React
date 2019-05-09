import React, {Component} from 'react';
import {Card, Typography, Avatar, Icon, Tooltip, withStyles} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as fuseActions from '../store/actions';
import moment from "moment";

const styles = theme => ({
    card: {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    }
});

class BoardCard extends Component
{
    state = {
        time: moment()
    };

    componentDidMount()
    {
        this.timer = setInterval(this.update, 1000)
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    update = () =>
    {
        this.setState({
            time: moment()
        })
    };

    handleAssignUserStory = (ev, story, item) =>
    {
        ev.preventDefault();
        this.props.openAssignUserStoryDialog(story, item);
    };

    render()
    {
        const {time} = this.state;
        const {classes, cardId, index, list} = this.props;
        const card = _.find(list.UserStories, {_id: cardId});

        return (
            <Draggable draggableId={cardId} index={index} type="card">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card
                            className={classNames(classes.card, "w-full mb-16 rounded-4 cursor-pointer border-1")}
                            elevation={snapshot.isDragging ? 3 : 0}
                            onClick={(ev) => this.handleAssignUserStory(ev, card, card.item)}
                        >

                            <div className="p-16 pb-0">

                                <Typography className="font-600 mb-12">{card.title}</Typography>

                                {(card.estimatedTime) && (
                                    <div className="flex items-center mb-12">
                                        {card.estimatedTime && (
                                            <div
                                                className={classNames("flex items-center px-8 py-4 mr-8 rounded-sm"
                                                    , card.startDate && (list.ID !== "Done") &&
                                                    (moment.duration(moment().diff(moment(card.startDate)))
                                                        .asHours()  > card.estimatedTime) ?
                                                        "bg-red text-white" : "bg-green text-white")}>
                                                <Icon className="text-16 mr-4">access_time</Icon>
                                                <span>{moment.duration(card.estimatedTime, 'hours').asHours() < 1 ?
                                                    Math.round(moment.duration(card.estimatedTime, 'hours').asMinutes())
                                                    + " Minute(s)" :
                                                    moment.duration(card.estimatedTime, 'hours').asHours() + " Hour(s)"}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(card.startDate) && (
                                    <div className="flex items-center mb-12">
                                        {(card.startDate) && (
                                            <div
                                                className={classNames("flex items-center px-8 py-4 mr-8 rounded-sm"
                                                    , "bg-grey text-white")}>
                                                <Icon className="text-16 mr-4">calendar_today</Icon>
                                                <span>{moment(card.startDate).format("DD/MM/YYYY HH:mm").toString()}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(card.startDate) && (
                                    <div className="flex items-center mb-12">
                                        {card.duration ? (<div
                                            className={classNames("flex items-center px-8 py-4 mr-8 rounded-sm", "bg-blue-light text-white")}>
                                            <span>{"Done In " + card.duration + " Minute(s)"}</span>
                                        </div>) : (<div
                                            className={classNames("flex items-center px-8 py-4 mr-8 rounded-sm", "bg-blue-light text-white")}>
                                            <span>{time.format('HH:mm:ss')}</span>
                                        </div>)}
                                    </div>
                                )}

                                {card.resource && (
                                    <div className="flex flex-wrap mb-12">
                                        <Tooltip title={card.resource.firstName + " " + card.resource.lastName}
                                                 key={card.resource._id}>
                                            <Avatar className="mr-8 w-32 h-32" src="assets/images/avatars/Velazquez.jpg"/>
                                        </Tooltip>
                                        <div className="">
                                        </div>
                                    </div>
                                )}

                            </div>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openAssignUserStoryDialog: fuseActions.openAssignUserStoryDialog
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardCard)));
