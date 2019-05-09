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
        case Actions.SAVE_TEST:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.VALIDATE_TEST:
        {
            return{
                ...state,
                result: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
};

export default testReducer;
