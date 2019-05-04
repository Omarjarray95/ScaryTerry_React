import * as Actions from 'app/store/actions/fuse';

const initialState = 0;

const tabs = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.OPEN_TAB:
        {
            return action.payload;
        }
        default:
        {
            return state;
        }
    }
};

export default tabs;