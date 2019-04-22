import * as Actions from '../../actions';

const initialState = {
    status: true,
    message: ' '
};

const enterprisename = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.ENTERPRISE_NAME_AVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case Actions.ENTERPRISE_NAME_UNAVAILABLE:
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

export default enterprisename;