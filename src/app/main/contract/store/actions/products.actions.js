import axios from 'axios';

export const GET_PRODUCTS = '[E-COMMERCE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';
export const HIRE = '[E-COMMERCE APP] HIRE';

export function getProducts()
{
    const request = axios.get('http://localhost:3001/users/getusers');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        );
}
export function hire(model,id)
{
    const request = axios.get('http://localhost:3001/contracts/hire/'+id);

    //Here we have to bambalouni the response with that Promise.all etc ... 
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : HIRE,
                payload: response.data
            })
        );
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

