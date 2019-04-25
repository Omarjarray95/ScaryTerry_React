import axios from 'axios';

export const GET_OFFER = '[E-COMMERCE APP] GET OFFER';


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