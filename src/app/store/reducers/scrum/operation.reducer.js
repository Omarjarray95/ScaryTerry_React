import * as Actions from '../../actions';

const initialState = {
    operation: "",
    success: false,
    message : ""
};

const operation = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.ADD_PROJECT_SUCCESS:
        {
            return {
                ...initialState,
                success: true,
                message: action.payload
            };
        }
        case Actions.ADD_PROJECT_ERROR:
        {
            return state;
        }
        default:
        {
            return state;
        }
    }
};

export default operation;