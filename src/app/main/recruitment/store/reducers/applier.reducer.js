import * as Actions from '../actions';

const initialState = {
    data: null
};

const applierReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SAVE_APPLIER:
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

export default applierReducer;
