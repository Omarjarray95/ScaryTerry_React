import React, {Component} from 'react';
import {Card, CardContent, withStyles} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import classNames from 'classnames';
import BoardCard from './BoardCard';
import BoardListHeader from './BoardListHeader';

const styles = theme => ({
    list: {
        backgroundColor         : darken(theme.palette.background.default, theme.palette.type === 'light' ? 0.02 : .4),
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    }
});

class BoardList extends Component {

    handleCardAdded = () => {
        this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
    };

    render()
    {
        const {classes, list, index} = this.props;
        return (
            <Draggable draggableId={list.ID} index={index} type="list">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <Card
                            className={classNames(classes.list, "w-256 sm:w-320 mr-16 sm:mr-24 max-h-full flex flex-col")}
                            square={true}
                            elevation={snapshot.isDragging ? 3 : 1}
                        >

                            <BoardListHeader
                                list={list}
                                className="border-b-1"
                                handleProps={provided.dragHandleProps}
                            />

                            <CardContent
                                ref={ref => this.contentScrollEl = ref}
                                className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto"
                            >
                                <Droppable
                                    droppableId={list.ID}
                                    type="card"
                                    direction="vertical"
                                >
                                    {(provided) => (
                                        <div ref={provided.innerRef} className="flex flex-col w-full h-full p-16">
                                            {list.UserStories.map((userStory, index) => (
                                                <BoardCard
                                                    key={userStory._id}
                                                    cardId={userStory._id}
                                                    index={index}
                                                    list={list}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default withStyles(styles, {withTheme: true})(BoardList);
