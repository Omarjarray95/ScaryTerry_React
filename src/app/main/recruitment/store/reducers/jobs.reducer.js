import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const jobsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_JOBS:
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

export default jobsReducer;
