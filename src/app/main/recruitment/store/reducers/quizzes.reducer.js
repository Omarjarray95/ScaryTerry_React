import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const quizzesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_QUIZZES:
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

export default quizzesReducer;
