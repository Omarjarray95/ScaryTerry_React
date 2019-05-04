import * as Actions from '../actions';

const initialState = '';

const operation = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.OPEN_CREATE_USER_STORY:
        {
            return action.payload.operation;
        }
        case Actions.OPEN_ASSIGN_USER_STORY:
        {
            return action.payload.operation;
        }
        case Actions.CLOSE_CARD_DIALOG:
        {
            return '';
        }
        default:
            return state;
    }
};

export default operation;