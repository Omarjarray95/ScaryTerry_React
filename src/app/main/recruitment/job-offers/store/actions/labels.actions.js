import axios from 'axios';

export const GET_LABELS = '[TODO APP] GET LABELS';

export function getLabels()
{
    const request = axios.get('http://localhost:3001/skills/getskills');
    
    
    return (dispatch) =>
        request.then((response) =>{
           
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
            }
        );
}

