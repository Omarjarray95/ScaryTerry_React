import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const productsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCTS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_PRODUCTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.HIRE:
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

export default productsReducer;
