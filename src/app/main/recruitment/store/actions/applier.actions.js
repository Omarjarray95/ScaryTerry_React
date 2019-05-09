import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const SAVE_APPLIER = '[E-COMMERCE APP] SAVE APPLIER';

export function saveApplier(data)
{
    const request = axios.post('http://localhost:3001/appliers', data);

    console.info("submit",data);
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
               
                dispatch(showMessage({message: 'Applier Saved'}));
                return dispatch({
                    type   : SAVE_APPLIER,
                    payload: response.data
                })
            }
        ).catch(err=>{
            
            if(err.response.status===500){
                const error = err.response;   
                console.log(err.response);
                dispatch(showMessage({message: err.response.data.message}));
            }
        });
}