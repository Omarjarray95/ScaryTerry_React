import * as authActions from '../../../auth/store/actions';

const initialState = [];

const employees = function (state = initialState, action)
{
    switch ( action.type )
    {
        case authActions.READ_EMPLOYEES:
        {
            return action.payload;
        }
        case authActions.REQUEST_ERROR:
        {
            return state;
        }
        default:
        {
            return state;
        }
    }
};

export default employees;