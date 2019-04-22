import * as Actions from '../../actions';

const initialState = [];

const enterprises = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_ENTERPRISES:
        {
            return action.payload;
        }
        case Actions.REQUEST_ERROR:
        {
            return state;
        }
        default:
        {
            return state
        }
    }
};

export default enterprises;