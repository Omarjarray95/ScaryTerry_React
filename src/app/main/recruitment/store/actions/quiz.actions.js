import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_QUIZ = '[E-COMMERCE APP] GET QUIZ';
export const SAVE_QUIZ = '[E-COMMERCE APP] SAVE QUIZ';

export function getQuiz(params)
{
    const request = axios.get('', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_QUIZ,
                payload: response.data
            })
        );
}

export function saveQuiz(data)
{
    const request = axios.post('http://localhost:3001/quiz', data);

    console.info("submit",data);
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
               
                dispatch(showMessage({message: 'Product Saved'}));
                return dispatch({
                    type   : SAVE_QUIZ,
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

export function newProduct()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        handle          : '',
        description     : '',
        categories      : [],
        tags            : [],
        images          : [],
        priceTaxExcl    : 0,
        priceTaxIncl    : 0,
        taxRate         : 0,
        comparedPrice   : 0,
        quantity        : 0,
        sku             : '',
        width           : '',
        height          : '',
        depth           : '',
        weight          : '',
        extraShippingFee: 0,
        active          : true
    };

    return {
        type   : GET_QUIZ,
        payload: data
    }
}
