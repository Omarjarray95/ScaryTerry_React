import { SET_SOCKET } from "../../actions/fuse";

// import routesConfig from 'app/fuse-configs/routesConfig';

const initialState = {};

const socket = function (state = initialState, action) {
    switch ( action.type )
    {   case SET_SOCKET   :
        {
            state =action.payload;
        }
        default:
        {
            return state;
        }
    }
};

export default socket;
