import axios from 'axios';

export const GET_TEST = '[RECRUITMENT APP] GET TEST';

export function getTest(test)
{
    const request = axios.get('http://localhost:3001/tests/'+test);

    return (dispatch) =>
        request.then((response) =>
            {
            console.log(response.data);
            dispatch({
                type   : GET_TEST,
                payload: response.data
            })
        }
        );
}
