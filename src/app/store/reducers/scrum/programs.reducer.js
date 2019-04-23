import * as Actions from '../../actions';

const initialState = [];

const programs = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_PROGRAMS:
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

export default programs;