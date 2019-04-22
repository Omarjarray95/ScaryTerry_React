import * as Actions from '../../actions';

const initialState = [];

const fields = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_FIELDS:
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

export default fields;