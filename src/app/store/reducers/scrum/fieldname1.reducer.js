import * as Actions from '../../actions';

const initialState = {
    status: true,
    message: ' '
};

const fieldname1 = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.FIELD_NAME1_AVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case Actions.FIELD_NAME1_UNAVAILABLE:
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

export default fieldname1;