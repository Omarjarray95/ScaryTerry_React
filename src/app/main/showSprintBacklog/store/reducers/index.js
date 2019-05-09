import {combineReducers} from 'redux';
import boards from './boards.reducer';
import board from './board.reducer';
import card from './card.reducer';
import sprintBacklog from './sprintBacklog.reducer';
import operation from './operation.reducer';
import story from './story.reducer';
import lists from './lists';

const scrumboardAppReducers = combineReducers({
    lists,
    sprintBacklog,
    card,
    story,
    operation,
    boards,
    board
});

export default scrumboardAppReducers;
