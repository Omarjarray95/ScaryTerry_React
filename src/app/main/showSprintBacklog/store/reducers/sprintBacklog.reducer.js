import * as Actions from '../actions/index';

const initialState = [];

const sprintBacklog = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_SPRINT_BACKLOG:
        {
            return action.payload;
        }
        case Actions.REQUEST_ERROR:
        {
            return state;
        }
        default:
            return state;
    }
};

export default sprintBacklog;