import axios from 'axios';

export const GET_QUIZZES = '[E-COMMERCE APP] GET PRODUCTS';

export function getQuizzes()
{
    const request = axios.get('http://localhost:3001/quiz');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_QUIZZES,
                payload: response.data
            })
        );
}
