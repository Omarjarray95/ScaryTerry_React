import * as Actions from '../../../auth/store/actions';

const initialState = {
    status: true,
    message: ' '
};

const name = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.USERNAME_AVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case Actions.USERNAME_UNAVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        default:
        {
            return state
        }
    }
};

export default name;