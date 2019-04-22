import * as Actions from '../actions';

const initialState = {
    success: false,
    message  : ""
};

const register = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.REGISTER_SUCCESS:
        {
            return {
                success: true,
                message: action.payload
            };
        }
        case Actions.REGISTER_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default register;