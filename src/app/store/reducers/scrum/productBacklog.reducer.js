import * as Actions from '../../actions';

const initialState = {items: []};

const productBacklog = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.GET_PRODUCTBACKLOG:
        {
            return action.payload;
        }
        case Actions.REQUEST_ERROR:
        {
            return {
                ...initialState
            };
        }
        default:
        {
            return state
        }
    }
};

export default productBacklog;