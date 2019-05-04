import * as Actions from '../../actions/index';

const initialState = {
    ID     : "Pending",
    Title   : 'Pending',
    UserStories: []
};

const pending = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.PENDING:
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

export default pending;