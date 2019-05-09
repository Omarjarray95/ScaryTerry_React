import * as Actions from '../actions';

const initialState = {
    data          : [],
    categories    : [],
    searchText    : '',
    categoryFilter: 'all',
    meeting       : {},
    attendance:{},
    question:{},
    sprints:[],
    test:{}
};

const coursesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COURSES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_MEETING:
        {
            return {
                ...state,
                meeting: action.payload
            };
        }

        case Actions.SET_ATTENDENCEE:
        {
            return {
                ...state,
                attendance: action.payload
            };
        }
        case Actions.GET_SPRINTS:
        {
            return {
                ...state,
                sprints: action.payload
            };
        }
        case Actions.MINUS_NOTE:
        {
            return {
                ...state,
                test: action.payload
            };
        }
        case Actions.PLUS_NOTE:
        {
            return {
                ...state,
                test: action.payload
            };
        }
        case Actions.START_MEETING:
        {
            return {
                ...state,
                searchText: action.payload
            };
        }
        case Actions.END_MEETING:
        {
            return {
                ...state,
                searchText: action.payload
            };
        }
        case Actions.ADD_QUESTION:
        {
            return {
                ...state,
                question: action.payload
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                categories: action.payload
            };
        }
        case Actions.SET_COURSES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_COURSES_CATEGORY_FILTER:
        {
            return {
                ...state,
                categoryFilter: action.category
            };
        }
        default:
        {
            return state;
        }
    }
};

export default coursesReducer;
