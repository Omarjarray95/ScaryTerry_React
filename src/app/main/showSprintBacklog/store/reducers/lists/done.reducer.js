import * as Actions from '../../actions/index';

const initialState = {
    ID     : "Done",
    Title   : 'Done',
    UserStories: []
};

const done = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.DONE:
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

export default done;