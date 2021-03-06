import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import history from 'history.js';
import * as Actions from '../../job-offers/store/actions';
export const GET_OFFER = '[E-COMMERCE APP] GET OFFER';
export const SAVE_OFFER = '[E-COMMERCE APP] SAVE OFFER';

export function getOffer(params)
{
    console.log(params);
    const request = axios.get('http://localhost:3001/offers/'+params.id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_OFFER,
                payload: response.data
            })
        );
}

export function saveOffer(data,match)
{
    const request = axios.post('http://localhost:3001/offers/', data);

    console.info("submit",data);
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
               
                dispatch(showMessage({message: 'Job Offer Saved'}));
                Promise.all([
                    dispatch({
                        type   : SAVE_OFFER,
                        payload: response.data
                    })
                ]).then(()=>dispatch(Actions.getTodos(match)));
            }
        ).catch(err=>{
            
            if(err.response.status===500){
                const error = err.response;   
                console.log(err.response);
                dispatch(showMessage({message: err.response.data.message}));
            }
        });
}
