import * as Actions from '../actions';

const initialState = null;

const story = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.OPEN_ASSIGN_USER_STORY:
        {
            return action.payload.story;
        }
        case Actions.CLOSE_CARD_DIALOG:
        {
            return null;
        }
        default:
            return state;
    }
};

export default story;