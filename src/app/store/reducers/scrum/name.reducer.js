import * as authActions from '../../../auth/store/actions';
import * as Actions from '../../actions';

const initialState = {
    status: true,
    message: ' '
};

const name = function (state = initialState, action)
{
    switch ( action.type )
    {
        case authActions.USERNAME_AVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case authActions.USERNAME_UNAVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case Actions.PROJECT_NAME_AVAILABLE:
        {
            return {
                status: action.payload.status,
                message: action.payload.message
            };
        }
        case Actions.PROJECT_NAME_UNAVAILABLE:
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