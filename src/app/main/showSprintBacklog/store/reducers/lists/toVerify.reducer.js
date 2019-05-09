import * as Actions from '../../actions/index';

const initialState = {
    ID     : "To Verify",
    Title   : 'To Verify',
    UserStories: []
};

const toVerify = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.TO_VERIFY:
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

export default toVerify;