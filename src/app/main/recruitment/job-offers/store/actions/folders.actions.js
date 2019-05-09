import axios from 'axios';

export const GET_FOLDERS = '[TODO APP] GET FOLDERS';

export function getFolders()
{
    const request = axios.get('/api/todo-app/folders');

    return (dispatch) =>
            dispatch({
                type   : GET_FOLDERS,
                payload: [
                    {
                        'id'    : 0,
                        'handle': 'all',
                        'title' : 'All',
                        'icon'  : 'view_headline'
                    }
                ]
            });
}
