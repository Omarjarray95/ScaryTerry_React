import * as Actions from '../actions';

const initialState = null;

const managedUser = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_USER:
        {
            return action.payload;
        }
        default:
        {
            return state;
        }
    }
};

export default managedUser;