import * as Actions from '../../actions';

const initialState = [];

const skills = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_SKILLS:
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

export default skills;