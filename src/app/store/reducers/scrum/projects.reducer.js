import * as Actions from '../../actions';

const initialState = [];

const projects = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_PROJECTS:
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

export default projects;