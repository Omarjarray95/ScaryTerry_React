import * as Actions from '../actions';

const initialState = {
    data: null
};

const widgetsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_WIDGETS:
            return {
                ...state,
                data: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST:
            return {
                ...state,
                test: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST2:
            return {
                ...state,
                test2: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST3:
            return {
                ...state,
                test3: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST5:
            return {
                ...state,
                test5: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST6:
            return {
                ...state,
                test6: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST7:
            return {
                ...state,
                test7: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST8:
            return {
                ...state,
                test8: { ...action.payload }
            };
        case Actions.GET_WIDGETS_TEST9:
            return {
                ...state,
                test9: { ...action.payload }
            };
        default:
            return state;
    }
};

export default widgetsReducer;