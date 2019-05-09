import * as Actions from '../../actions/index';

const initialState = {
    ID     : "In Progress",
    Title   : 'In Progress',
    UserStories: []
};

const inProgress = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.IN_PROGRESS:
        {
            return {
                ...initialState,
                UserStories: action.payload
            };
        }
        case Actions.REQUEST_ERROR:
        {
            return state;
        }
        default:
            return state;
    }
};

export default inProgress;