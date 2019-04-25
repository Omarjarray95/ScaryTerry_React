import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const testReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TEST:
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

export default testReducer;
