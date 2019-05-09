import * as Actions from '../actions';

const initialState = {
    data: null
};

const applicationReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SAVE_APPLICATION:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default applicationReducer;
