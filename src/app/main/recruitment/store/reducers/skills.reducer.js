import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const skillsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SKILLS:
        {
            return {
                ...state,
                data: action.payload
            };
        } case Actions.SET_PRODUCTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        } case Actions.SAVE_SKILL:
        {
            return {
                ...state,
                data: {...action.payload}
            };
        } case Actions.DELETE_SKILL:
        {
            return{
                ...state,
                data : {...action.payload}
            }
        }
        default:
        {
            return state;
        }
    }
};

export default skillsReducer;
