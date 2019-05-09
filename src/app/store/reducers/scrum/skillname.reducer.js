import * as Actions from '../../actions';

const initialState = {
    status: true,
    message: ' '
};

const skillname = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.SKILL_NAME_AVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case Actions.SKILL_NAME_UNAVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        default:
        {
            return state;
        }
    }
};

export default skillname;