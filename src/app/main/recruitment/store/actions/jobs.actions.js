import axios from 'axios';

export const GET_JOBS = '[RECRUITMENT APP] GET JOBS';

export function getJobs()
{
    const request = axios.get('http://localhost:3001/jobs');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_JOBS,
                payload: response.data
            })
        );
}
