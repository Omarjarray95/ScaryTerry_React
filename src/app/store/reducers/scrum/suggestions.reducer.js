import * as Actions from '../../actions/scrum';

const initialState = [];

const suggestions = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_SUGGESTIONS:
        {
            return action.payload;
        }
        case Actions.REQUEST_ERROR:
        {
            return state;
        }
        default:
        {
            return state;
        }
    }
};

export default suggestions;