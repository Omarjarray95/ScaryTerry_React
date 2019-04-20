import * as Actions from '../actions';

const initialState = {
    role: 'Guest',
    data: {
        'FullName': 'John Doe',
        'PhotoURL': 'assets/images/avatars/Velazquez.jpg',
        'Username': 'johndoe'
    }
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
